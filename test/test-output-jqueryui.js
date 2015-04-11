'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('generator-tze output test - jquery-ui option', function () {
  var runGen;

  before(function (done) {
    this.timeout(10000);
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
        jqVersion: '2.1.3',
        eq3optn: true,
        servOptn: true
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
      'src/js/libs/jquery-2.1.3.min.js',
      'src/js/libs/jquery-ui-1.11.4.min.js',
      'src/js/libs/jquery.js',
      'src/js/libs/modernizr.2.8.3.custom.js'
    ]);
  });

  it('creates all SASS files in src/sass', function () {
    assert.file([
      'src/sass/libs/_reset.scss',
      'src/sass/libs/_jquery-ui-1.11.4.min.scss',
      'src/sass/libs/_jquery-ui.structure-1.11.4.min.scss',
      'src/sass/libs/_jquery-ui.theme-1.11.4.min.scss',
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

  it('creates all jQuery-UI images in src/css/images', function () {
    assert.file([
      'src/css/images/ui-bg_diagonals-thick_18_b81900_40x40.png',
      'src/css/images/ui-bg_diagonals-thick_20_666666_40x40.png',
      'src/css/images/ui-bg_flat_10_000000_40x100.png',
      'src/css/images/ui-bg_glass_100_f6f6f6_1x400.png',
      'src/css/images/ui-bg_glass_100_fdf5ce_1x400.png',
      'src/css/images/ui-bg_glass_65_ffffff_1x400.png',
      'src/css/images/ui-bg_gloss-wave_35_f6a828_500x100.png',
      'src/css/images/ui-bg_highlight-soft_100_eeeeee_1x100.png',
      'src/css/images/ui-bg_highlight-soft_75_ffe45c_1x100.png',
      'src/css/images/ui-icons_222222_256x240.png',
      'src/css/images/ui-icons_228ef1_256x240.png',
      'src/css/images/ui-icons_ef8c08_256x240.png',
      'src/css/images/ui-icons_ffd27a_256x240.png',
      'src/css/images/ui-icons_ffffff_256x240.png',
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

    it ('grunt-contrib-connect into package.json', function () {
      assert.fileContent([
        ['package.json', /"grunt-contrib-connect"/]
      ]);
    });

    it ('jQuery version [2.1.3] into index.html', function () {
      assert.fileContent([
        ['src/index.html', /jquery\-2\.1\.3\.min\.js/]
      ]);
    });

    it ('jQuery-UI [true] into index.html and _base.scss', function () {
      assert.fileContent([
        ['src/index.html', /jquery\-ui\-1\.11\.4\.min\.js/],
        ['src/sass/partials/_base.scss', /jquery\-ui\-1\.11\.4\.min/]
      ]);
    });

    it ('jsHint eqeqeq [true] into Gruntfile.js', function () {
      assert.fileContent([
        ['Gruntfile.js', /eqeqeq: true/]
      ]);
    });

    it ('grunt-contrib-connect and grunt serve into Gruntfile.js', function () {
      assert.fileContent([
        ['Gruntfile.js', /connect\: \{/],
        ['Gruntfile.js', /'grunt-contrib-connect'/],
        ['Gruntfile.js', /'connect:dev'/],
        ['Gruntfile.js', /'connect:build'/],
        ['Gruntfile.js', /'setWatchConfig'/],
        ['Gruntfile.js', /'serve'/],
        ['Gruntfile.js', /'buildWatch'/]
      ]);
    });
  });

});
