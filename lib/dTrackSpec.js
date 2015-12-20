import dTrack from './dTrack';
describe('Command line module', () => {
    let assert = require('assert');
    it('fails if we don\'t pass arguments', () => {
        let commandLineArguments = ['node', __dirname + './dTrack.js'];
        assert.throws(() => {
            dTrack.init(commandLineArguments);
        }, /InvalidArguments/);
    });

    it('calls the init function if the entry point of the app is passed', () => {
        let commandLineArguments = ['node', __dirname + './dTrack.js', '-i', './dTrack.js'];
        dTrack.__Rewire__('trackDependencies',  x => {return {}});
        assert.deepEqual({}, dTrack.init(commandLineArguments));
    });

});
