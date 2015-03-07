'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('generator-tze test', function () {
  before(function (done) {
    this.runGen = helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-testtze'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        appName: 'testTze',
        version: '0.0.4',
        author: 'Tze Lei',
        email: 'tze.lei@mrm-mccann.com',
        eq3optn: false
      })
      .on('end', done);
  });

  it('creates package.json & Gruntfile.js', function () {
    assert.file([
      'package.json',
      'Gruntfile.js'
    ]);
  });

  it('creates index.html in src', function () {
    assert.file([
      'src/index.html'
    ]);
  });

  it('creates JavaScript files in src/js', function () {
    assert.file([
      'src/js/main.js',
      'src/js/libs/jquery.1.7.1.min.js',
      'src/js/libs/jquery-ui.1.8.24.min.js',
      'src/js/libs/modernizr.2.8.3.custom.js'
    ]);
  });

  it('creates SASS files in src/sass', function () {
    assert.file([
      'src/sass/modules/_all.scss',
      'src/sass/modules/_vars.scss',
      'src/sass/modules/_mixins.scss',
      'src/sass/modules/_webfonts.scss',
      'src/sass/partials/_base.scss',
      'src/sass/partials/_responsive.scss',
      'src/sass/partials/_page.scss',
      'src/sass/partials/_masthead.scss',
      'src/sass/partials/_component1.scss',
      'src/sass/partials/_component2.scss',
      'src/sass/main.scss'
    ]);
  });

});
