const gulp           = require("gulp");
const gulpif         = require("gulp-if");
const imagemin       = require('gulp-imagemin');
const clean          = require('gulp-clean');
const mergeStream    = require("merge-stream");
const uglify         = require('gulp-uglify');
const del            = require('del');
const fs             = require("fs");
const cssSlam        = require("css-slam").gulp;
const htmlMinifier   = require("gulp-html-minifier");
const polymerBuild   = require('polymer-build');
const semver         = require('semver');
const bump           = require('gulp-bump');

const project  = new polymerBuild.PolymerProject(require("./polymer.json"));
const splitter = new polymerBuild.HtmlSplitter();

const swPrecacheConfig = require("./sw-precache-config.js");
const baseBuildDir   = "../build";
let buildDirectory   = null;

const waitFor = function(stream) {
   return new Promise((resolve,reject) => {
      stream.on("end",resolve);
      stream.on("error",reject);
   });
}

const appBuild = function () {
   let packageJSON = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
   let newVer = semver.inc(packageJSON.version, 'patch');
   buildDirectory = `${baseBuildDir}/${newVer}`;

   console.log("Preparing new Release: "+newVer);
   return new Promise((resolve,reject) => {
      del([buildDirectory+"/**"],{
         force: true
      }).then( () => {
         var sourceStream = project.sources()
         var dependenciesStream = project.dependencies()
         var buildStream = mergeStream(sourceStream,dependenciesStream);
             buildStream = polymerBuild.forkStream(buildStream)
                            .pipe(project.bundler)
                            .pipe(splitter.split())
                            .pipe(gulpif(/\.(png|gif|jpg|svg)$/,imagemin()))
                            .pipe(gulpif(/\.js$/,uglify()))
                            .pipe(gulpif(/\.css$/,cssSlam()))
                            .pipe(gulpif(/\.html$/,cssSlam()))
                            .pipe(gulpif(/\.html$/,htmlMinifier({
                                collapseWhitespace: true,
                                removeComments: true
                            })))
                            .pipe(splitter.rejoin())
                            .pipe(gulp.dest(buildDirectory));

         return waitFor(buildStream);

      }).then(() => {
         console.log("Generating service worker");
         return polymerBuild.addServiceWorker({
          project: project,
          buildRoot: buildDirectory,
          swPrecacheConfig: swPrecacheConfig,
          bundled: true
        });

      }).then(() => {
        console.log("Updating release version");
        return gulp.src([
          './bower.json', 
          './package.json', 
          './manifest.json'
        ]) 
        .pipe(bump({
          version: newVer
        }))
        .pipe(gulp.dest('./'));
        
      }).then(() => {
        console.log('Build complete!');
        resolve();
      });

   });
}


gulp.task("default",appBuild);
