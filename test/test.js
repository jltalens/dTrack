(function(){
    'use strict';
    var assert = require('assert');
    assert.ok(true);
    var dTrack = require('../index.js');
    describe('dTrack', function(){
        describe('File module', function(){
            it('Should be able to return the file content', function(){
                var content = dTrack.fs.open('./support/testFile.js');
                assert.equal(typeof content, 'string');
                assert.equal(content[3], 'd');
            });
        });

        describe('Parser module', function() {
            it('Should be able to return the tokens of a js file', function() {
                var tokens = dTrack.parser.getTokens('./support/config.js');
                assert.equal(Object.prototype.toString.call(tokens), '[object Array]');
                assert(tokens[0].hasOwnProperty('type'));
                assert(tokens[0].hasOwnProperty('value'));
            });
            describe('Get amd modules dependencies', function() {
                it('should be able to recieve the function name to process', function(){
                    var tokens = dTrack.parser.getTokens('./support/config.js');
                    var args = dTrack.parser.argumentsFor('requirejs', tokens);
                    assert(args instanceof Array);
                    assert.equal(args[0], 'global/globals');
                    assert.equal(args[1], 'global/config');
                });
                it('should be able to process regular amd modules', function(){
                    var tokens = dTrack.parser.getTokens('./support/module.js');
                    var args = dTrack.parser.argumentsFor('define', tokens);
                    assert(args instanceof Array);
                    assert.equal(args[0], 'moduleA');
                });

                it('should be able to process amd modules inside self-exec functions', function(){
                    var tokens = dTrack.parser.getTokens('./support/moduleSelfFunc.js');
                    var args = dTrack.parser.argumentsFor('define', tokens);
                    assert(args instanceof Array);
                    assert.equal(args[0], 'moduleA');
                });

                it('should be able to process non-array deps in amd modules', function(){
                    var tokens = dTrack.parser.getTokens('./support/moduleNonArray.js');
                    var args = dTrack.parser.argumentsFor('define', tokens);
                    assert(args instanceof Array);
                    assert.equal(args[0], 'moduleA');
                });
            });
        });

        describe('Helper module', function() {
            describe('requirejs functions', function(){
                it('should be able to get the require paths from the keys', function(){
                    var map = dTrack.helper.requireMaps('./support/requireConfig.js');
                    assert.equal(Object.keys(map).length, 32);
                    assert(map.hasOwnProperty('Backbone'));
                    assert.equal(map.Backbone,'vendor/backbone/backbone-1.1.2.min');
                    assert(map.hasOwnProperty('EventViewAdapter'));
                    assert.equal(map.EventViewAdapter,'app/views/EventViewAdapter');
                });
            });
        });
    });
})();
