'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var tzeGenerator = yeoman.generators.Base.extend({
    promptUser: function () {
        var done = this.async();

        // Greet User.
        console.log('WELCOME to the Tze Generator for Yeoman!\n' + 
            'Let\'s get some basic project info/options set up...');

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
                default: '0.0.3'
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
                type: 'confirm',
                name: 'eq3optn',
                message: 'JsHint eqeqeq [require === and !===]?'
            }
        ];

        this.prompt(prompts, function (answers) {
            this.appName = answers.appName;
            this.version = answers.version;
            this.author = answers.author;
            this.email = answers.email;
            this.eq3optn = answers.eq3optn;

            console.log('\nOK, thanks!  HERE are your inputs:\n' +
                'Name: ' + this.appName + '\n' +
                'Version: ' + this.version + '\n' +
                'Author: ' + this.author + '\n' + 
                'Email: ' + this.email + '\n' + 
                'JsHint eqeqeq: ' + this.eq3optn + '\n\n' + 
                'STATING PROJECT SCAFFOLDING NOW...\n');

            done();
        }.bind(this));
    },

    scaffoldFolders: function () {
        this.mkdir("src");
        this.mkdir("src/css");
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

        console.log('[scaffoldFolders] Folders generated.');
    },

    generatePackageJson: function () {
        var ctx = {
            appName: this.appName,
            version: this.version,
            author: this.author,
            email: this.email
        };

        this.template('_package.json', 'package.json', ctx);

        console.log('[generatePackageJson] package.json generated.');
    },

    copyMainFiles: function () {
        this.copy("_main.scss", "src/sass/main.scss");
        this.copy("_reset.scss", "src/sass/libs/_reset.scss");
        this.copy("_all.scss", "src/sass/modules/_all.scss");
        this.copy("_vars.scss", "src/sass/modules/_vars.scss");
        this.copy("_mixins.scss", "src/sass/modules/_mixins.scss");
        this.copy("_webfonts.scss", "src/sass/modules/_webfonts.scss");
        this.copy("_responsive.scss", "src/sass/modules/_responsive.scss");
        this.copy("_base.scss", "src/sass/partials/_base.scss");
        this.copy("_page.scss", "src/sass/partials/_page.scss");
        this.copy("_main.js", "src/js/main.js");
        this.copy("_jquery.1.7.1.min.js", "src/js/libs/jquery.1.7.1.min.js");
        this.copy("_jquery-ui.1.8.24.min.js", "src/js/libs/jquery-ui.1.8.24.min.js");
        this.copy("_modernizr.2.8.3.custom.js", "src/js/libs/modernizr.2.8.3.custom.js");

        console.log('[copyMainFiles] Main files generated.');
    },
    
    generateHomepage: function () {
        // Generates index.html with this.appName injected via template.
        var ctx = {
            site_name: this.appName
        };

        this.template('_index.html', 'src/index.html', ctx);

        console.log('[generateHomepage] index.html generated.');
    },

    generateGruntfile: function () {
        var myOptn = this.eq3optn ? 'true' : 'false';
        var myCtx = {
            eqOptn: myOptn
        }

        this.template('_gruntfile.js', 'Gruntfile.js', myCtx);

        console.log('[generateGruntFile] Gruntfile.js generated.');
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

        console.log('[generateMainJs] main.js generated.');
    },

    runNpm: function () {
        // Runs npm install --save-dev based on generated package.json.
        console.log('[runNpm] Installing npm modules...');
        this.npmInstall('', function () {
            console.log('\n[runNpm] Node modules installed.\n\n' + 
                'YOUR PROJECT IS NOW READY!\n' + 
                'IMPORTANT: git-/svn-ignore /build, /node_modules, and /.sass-cache folders before commit.\n');
        });
    }
});

module.exports = tzeGenerator;
