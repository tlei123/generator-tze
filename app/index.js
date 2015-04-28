// var util = require('util');
// var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var http = require('http');
var fs = require('fs');
var postdata = require('postdata');

var TzeGenerator = yeoman.generators.Base.extend({
    initializing: function () {
        'use strict';
        this.pkg = require('../package.json');
    },

    prompting: function () {
        'use strict';
        var done = this.async();

        // Greet User.
        if (!this.options['skip-welcome-message']) {
            console.log(yosay('WELCOME to the Tze Generator for Yeoman!\n' + 
                            'Please input/select your properties/options...'));
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
                default: '0.0.0'
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
                type: 'list',
                name: 'uiOptn',
                message: 'jQuery-UI or Bootstrap',
                choices: [
                    { name: 'jQuery-UI', value: 'jqueryui' }, 
                    { name: 'Bootstrap', value: 'bootstrap' } 
                ],
                default: 'jqueryui'
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
            this.uiOptn = answers.uiOptn;
            this.eq3optn = answers.eq3optn;
            this.serveOptn = answers.serveOptn;

            if (!this.options['skip-message']) {
                console.log('\nOK, thanks!  HERE are your inputs:\n' +
                    'Name: ' + this.appName + '\n' +
                    'Version: ' + this.version + '\n' +
                    'Author: ' + this.author + '\n' + 
                    'Email: ' + this.email + '\n' + 
                    'jQuery version: ' + this.jqVer + '\n' + 
                    'jQuery-UI or Bootstrap: ' + this.uiOptn + '\n' + 
                    'JsHint eqeqeq: ' + this.eq3optn + '\n\n' + 
                    'Grunt serve: ' + this.serveOptn + '\n\n' + 
                    'STARTING PROJECT SCAFFOLDING NOW...\n');
            }

            done();
        }.bind(this));
    },

    writing: {
        scaffoldFolders: function () {
            'use strict';
            this.mkdir("src");
            this.mkdir("src/css");
            if ( this.uiOptn === 'jqueryui' ) {
                this.mkdir("src/css/images");
            }
            this.mkdir("src/fonts");
            this.mkdir("src/images");
            this.mkdir("src/sass");
            this.mkdir("src/sass/modules");
            this.mkdir("src/sass/partials");
            this.mkdir("src/sass/libs");
            if ( this.uiOptn === 'bootstrap' ) {
                this.mkdir( "src/sass/libs/bootstrap" );
                this.mkdir( "src/sass/libs/bootstrap/mixins" );
            }
            this.mkdir("src/js");
            this.mkdir("src/js/libs");
            // this.mkdir("src/js/sections");
            this.mkdir("build");

            if (!this.options['skip-message']) {
                console.log('[scaffoldFolders] Folders generated.');
            }
        },
        
        downloadJQueryMin: function () {
            'use strict';
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
            'use strict';
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
            'use strict';
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
            'use strict';
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

        generateSassVars: function () {
            'use strict';
            var ctx = {
                uiOptn: this.uiOptn
            };

            this.template('_vars.scss', 'src/sass/modules/_vars.scss', ctx);

            if (!this.options['skip-message']) {
                console.log('[generateSassBase] _vars.scss generated.');
            }
        },

        generateSassMixins: function () {
            'use strict';
            var ctx = {
                uiOptn: this.uiOptn
            };

            this.template('_mixins.scss', 'src/sass/modules/_mixins.scss', ctx);

            if (!this.options['skip-message']) {
                console.log('[generateSassBase] _mixins.scss generated.');
            }
        },

        generateSassBase: function () {
            'use strict';
            var ctx = {
                uiOptn: this.uiOptn
            };

            this.template('_base.scss', 'src/sass/partials/_base.scss', ctx);

            if (!this.options['skip-message']) {
                console.log('[generateSassBase] _base.scss generated.');
            }
        },

        generateSassCmp1: function () {
            'use strict';
            var ctx = {
                uiOptn: this.uiOptn
            };

            this.template('_component1.scss', 'src/sass/partials/_component1.scss', ctx);

            if (!this.options['skip-message']) {
                console.log('[generateSassBase] _component1.scss generated.');
            }
        },

        generateSassMain: function () {
            'use strict';
            var ctx = {
                uiOptn: this.uiOptn
            };

            this.template('_main.scss', 'src/sass/main.scss', ctx);

            if (!this.options['skip-message']) {
                console.log('[generateSassBase] main.scss generated.');
            }
        },

        copyFiles: function () {
            'use strict';
            this.copy("_all.scss", "src/sass/modules/_all.scss");
            this.copy("_webfonts.scss", "src/sass/modules/_webfonts.scss");
            if ( this.uiOptn === 'jqueryui' ) {
                this.copy("_reset.scss", "src/sass/libs/_reset.scss");
                this.copy("_responsive.scss", "src/sass/partials/_responsive.scss");
            }
            this.copy("_page.scss", "src/sass/partials/_page.scss");
            this.copy("_masthead.scss", "src/sass/partials/_masthead.scss");
            this.copy("_component2.scss", "src/sass/partials/_component2.scss");
            this.copy("_modernizr.2.8.3.custom.js", "src/js/libs/modernizr.2.8.3.custom.js");
            this.copy("bootstrap/_respond.min.js", "src/js/libs/respond.min.js");

            if ( this.uiOptn === 'jqueryui' ) {
                this.copy("jqueryui/_jquery-ui-1.11.4.min.css", "src/sass/libs/_jquery-ui-1.11.4.min.scss");
                this.copy("jqueryui/_jquery-ui.structure-1.11.4.min.css", "src/sass/libs/_jquery-ui.structure-1.11.4.min.scss");
                this.copy("jqueryui/_jquery-ui.theme-1.11.4.min.css", "src/sass/libs/_jquery-ui.theme-1.11.4.min.scss");
                this.directory("jqueryui/images", "src/css/images");
                this.copy("jqueryui/_jquery-ui-1.11.4.min.js", "src/js/libs/jquery-ui-1.11.4.min.js");
            } else if ( this.uiOptn === 'bootstrap' ) {
                this.copy("bootstrap/_alerts.scss", "src/sass/libs/bootstrap/_alerts.scss");
                this.copy("bootstrap/_badges.scss", "src/sass/libs/bootstrap/_badges.scss");
                this.copy("bootstrap/_bootstrap.scss", "src/sass/libs/bootstrap/_bootstrap.scss");
                this.copy("bootstrap/_breadcrumbs.scss", "src/sass/libs/bootstrap/_breadcrumbs.scss");
                this.copy("bootstrap/_button-groups.scss", "src/sass/libs/bootstrap/_button-groups.scss");
                this.copy("bootstrap/_buttons.scss", "src/sass/libs/bootstrap/_buttons.scss");
                this.copy("bootstrap/_carousel.scss", "src/sass/libs/bootstrap/_carousel.scss");
                this.copy("bootstrap/_close.scss", "src/sass/libs/bootstrap/_close.scss");
                this.copy("bootstrap/_code.scss", "src/sass/libs/bootstrap/_code.scss");
                this.copy("bootstrap/_component-animations.scss", "src/sass/libs/bootstrap/_component-animations.scss");
                this.copy("bootstrap/_dropdowns.scss", "src/sass/libs/bootstrap/_dropdowns.scss");
                this.copy("bootstrap/_forms.scss", "src/sass/libs/bootstrap/_forms.scss");
                this.copy("bootstrap/_glyphicons.scss", "src/sass/libs/bootstrap/_glyphicons.scss");
                this.copy("bootstrap/_grid.scss", "src/sass/libs/bootstrap/_grid.scss");
                this.copy("bootstrap/_input-groups.scss", "src/sass/libs/bootstrap/_input-groups.scss");
                this.copy("bootstrap/_jumbotron.scss", "src/sass/libs/bootstrap/_jumbotron.scss");
                this.copy("bootstrap/_labels.scss", "src/sass/libs/bootstrap/_labels.scss");
                this.copy("bootstrap/_list-group.scss", "src/sass/libs/bootstrap/_list-group.scss");
                this.copy("bootstrap/_media.scss", "src/sass/libs/bootstrap/_media.scss");
                this.copy("bootstrap/_mixins.scss", "src/sass/libs/bootstrap/_mixins.scss");
                this.copy("bootstrap/_modals.scss", "src/sass/libs/bootstrap/_modals.scss");
                this.copy("bootstrap/_navbar.scss", "src/sass/libs/bootstrap/_navbar.scss");
                this.copy("bootstrap/_navs.scss", "src/sass/libs/bootstrap/_navs.scss");
                this.copy("bootstrap/_navs.scss", "src/sass/libs/bootstrap/_normalize.scss");
                this.copy("bootstrap/_pager.scss", "src/sass/libs/bootstrap/_pager.scss");
                this.copy("bootstrap/_pagination.scss", "src/sass/libs/bootstrap/_pagination.scss");
                this.copy("bootstrap/_panels.scss", "src/sass/libs/bootstrap/_panels.scss");
                this.copy("bootstrap/_popovers.scss", "src/sass/libs/bootstrap/_popovers.scss");
                this.copy("bootstrap/_print.scss", "src/sass/libs/bootstrap/_print.scss");
                this.copy("bootstrap/_progress-bars.scss", "src/sass/libs/bootstrap/_progress-bars.scss");
                this.copy("bootstrap/_progress-bars.scss", "src/sass/libs/bootstrap/_responsive-embed.scss");
                this.copy("bootstrap/_responsive-utilities.scss", "src/sass/libs/bootstrap/_responsive-utilities.scss");
                this.copy("bootstrap/_scaffolding.scss", "src/sass/libs/bootstrap/_scaffolding.scss");
                this.copy("bootstrap/_tables.scss", "src/sass/libs/bootstrap/_tables.scss");
                this.copy("bootstrap/_theme.scss", "src/sass/libs/bootstrap/_theme.scss");
                this.copy("bootstrap/_thumbnails.scss", "src/sass/libs/bootstrap/_thumbnails.scss");
                this.copy("bootstrap/_tooltip.scss", "src/sass/libs/bootstrap/_tooltip.scss");
                this.copy("bootstrap/_type.scss", "src/sass/libs/bootstrap/_type.scss");
                this.copy("bootstrap/_utilities.scss", "src/sass/libs/bootstrap/_utilities.scss");
                this.copy("bootstrap/_variables.scss", "src/sass/libs/bootstrap/_variables.scss");
                this.copy("bootstrap/_wells.scss", "src/sass/libs/bootstrap/_wells.scss");
                this.copy('bootstrap/mixins/_alerts.scss', 'src/sass/libs/bootstrap/mixins/_alerts.scss');
                this.copy('bootstrap/mixins/_background-variant.scss', 'src/sass/libs/bootstrap/mixins/_background-variant.scss');
                this.copy('bootstrap/mixins/_border-radius.scss', 'src/sass/libs/bootstrap/mixins/_border-radius.scss');
                this.copy('bootstrap/mixins/_buttons.scss', 'src/sass/libs/bootstrap/mixins/_buttons.scss');
                this.copy('bootstrap/mixins/_center-block.scss', 'src/sass/libs/bootstrap/mixins/_center-block.scss');
                this.copy('bootstrap/mixins/_clearfix.scss', 'src/sass/libs/bootstrap/mixins/_clearfix.scss');
                this.copy('bootstrap/mixins/_forms.scss', 'src/sass/libs/bootstrap/mixins/_forms.scss');
                this.copy('bootstrap/mixins/_gradients.scss', 'src/sass/libs/bootstrap/mixins/_gradients.scss');
                this.copy('bootstrap/mixins/_grid-framework.scss', 'src/sass/libs/bootstrap/mixins/_grid-framework.scss');
                this.copy('bootstrap/mixins/_grid.scss', 'src/sass/libs/bootstrap/mixins/_grid.scss');
                this.copy('bootstrap/mixins/_hide-text.scss', 'src/sass/libs/bootstrap/mixins/_hide-text.scss');
                this.copy('bootstrap/mixins/_image.scss', 'src/sass/libs/bootstrap/mixins/_image.scss');
                this.copy('bootstrap/mixins/_labels.scss', 'src/sass/libs/bootstrap/mixins/_labels.scss');
                this.copy('bootstrap/mixins/_list-group.scss', 'src/sass/libs/bootstrap/mixins/_list-group.scss');
                this.copy('bootstrap/mixins/_nav-divider.scss', 'src/sass/libs/bootstrap/mixins/_nav-divider.scss');
                this.copy('bootstrap/mixins/_nav-vertical-align.scss', 'src/sass/libs/bootstrap/mixins/_nav-vertical-align.scss');
                this.copy('bootstrap/mixins/_opacity.scss', 'src/sass/libs/bootstrap/mixins/_opacity.scss');
                this.copy('bootstrap/mixins/_pagination.scss', 'src/sass/libs/bootstrap/mixins/_pagination.scss');
                this.copy('bootstrap/mixins/_panels.scss', 'src/sass/libs/bootstrap/mixins/_panels.scss');
                this.copy('bootstrap/mixins/_progress-bar.scss', 'src/sass/libs/bootstrap/mixins/_progress-bar.scss');
                this.copy('bootstrap/mixins/_reset-filter.scss', 'src/sass/libs/bootstrap/mixins/_reset-filter.scss');
                this.copy('bootstrap/mixins/_resize.scss', 'src/sass/libs/bootstrap/mixins/_resize.scss');
                this.copy('bootstrap/mixins/_responsive-visibility.scss', 'src/sass/libs/bootstrap/mixins/_responsive-visibility.scss');
                this.copy('bootstrap/mixins/_size.scss', 'src/sass/libs/bootstrap/mixins/_size.scss');
                this.copy('bootstrap/mixins/_tab-focus.scss', 'src/sass/libs/bootstrap/mixins/_tab-focus.scss');
                this.copy('bootstrap/mixins/_table-row.scss', 'src/sass/libs/bootstrap/mixins/_table-row.scss');
                this.copy('bootstrap/mixins/_text-emphasis.scss', 'src/sass/libs/bootstrap/mixins/_text-emphasis.scss');
                this.copy('bootstrap/mixins/_text-overflow.scss', 'src/sass/libs/bootstrap/mixins/_text-overflow.scss');
                this.copy('bootstrap/mixins/_vendor-prefixes.scss', 'src/sass/libs/bootstrap/mixins/_vendor-prefixes.scss');
                this.copy("bootstrap/_glyphicons-halflings-regular.eot", "src/fonts/bootstrap/glyphicons-halflings-regular.eot");
                this.copy("bootstrap/_glyphicons-halflings-regular.svg", "src/fonts/bootstrap/glyphicons-halflings-regular.svg");
                this.copy("bootstrap/_glyphicons-halflings-regular.ttf", "src/fonts/bootstrap/glyphicons-halflings-regular.ttf");
                this.copy("bootstrap/_glyphicons-halflings-regular.woff", "src/fonts/bootstrap/glyphicons-halflings-regular.woff");
                this.copy("bootstrap/_glyphicons-halflings-regular.woff", "src/fonts/bootstrap/glyphicons-halflings-regular.woff2");
                this.copy("bootstrap/_bootstrap.js", "src/js/libs/bootstrap.js");
                this.copy("bootstrap/_bootstrap.min.js", "src/js/libs/bootstrap.min.js");
                this.copy("bootstrap/_ie-emulation-modes-warning.js", "src/js/libs/ie-emulation-modes-warning.js");
                this.copy("bootstrap/_ie10-viewport-bug-workaround.js", "src/js/libs/ie10-viewport-bug-workaround.js");
            }

            if (!this.options['skip-message']) {
                console.log('[copyFiles] Main files generated.');
            }
        },

        generateHomepage: function () {
            // Generates index.html with this.appName injected via template.
            'use strict';
            var ctx = {
                site_name: this.appName,
                jqVersion: this.jqVer,
                uiOptn: this.uiOptn
            };

            this.template('_index.html', 'src/index.html', ctx);

            if (!this.options['skip-message']) {
                console.log('[generateHomepage] index.html generated.');
            }
        },

        generateGruntfile: function () {
            'use strict';
            var myOptn = this.eq3optn;
            var myServeOptn = this.serveOptn;
            var myUiOptn = this.uiOptn;
            var myCtx = {
                eqOptn: myOptn,
                serveOptn: myServeOptn,
                uiOptn: myUiOptn
            };

            this.template('_gruntfile.js', 'Gruntfile.js', myCtx);

            if (!this.options['skip-message']) {
                console.log('[generateGruntFile] Gruntfile.js generated.');
            }
        },

        generateMainJs: function () {
            // Generates main.js with this.appName injected via template.
            'use strict';
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
        'use strict';
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
        'use strict';
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
