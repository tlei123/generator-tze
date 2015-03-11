# generator-tze 0.0.9 beta [![Build Status](https://secure.travis-ci.org/tlei123/generator-tze.svg?branch=master)](https://travis-ci.org/tlei123/generator-tze)

This is a custom "basic" Yeoman Generator with just the Node modules and Javascript libraries I need to quickly start developing simple web applications:

 * grunt-contrib-sass
 * grunt-contrib-jshint
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
Compile your first /src/css/main.css stylesheet:
```
grunt sass:dev
```
THAT'S IT!  You're ready to get to work!  Check the [Wiki pages](https://github.com/tlei123/generator-tze/wiki) for more info on usage/workflow.
