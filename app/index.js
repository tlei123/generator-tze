'use strict';
// var util = require('util');
// var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var http = require('http');
var fs = require('fs');
var postdata = require('postdata');

var TzeGenerator = yeoman.generators.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
    },

    prompting: function () {
        var done = this.async();

        // Greet User.
        if (!this.options['skip-welcome-message']) {
            console.log(yosay('WELCOME to the Tze Generator for Yeoman!\n' + 
                            'Let\'s get some basic project info/options set up...'));
        }

        // Prompt for user inputs.
        var prompts = [
            {
                name: 'appName',
                message: 'What is your Project\'s name?',
                default: 'tze'
            },
            {
                name: 'version',
                message: 'Version?',
                default: '0.1.0'
            },
            {
                name: 'author',
                message: 'Your name?',
                default: 'Tze Lei'
            },
            {
                name: 'email',
                message: 'Your email?',
                default: 'tze.lei@mrm-mccann.com'
            },
            {
                type: 'list',
                name: 'jqVersion',
                message: 'jQuery version',
                choices: [
                    { name: '2.1.3', value: '2.1.3' }, 
                    { name: '1.11.2', value: '1.11.2' }, 
                    { name: '1.10.2', value: '1.10.2'}, 
                    { name: '1.9.1', value: '1.9.1'}, 
                    { name: '1.8.3', value: '1.8.3'}, 
                    { name: '1.7.2', value: '1.7.2'} 
                ],
                default: '2.1.3'
            },
            {
                type: 'confirm',
                name: 'eq3optn',
                message: 'JsHint eqeqeq [require === and !===]?',
                default: true
            },
            {
                type: 'confirm',
                name: 'serveOptn',
                message: 'Include grunt-connect-connect and grunt serve task?',
                default: true
            }
        ];

        this.prompt(prompts, function (answers) {
            this.appName = answers.appName;
            this.version = answers.version;
            this.author = answers.author;
            this.email = answers.email;
            this.jqVer = answers.jqVersion;
            this.eq3optn = answers.eq3optn;
            this.serveOptn = answers.serveOptn;

            if (!this.options['skip-message']) {
                console.log('\nOK, thanks!  HERE are your inputs:\n' +
                    'Name: ' + this.appName + '\n' +
                    'Version: ' + this.version + '\n' +
                    'Author: ' + this.author + '\n' + 
                    'Email: ' + this.email + '\n' + 
                    'jQuery version: ' + this.jqVer + '\n' + 
                    'JsHint eqeqeq: ' + this.eq3optn + '\n\n' + 
                    'Grunt serve: ' + this.serveOptn + '\n\n' + 
                    'STATING PROJECT SCAFFOLDING NOW...\n');
            }

            done();
        }.bind(this));
    },

    writing: {
        scaffoldFolders: function () {
            this.mkdir("src");
            this.mkdir("src/css");
            this.mkdir("src/css/images");
            this.mkdir("src/fonts");
            this.mkdir("src/images");
            this.mkdir("src/sass");
            this.mkdir("src/sass/modules");
            this.mkdir("src/sass/partials");
            this.mkdir("src/sass/libs");
            this.mkdir("src/js");
            this.mkdir("src/js/libs");
            // this.mkdir("src/js/sections");
            this.mkdir("build");

            if (!this.options['skip-message']) {
                console.log('[scaffoldFolders] Folders generated.');
            }
        },
        
        downloadJQueryMin: function () {
            var done = this.async();
            var jqVrsn = this.jqVer;
            var dest = 'src/js/libs/jquery-' + jqVrsn + '.min.js';
            var file = fs.createWriteStream( dest );
            var skipMsg = this.options['skip-message'];
            var request = http.get('http://cdnjs.cloudflare.com/ajax/libs/jquery/' + jqVrsn + '/jquery.min.js', function(response) {
                response.pipe( file ).on( 'close', function () {
                     postdata( fs.readFileSync( dest ) );
                    if (!skipMsg) {
                        console.log('[downloadJQueryMin] Minified jQuery downloaded: ' + jqVrsn);
                    }
                    done();
                });
            })
            .on( 'error', function( err ) { // Handle errors
                fs.unlink( dest ); // Delete the file async. (But we don't check the result)
                console.log( '[downloadJQueryMin] ERROR: ' + err.message );
                done();
            });
        },

        downloadJQueryMinMap: function () {
            var done = this.async();
            var jqVrsn = this.jqVer;
            var skipMsg = this.options['skip-message'];

            if ( jqVrsn != '1.8.3' && jqVrsn != '1.7.2' ) {
                var dest = 'src/js/libs/jquery.min.map';
                var file = fs.createWriteStream( dest );
                var request = http.get( 'http://cdnjs.cloudflare.com/ajax/libs/jquery/' + jqVrsn + '/jquery.min.map', function( response ) {
                    response.pipe( file ).on( 'close', function () {
                         postdata( fs.readFileSync( dest ) );
                        if ( !skipMsg ) {
                            console.log( '[downloadJQueryMinMap] jQuery.min.map downloaded.' );
                        }
                        done();
                    });
                })
                .on( 'error', function( err ) { // Handle errors
                    fs.unlink( dest ); // Delete the file async. (But we don't check the result)
                    console.log( '[downloadJQueryMinMap] ERROR: ' + err.message );
                    done();
                });
            } else {
                if (!skipMsg) {
                    console.log( '[downloadJQueryMinMap] No map downloaded -- version lower than 1.9.' );
                    done();
                }
            }
        },

        downloadJQuery: function () {
            var done = this.async();
            var jqVrsn = this.jqVer;
            var skipMsg = this.options['skip-message'];

            if ( jqVrsn != '1.8.3' && jqVrsn != '1.7.2' ) {
                var dest = 'src/js/libs/jquery.js';
                var file = fs.createWriteStream( dest );
                var request = http.get( 'http://cdnjs.cloudflare.com/ajax/libs/jquery/' + jqVrsn + '/jquery.js', function( response ) {
                    response.pipe( file ).on( 'close', function () {
                         postdata( fs.readFileSync( dest ) );
                        if ( !skipMsg ) {
                            console.log( '[downloadJQuery] Unminified jQuery downloaded: ' + jqVrsn );
                        }
                        done();
                    });
                })
                .on( 'error', function( err ) { // Handle errors
                    fs.unlink( dest ); // Delete the file async. (But we don't check the result)
                    console.log( '[downloadJQuery] ERROR: ' + err.message );
                    done();
                });
            } else {
                if (!skipMsg) {
                    console.log( '[downloadJQuery] No unminified jQuery downloaded -- version lower than 1.9.' );
                    done();
                }
            }
        },

        generatePackageJson: function () {
            var ctx = {
                appName: this.appName,
                version: this.version,
                author: this.author,
                email: this.email,
                serveOptn: this.serveOptn
            };

            this.template('_package.json', 'package.json', ctx);

            if (!this.options['skip-message']) {
                console.log('[generatePackageJson] package.json generated.');
            }
        },

        copyFiles: function () {
            this.copy("_main.scss", "src/sass/main.scss");
            this.copy("_reset.scss", "src/sass/libs/_reset.scss");
            this.copy("_jquery-ui-1.11.4.min.css", "src/sass/libs/_jquery-ui-1.11.4.min.scss");
            this.copy("_jquery-ui.structure-1.11.4.min.css", "src/sass/libs/_jquery-ui.structure-1.11.4.min.scss");
            this.copy("_jquery-ui.theme-1.11.4.min.css", "src/sass/libs/_jquery-ui.theme-1.11.4.min.scss");
            this.copy("_all.scss", "src/sass/modules/_all.scss");
            this.copy("_vars.scss", "src/sass/modules/_vars.scss");
            this.copy("_mixins.scss", "src/sass/modules/_mixins.scss");
            this.copy("_webfonts.scss", "src/sass/modules/_webfonts.scss");
            this.copy("_base.scss", "src/sass/partials/_base.scss");
            this.copy("_responsive.scss", "src/sass/partials/_responsive.scss");
            this.copy("_page.scss", "src/sass/partials/_page.scss");
            this.copy("_masthead.scss", "src/sass/partials/_masthead.scss");
            this.copy("_component1.scss", "src/sass/partials/_component1.scss");
            this.copy("_component2.scss", "src/sass/partials/_component2.scss");
            this.copy("_jquery-ui-1.11.4.min.js", "src/js/libs/jquery-ui-1.11.4.min.js");
            this.copy("_modernizr.2.8.3.custom.js", "src/js/libs/modernizr.2.8.3.custom.js");

            this.directory("images", "src/css/images");

            if (!this.options['skip-message']) {
                console.log('[copyFiles] Main files generated.');
            }
        },

        generateHomepage: function () {
            // Generates index.html with this.appName injected via template.
            var ctx = {
                site_name: this.appName,
                jqVersion: this.jqVer
            };

            this.template('_index.html', 'src/index.html', ctx);

            if (!this.options['skip-message']) {
                console.log('[generateHomepage] index.html generated.');
            }
        },

        generateGruntfile: function () {
            var myOptn = this.eq3optn ? 'true' : 'false';
            var myServeOptn = this.serveOptn ? 'true' : 'false';
            var myCtx = {
                eqOptn: myOptn,
                serveOptn: myServeOptn
            }

            this.template('_gruntfile.js', 'Gruntfile.js', myCtx);

            if (!this.options['skip-message']) {
                console.log('[generateGruntFile] Gruntfile.js generated.');
            }
        },

        generateMainJs: function () {
            // Generates main.js with this.appName injected via template.
            var myEquals = this.eq3optn ? '===' : '==';
            var myNotEquals = this.eq3optn ? '!==' : '!=';
            var myCtx = {
                app_name: this.appName,
                equals: myEquals,
                not_equals: myNotEquals
            };

            this.template('_main.js', 'src/js/main.js', myCtx);

            if (!this.options['skip-message']) {
                console.log('[generateMainJs] main.js generated.');
            }

        }

    },

    install: function () {
        var myOptions;

        if ( this.options[ 'skip-install-message' ] ) {
            myOptions = {
                npm: true,
                bower: false,
                skipMessage: true,
                skipInstall: this.options[ 'skip-install' ]
            };
        } else {
            myOptions = {
                npm: true,
                bower: false,
                skipMessage: false,
                skipInstall: this.options[ 'skip-install' ],
                callback: function () {
                    console.log( '[install] NPM modules installed.' );
                }
            };
        }

        this.installDependencies( myOptions );
    },

    end: function () {
        if (!this.options['skip-message']) {
            console.log('\nYOUR PROJECT IS NOW READY!\n' + 
                'Reminder: git-/svn-ignore /build, /node_modules, and /.sass-cache folders\n' + 
                'before initial commit.');
            if (this.serveOptn) {
                console.log('Run grunt serve to open webpage and watch source file changes.\n');
            } else {
                console.log('Run grunt sass:dev and grunt watch to compile main.css and watch source file changes.');
            }
        }
    }

});

module.exports = TzeGenerator;
