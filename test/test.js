(function(){
    'use strict';
    var assert = require('assert');
    assert.ok(true);
    var dTrack = require('../index.js');
    describe('dTrack', function(){
        describe('File module', function(){
            it('Should be able to return the file content', function(){
                var content = dTrack.fs.open(__dirname + '/support/testFile.txt');
                assert.equal(typeof content, 'string');
                assert.equal(content[3], 'd');
            });
            it('should return -1 if the file doesn\'t exists', function(){
                var content = dTrack.fs.open('I dont exists');
                assert.equal(content, -1);
            });
        });

        describe('Parser module', function() {
            it('Should be able to return the tokens of a js file', function() {
                var tokens = dTrack.parser.getTokens(__dirname + '/support/config.js');
                assert.equal(Object.prototype.toString.call(tokens), '[object Array]');
                assert(tokens[0].hasOwnProperty('type'));
                assert(tokens[0].hasOwnProperty('value'));
            });
            describe('Get AMD modules dependencies', function() {
                it('should be able to recieve the function name to process', function(){
                    var tokens = dTrack.parser.getTokens(__dirname + '/support/config.js');
                    var args = dTrack.parser.argumentsFor('requirejs', tokens);
                    assert(args instanceof Array);
                    assert.equal(args[0], 'global/globals');
                    assert.equal(args[1], 'global/config');
                });
                it('should be able to process regular amd modules', function(){
                    var tokens = dTrack.parser.getTokens(__dirname + '/support/module.js');
                    var args = dTrack.parser.argumentsFor('define', tokens);
                    assert(args instanceof Array);
                    assert.equal(args[0], 'moduleA');
                });

                it('should be able to process amd modules inside self-exec functions', function(){
                    var tokens = dTrack.parser.getTokens(__dirname + '/support/moduleSelfFunc.js');
                    var args = dTrack.parser.argumentsFor('define', tokens);
                    assert(args instanceof Array);
                    assert.equal(args[0], 'moduleA');
                });

                it('should be able to process non-array deps in amd modules', function(){
                    var tokens = dTrack.parser.getTokens(__dirname + '/support/moduleNonArray.js');
                    var args = dTrack.parser.argumentsFor('define', tokens);
                    assert(args instanceof Array);
                    assert.equal(args[0], 'moduleA');
                });
            });
        });

        describe('Helper module', function() {
            describe('requirejs functions', function(){
                it('should be able to get the require paths from the keys', function(){
                    var dep = dTrack.builders.dependencyBuilder.getBuilder('AMD');
                    var map = dep.requireMaps(__dirname + '/support/requireConfig.js');
                    assert.equal(Object.keys(map).length, 32);
                    assert(map.hasOwnProperty('Backbone'));
                    assert.equal(map.Backbone,'vendor/backbone/backbone-1.1.2.min');
                    assert(map.hasOwnProperty('EventViewAdapter'));
                    assert.equal(map.EventViewAdapter,'app/views/EventViewAdapter');
                });
            });
            describe('helpers functions', function(){
                it('should be able to find index in object struct recursivelly', function(){
                    var assertionStruct = {
                        level1: {
                            level2: {
                                level3: {

                                }
                            }
                        }
                    };
                    var pointerToIndex = dTrack.helper.utils.findLevelInStruct(assertionStruct, 'level3');
                    pointerToIndex.level3 = 'found';
                    assert(assertionStruct.level1.level2.level3 === 'found');
                });
            });
        });

        describe('Graph module', function(){
            describe('AMD dependencies', function(){
                it('should be able to accept a config file', function(){
                    var dependencies = dTrack.graph.readFromFile('AMD',__dirname + '/support/sampleAppConfig/app.js',
                        __dirname + '/support/sampleAppConfig/config.js');
                    assert(dependencies.hasOwnProperty('app.js'));
                    assert(dependencies['app.js'].jquery);
                    assert(dependencies['app.js'].Router);
                    assert(dependencies['app.js'].PageController);
                    assert(dependencies['app.js'].BasePage);
                    //second level
                    assert(dependencies['app.js'].PageController.Pages);
                    assert(dependencies['app.js'].PageController.BasePage);
                    assert(dependencies['app.js'].PageController.Repository);
                });
                it('should be able to the first level dependencies', function(){
                    var dependencies = dTrack.graph.readFromFile('AMD',__dirname + '/support/sampleApp/app.js');
                    //first level
                    assert(dependencies.hasOwnProperty('app.js'));
                    assert(dependencies['app.js'].jquery);
                    assert(dependencies['app.js']['./route/Router']);
                    assert(dependencies['app.js']['./controller/PageController']);
                    assert(dependencies['app.js']['./controller/BasePage']);
                });
//                it('should track a complex tree', function(){
//                    var kk = dTrack.graph.readFromFile('tmp/app/app.js', 'tmp/global/config.js', 'tmp');
//                });
            });

        });
        describe('Dependency strategy module', function(){
           it('should choose the AMD dependency builder based on string', function(){
               var dependencyBuilder = dTrack.builders.dependencyBuilder.getBuilder('AMD');
               assert.equal(dependencyBuilder.type, 'AMD');
           });
           it('should choose the CommonsJS depdendency build based on string', function() {
                var dependencyBuilder = dTrack.builders.dependencyBuilder.getBuilder('CommonJS');
                assert.equal(dependencyBuilder.type, 'CommonJS');
           });
        });

        describe('Dot integration', function() {
           describe('Dot module basic layout', function() {
               it('should write output in doc format', function() {
                   var dependencies = dTrack.graph.readFromFile('AMD', __dirname + '/support/sampleAppConfig/app.js',
                    __dirname + '/support/sampleAppConfig/config.js');
                   var output = 'digraph dependencies { "app.js" -> "jquery" [dir=back];"app.js" -> "Router" [dir=back];' +
                           '"app.js" -> "PageController" [dir=back];' +
                           '"app.js" -> "BasePage" [dir=back];' +
                           '"Router" -> "Backbone" [dir=back];' +
                           '"PageController" -> "Pages" [dir=back];' +
                           '"PageController" -> "BasePage" [dir=back];' +
                           '"PageController" -> "Repository" [dir=back];' +
                           '"BasePage" -> "PageCommon" [dir=back];' +
                           '"BasePage" -> "Providers" [dir=back];' +
                           '"PageCommon" -> "jquery" [dir=back];' +
                           '"PageCommon" -> "underscore" [dir=back];' +
                           '"Providers" -> "jquery" [dir=back];' +
                           '"Providers" -> "Repository" [dir=back]; }';

                   var dotModule = dTrack.layout.dot(dependencies, 'dependencies');
                   assert.equal(output, dotModule);
               });
           });
        });

        describe('CommonJS module', function(){
            describe('Capture requires inside a file', function () {
                it('should be able to recover the argument of a require inside a file', function() {
                    var tokens = dTrack.parser.getTokens(__dirname + '/support/CommonJS/basicRequireUse.js');
                    var args = dTrack.parser.argumentsFor('require', tokens);
                    assert(args instanceof Array);
                    assert.equal(args[0], 'file');
                });
            });
        });
    });
})();
