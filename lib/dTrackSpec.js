import dTrack from './dTrack';
import assert from 'assert';
import path from 'path';
describe('Command line module', () => {
  let commandLineArguments = ['node', path.join(__dirname, 'dTrack.js')];
  let sampleFilePath = path.join(__dirname, '..', 'samples', 'es6', 'no-import.js');
  it('fails if we don\'t pass arguments', () => {
    assert.throws(() => {
      dTrack.init(commandLineArguments);
    }, /Input file needed/);
  });

  it('calls the init function if the entry point of the app is passed', () => {
    let dTrackArguments = commandLineArguments.concat([sampleFilePath]);
    assert.deepEqual(['no-import'], dTrack.init(dTrackArguments));
  });

  it('supports the dot format', () => {
    let dTrackArguments = commandLineArguments.concat([sampleFilePath, '-f', 'dot']);
    assert.deepEqual('digraph "no-import" { "no-import" }', dTrack.init(dTrackArguments));
  });

  it('rejects unsupported option', () => {
    let dTrackArguments = commandLineArguments.concat([sampleFilePath, '-x', 'mmmm']);
    assert.throws(() => {
      dTrack.init(dTrackArguments)
    },/It only supports an output format option '-f' and\/or import type '-t'/);
  })
});
