'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('generator-tze test', function () {
  var runGen;

  before(function (done) {
    runGen = helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-testtze'))
      .withOptions({ 
        'skip-install': true,
        'skip-welcome-message': true,
        'skip-message': true,
        'skip-install-message': true
      })
      .withPrompt({
        appName: 'testTze',
        version: '0.0.0',
        author: 'Tze Lei',
        email: 'tze.lei@mrm-mccann.com',
        jqVersion: '1.11.2',
        eq3optn: true
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

  it('creates all JavaScript files in src/js', function () {
    assert.file([
      'src/js/main.js',
      'src/js/libs/jquery-1.11.2.min.js',
      'src/js/libs/jquery-ui-1.11.2.min.js',
      'src/js/libs/modernizr.2.8.3.custom.js'
    ]);
  });

  it('creates all SASS files in src/sass', function () {
    assert.file([
      'src/sass/libs/_reset.scss',
      'src/sass/libs/_jquery-ui-1.11.2.min.scss',
      'src/sass/libs/_jquery-ui.structure-1.11.2.min.scss',
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

  describe('writes generator User-options', function () {
    it ('appName ["testTze"] into package.json & main.js', function () {
      assert.fileContent([
        ['package.json', /"name"\: "testTze"/],
        ['src/js/main.js', /var testTze = function \(\$\) /],
        ['src/js/main.js', /testTze\.init\(\$\(.+\)\);/]
      ]);
    });

    it ('version ["0.0.0"] into package.json', function () {
      assert.fileContent([
        ['package.json', /"version"\: "0\.0\.0"/]
      ]);
    });

    it ('author ["Tze Lei"] into package.json', function () {
      assert.fileContent([
        ['package.json', /"author"\: "Tze Lei"/]
      ]);
    });

    it ('email ["tze.lei@mrm-mccann.com"] into package.json', function () {
      assert.fileContent([
        ['package.json', /"email"\: "tze.lei@mrm-mccann.com"/]
      ]);
    });

    it ('jsHint eqeqeq [Yes] into Gruntfile.js', function () {
      assert.fileContent([
        ['Gruntfile.js', /eqeqeq: true/]
      ]);
    });

  });

});
