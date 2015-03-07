# generator-tze 0.0.5 [work-in-progress]

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
```npm install -g generator-tze```

Create and switch to your project folder:
```mkdir path/to/myproject```
```cd path/to/myproject```

Generate your project:
```yo tze```
```grunt sass:dev``` to generate your first main.css in /src/css