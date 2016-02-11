import dTrack from './dTrack';
import assert from 'assert';
import path from 'path';
describe('Command line module', () => {
  let commandLineArguments = ['node', path.join(__dirname, 'dTrack.js')];
  it('fails if we don\'t pass arguments', () => {
    assert.throws(() => {
      dTrack.init(commandLineArguments);
    }, /InvalidArguments/);
  });

  it('calls the init function if the entry point of the app is passed', () => {
    let sampleFilePath = path.join(__dirname, '..', 'samples', 'es6', 'no-import.js');
    let dTrackArguments = commandLineArguments.concat([sampleFilePath]);
    assert.deepEqual(['no-import'], dTrack.init(dTrackArguments));
  });

  it('throws another exception if the wrong option is passed', () => {
    let dTrackArguments = commandLineArguments.concat(['-x', 'dTrack.js']);
    assert.throws(() => dTrack.init(dTrackArguments), /File -x doesn't exist or it's not accessible/);
  });

  it('supports the dot format', () => {
    let sampleFilePath = path.join(__dirname, '..', 'samples', 'es6', 'no-import.js');
    let dTrackArguments = commandLineArguments.concat([sampleFilePath, '-f', 'dot']);
    assert.deepEqual('digraph "no-import" { "no-import" }', dTrack.init(dTrackArguments));
  });

});
