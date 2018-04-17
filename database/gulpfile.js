/**
 * Permite agrupar y empaquetar un script con los cambios de base de datos que se han de subir a producción o a QA.
 * Agrupa todo los archivos sql que se encuentren dentro de las carpetas schemas.
 * 
 * Adicionalmente puede indicar un orden o listar solo los script que desea agrupa en el archivo
 * 	
 * 
 * El archivo resultante se almacenará en la carpeta versions con todas la instrucciones para validar y 
 * crear el control de version de la estructura de la data. 
 * 
 * @author rbruno <robert.bruno@sigis.com.ve>
 * @copyright (c) SIGIS Soluciones Integrales GIS, C.A. 
 */
const username = require('username');
var gulp = require('gulp-param')(require('gulp'), process.argv);
var prettyData = require('gulp-pretty-data');
var concat = require("gulp-concat");
var header = require("gulp-header");
var footer = require('gulp-footer');
var semver = require('semver');
var fs = require('fs-extra');
var tar = require('gulp-tar');
var gzip = require('gulp-gzip');
var util = require('util');
var config = JSON.parse(fs.readFileSync('./src/config.json'));
var pkg = JSON.parse(fs.readFileSync('./package.json'));
var exec = require('child_process').exec;


/**
 * Incrementa la versión.
 * 
 * @nethod incVersion
 */
var incVersion = function (version) {
	var new_version = semver.inc(version,  'patch');
	
	pkg.version = new_version;
	fs.writeJsonSync('./package.json', pkg, {spaces: 4});
	return new_version;
};
 
/**
 * Obtiene los detalles del copyright.
 * 
 * @method getCopyright 
 */
var getCopyright = function (target) {
    return [
    	'--Version: '+target+' <%= version %>',
    	'--Build: <%= build %>',
    	'--Build by: <%= user %>',
    	'--Build date: <%= buildDate %>',
    	'--Copyright (c) SIGIS Soluciones Integrales GIS, C.A.'
    ].join('\n')+'\n';
};

/**
 * Obtiene los script báscios de control de version que se deben agegar en el header del script princpal
 */
var headerScripts = function(target){
	if(config.templates[target] && 
			config.templates[target].headers	){
		return fs.readFileSync(config.templates[target].headers);
	}
	
	return fs.readFileSync(config.templates + target+"/headers.sql");
};

/**
 * Obtiene los script báscios de control de version que se deben agegar en el footer del script princpal
 */
var footerSripts = function(target){
	if(config.templates[target] && 
			config.templates[target].footer	){
		return fs.readFileSync(config.templates[target].footer);
	}

	return fs.readFileSync(config.templates + target+"/footer.sql");
};

/**
* Copya un archivo.
*
* @method copyFile
*/
var copyFile = function (source, target, cb) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}

/**
 * Ejecuta un deploy del taget indicado y lo escribe en la ruta definida por output.
 * 
 */
var deploy = function(target, data){
	var src = new Array();
	var dirTarget = "src/"+target+"/";
	var scripts = config.include && config.include.scripts ? config.include.scripts : config.include;
	
	if(scripts.length > 0){
		for (var i = 0; i < scripts.length; i++) {
			if(scripts[i].indexOf("*") == -1){
				if (fs.existsSync(dirTarget+scripts[i])) {
					src.push(dirTarget+scripts[i]);
				} else {
					 throw new Error(util.format('[%s] FILE DOES NOT EXIST', scripts[i]));
				}
			}else{
				src.push(dirTarget+scripts[i]);
			}
		}
	}
		
	console.log(util.format(data.buildDir+"%s.sql", target));
	return gulp.src(src)
    	  .pipe(concat( target+'.sql'))
    	  .pipe(header(headerScripts(target),data))
    	  .pipe(header(getCopyright(target), data))
    	  .pipe(footer(footerSripts(target), data))
    	  .pipe(gulp.dest(data.buildDir))
}
 
gulp.task('build',  function(name,author, package) {
	var version = pkg && pkg.version ? pkg.version : '0.0.1' ;
	var sufix = name ? name : version;
    var buildDir = config.buildPath+"/"+sufix+"/";
    var user = author ? author : username.sync();
    var data = {
    	"buildDir" : buildDir, 
    	"version" : version,
    	"build" : sufix,
    	"buildDate" : (new Date()).toString(),
		"user" : user
	};
    
    console.log("build name: ", sufix);
    console.log("version: ", version);
	
	if(!config.templates){
		config.templates= ".sigis-db/templates/"
	}
	
	deploy("deploy", data).on('end', function() {
        deploy("revert", data).on('end', function() {
            deploy("verify", data).on('end', function(){
                gulp.src([".sigis-db/run.js", ".sigis-db/db.js", ".sigis-db/package.json","src/config.json",".sigis-db/run.sh"])
        		.pipe(gulp.dest(buildDir)).on('end', function(){
        			var buildConfig = JSON.parse(fs.readFileSync(buildDir+ 'config.json'));
        			
        			delete data.buildDir;
        			delete buildConfig.buildPath;
        			buildConfig = Object.assign({}, data,buildConfig);
        			fs.writeJsonSync(buildDir +'config.json', buildConfig, {spaces: 4});
        			//incVersion(version);

        			for (var i = 0; i < config.include.data.length; i++) {
        				gulp.src("src/data/"+config.include.data[i]).pipe(gulp.dest( buildDir+"data/" ));
					}	
                });
            });
        });
    });
	
});


gulp.task('package',  function(target, prefix) {
    
	if(target){
		var buildDir = config.buildPath+"/"+target+"/";
		var pckConfig = JSON.parse(fs.readFileSync(buildDir+'config.json'));
		var packageName = target;
		
		if(prefix==true){
			prefix=pckConfig.version;
		}else if( !prefix){
			prefix="";
		}
		
		packageName = (prefix ? prefix+"_" : "") +target+'.tar';
	    console.log("package name: ", packageName);
		
	    gulp.src([buildDir+'**'])
		    .pipe(tar( packageName ))
		    .pipe(gzip())
		    .pipe(gulp.dest(config.buildPath)).on('end', function(){
		    	exec('rm -rf ' + buildDir);
		    });
	}else{
		console.log("Please define --target for package");
	}
		
});

gulp.task('generate',  function(version) {
    
	console.error("gulp gnerate is deprecated. Please use `gulp build`  and `gulp package`");
	return false;	
});

gulp.task('default', ['build']);

