var assert = require( 'assert' );

describe ( 'generator-tze load test', function () {
	it( 'can be imported', function () {
			var app = require('../app');
			assert( app != undefined );
		} )
} );
