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
    let sampleFilePath = path.join(__dirname, '..', 'samples', 'es6-no-import.js');
    let dTrackArguments = commandLineArguments.concat(['-i', sampleFilePath]);
    assert.deepEqual(['es6-no-import'], dTrack.init(dTrackArguments));
  });

  it('throws another exception if the wrong option is passed', () => {
    let dTrackArguments = commandLineArguments.concat(['-x', 'dTrack.js']);
    assert.throws(() => dTrack.init(dTrackArguments), /InvalidArguments/);
  });

  it('supports the dot format', () => {
    let sampleFilePath = path.join(__dirname, '..', 'samples', 'es6-no-import.js');
    let dTrackArguments = commandLineArguments.concat(['-i',  sampleFilePath, '-f', 'dot']);
    assert.deepEqual('digraph "es6-no-import" { "es6-no-import" }', dTrack.init(dTrackArguments));
  });

});
