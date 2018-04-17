
const PSQL_BIN = '/usr/bin/psql';
const PG_DUMP_BIN = '/usr/bin/pg_dump';
const PG_DUMP_CMD = 'PGPASSWORD="<%= password %>" <%= bin %> --host <%= host %>  --port <%= port %> --username <%= user %>  --format plain  --no-owner --encoding UTF8 --no-privileges --disable-dollar-quoting <%= verbose %> --schema-only --no-unlogged-table-data --file "<%= file %>"  "<%= database %>"';
const CMD_TPL = 'PGPASSWORD="<%= password %>" <%= bin %> -h  <%= host %> -d <%= database %> -U <%= user %>  -p <%= port %> -a -w -f <%= script %>';

var fs = require('fs');
var ejs = require('ejs');
var glob = require("glob");
var chalk = require('chalk');
var args = process.argv.slice(2);
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;
var config = JSON.parse(fs.readFileSync('./config.json'));

/**
 * Gestiona el deploy y demás acciones para desplegar los cambios en la base de datos indicada.
 * 
 * @author rbruno <robert.bruno@sigis.com.ve>
 * (c) copyright Soluciones Integrales GIS, C.A.
 */
SIGISDB = {

		/**
		 * Se encarga de cumplir el flujo coimpleto. Corriendo deploy->veify y revert si falla el verify. 
		 * Posterioemente ha de correr el dump y corre la data
		 *  
		 * @method deploy
		 */
		deploy :  function(){
			var me = this;
			var pg_deploy_cmd = ejs.render(CMD_TPL, Object.assign(config.target, {script : './deploy.sql', bin : PSQL_BIN}));
			var pg_revert_cmd = ejs.render(CMD_TPL, Object.assign(config.target, {script : './revert.sql', bin : PSQL_BIN}));
			var pg_verify_cmd = ejs.render(CMD_TPL, Object.assign(config.target, {script : './verify.sql', bin : PSQL_BIN}));
			
			console.log("running deploy");
			
		    exec(pg_deploy_cmd, function(error, stdout, stderr) {
		        
		        if (error || (stderr && stderr.indexOf("ERROR:")>=0)) {
		        	console.log(chalk.red(stderr));
		        	process.exit(1);
		        }else{
		        	console.log(chalk.grey(stderr));
		        	console.log("");
		        	console.log("running verify");

		            exec(pg_verify_cmd, function(error, verifyStdout, verifyStderr) {
		                
		                if (error || 	(verifyStderr && verifyStderr.indexOf("ERROR:")>=0)) {//run revert
		                	console.log(chalk.red(verifyStderr));
		                	console.log();
		                	console.log(chalk.red('running revert'), name);
		                	console.log();
		                	
		                	exec(pg_revert_cmd, function(error, revertStdout, revertStderr) {
		                		console.log(stderr ? revertStderr : revertStdout);
		                		console.log();
		                		process.exit(2);
		                    });

		                }else{
		                	console.log(chalk.grey(verifyStderr));
		                	console.log(chalk.green('verything is ok!'));
		                	console.log();
		                	console.log("Now running post actions!");
		                	
		                	me.dump(null, function(){
		                		
		                		me.data(function(error, dataStdout, dataStderr){
				                	if(dataStderr){
										console.log(chalk.grey( dataStderr));
									}else{
										console.log(chalk.green( dataStdout ));
									}
				                	console.log();
				                    process.exit(0);
		                		});
		                	});
		                }
		            });    
		        }
		    });
		},

		/**
		 * Ejecuta el revert en la base de datos indicada.
		 * 
		 * @method revert 
		 */
		revert : function(){
			var pg_revert_cmd = ejs.render(CMD_TPL, Object.assign(config.target, {script : './revert.sql', bin : PSQL_BIN}));
			
			console.log("running revert");
		    exec(pg_revert_cmd, function(error, stdout, stderr) {
		        console.error(stderr);
		        if(error){
		            process.exit(3);    
		        }else{
		            process.exit(0);    
		        }
		    });
		},

		/**
		 * Ejecuta el verify en la base de datos indicada.
		 * 
		 * @method  verify
		 */
		verify : function(){
			var pg_verify_cmd = ejs.render(CMD_TPL, Object.assign(config.target, {script : './verify.sql', bin : PSQL_BIN}));
			
			console.log("running verify");
		    exec(pg_verify_cmd, function(error, stdout, stderr) {
		    	
		    	console.error(stderr);
		    	
		        if (error || (stderr && stderr.indexOf("ERROR:")>=0)) {
		            process.exit(4);
		        }else{
		            console.log("verything is ok!");
		            process.exit(0);    
		        }
		    });
		},

		/**
		 * Inserta la data de forma segmentada.
		 * 
		 * @method data
		 */
		data  : function(end){
			var me = this;
			
			var handlerDataScript =  function(file){
				var pg_data_cmd = ejs.render(CMD_TPL, Object.assign(config.target, {script : file, bin : PSQL_BIN }));
				var  cmd_result = execSync(pg_data_cmd);
				console.log(chalk.grey(cmd_result));
			}
			
			if(!end){
				end= function(error, stdout, stderr){
					if(stderr){
						console.log(chalk.grey( stderr));
					}else{
						console.log(chalk.green( stdout ));
					}
					
					console.log();
				}
			}
			
			if( config && config.include && config.include.data && config.include.data.length > 0){
				
				console.log("running data into " + config.target.host+" "+config.target.database);
				
				for (var i = 0; i < config.include.data.length; i++) {
					var path = 'data/'+config.include.data[i];
					var newList = glob.sync(path, {});
					
				    newList.forEach(function(item){
				    	handlerDataScript(item);
				    });
				}
				end && end(0, "The data dump process is complete!");
			}else{
				end && end(1, null, "No data scripts was specified");
			}
		},

		/**
		 * Ejecuta el dump de la estrutura de base de datos definida en el config.target.
		 * 
		 * @method dump
		 */
		dump  : function(name, callback) {
			var pg_dump_cmd = ejs.render(PG_DUMP_CMD, Object.assign(config.target, {
				bin : PG_DUMP_BIN, 
				//verbose: "--verbose", 
				verbose: "",
				file : name ? name : 'dump.sql'
			}));
			
			console.log("running dump of " + config.target.host+" "+config.target.database);
			
			exec(pg_dump_cmd, function(error, stdout, stderr) {
				 	console.error(stdout ? stdout : stderr);
				 	
				 	if(callback){
				 		callback(error, stdout, stderr);
				 	}else if(error){
			            process.exit(5);    
			        }else{
			            process.exit(0);    
			        }
			    });
		},
		
		/**
		 * Obtiene los datos por parámetro.
		 * 
		 * @method parseArgs 
		 */
		parseArgs : function(){
			if(args[1] ){//has a custom target params?
				for (var i = 1; i < args.length; i++) {
					for ( var tokenName in config.target) {
						if(args[i].indexOf(tokenName) >= 0){
							var token = args[i].replace(new RegExp("--"+tokenName+"=", 'g'), "");
						    config.target[tokenName]= token;
						}
					}
				}
			}
		},
		
		/**
		 * Muestra la ayuda de como usar esta herramienta desde la linea de comando.
		 * 
		 * @method help 
		 */
		help : function(){
			console.log("Usage:");
			console.log();
			console.log("Actions:");
			console.log("	deploy			Run all change on the target. \n" +
						"					[deploy->verify->revert] if fail\n" +
						"					or [deploy->veify->dump->data] if all is fine.");
			console.log();
			console.log("	verify			Only run verify action on the espcific target.");
			console.log();
			console.log("	revert			Only run revert action on the espcific target. ");
		    console.log("				Warning!!! this action remove all change of this version and data may be lost.");
			console.log();
			console.log("	dump			Only run dump action and safe in the version metadata.");	
			console.log();
			console.log("	data			Only run data action.");
			console.log();
			console.log("Options:");
			console.log("	--host			You can use a custom host.");
			console.log("	--port			You can use a custom port.");
			console.log("	--database		You can use a custom database.");
			console.log("	--user			You can use a custom user.");
			console.log("	--password		You can use a custom password.");
			
			console.log();
		},
		
		/**
		 * Corre el script copmleto.
		 * 
		 * @method run
		 */
		run : function(){
			var me = this;
			
			me.parseArgs();
			
			console.log();
			if(args[0]== "deploy"){
			    me.deploy();
			}else if(args[0]== "revert") {
			    console.log("Warning!!! this action remove all change of this version and data may be lost.");
			    me.revert();
			}else if(args[0]== "verify") {
				me.verify();
			}else if(args[0]== "dump") {
				me.dump();
			}else if(args[0]== "data") {
				me.data();
			}else{
				me.help();
			}
			console.log();
		}
};


SIGISDB.run();

