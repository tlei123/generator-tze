# generator-tze 0.1.6 [![Build Status](https://secure.travis-ci.org/tlei123/generator-tze.svg?branch=master)](https://travis-ci.org/tlei123/generator-tze)

This is a custom "basic" Yeoman Generator with just the Node modules and Javascript libraries I need to quickly start developing simple web applications:

 * grunt-contrib-sass
 * grunt-contrib-jshint
 * grunt-contrib-connect (optional)
 * grunt-contrib-watch
 * grunt-contrib-clean
 * grunt-contrib-copy
 * grunt-contrib-concat
 * grunt-processhtml
 * modernizr
 * jquery
 * jquery-ui

## Dependencies

 * [Node](http://nodejs.org/)
 * [Grunt](http://gruntjs.com/)
 * [Yeoman](http://yeoman.io)
 * [Ruby](http://rubyinstaller.org/) [Windows only]
 * SASS: ```gem install sass```

## Setup

Once the above dependencies have been installed:
```
npm install -g generator-tze
```
Create and switch to your project folder:
```
mkdir path/to/myproject
cd path/to/myproject
```
Generate your project:
```
yo tze
```
If you chose to include grunt-contrib-connect and grunt serve task, then start by compiling main.css, opening the sample webpage, and watching your source files:
```
grunt serve
```
Otherwise*, start by compiling main.css and watching your source files:
```
grunt sass:dev
grunt watch
```
THAT'S IT!  You're ready to get to work!  Check the [Wiki pages](https://github.com/tlei123/generator-tze/wiki) for more info on usage/workflow.

*By choosing NOT to include grunt-contrib-connect, I'm assuming that you already have a local webserver installed -- create a virtual host with src folder as docroot.