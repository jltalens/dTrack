#!/usr/bin/env node
var fs = require('fs');
var dTrack = require('../');
var util = require('util'),
    graph;
function checkOpts(opts) {
    'use strict';
    if (opts.length < 1 || opts.length > 2) {
        fs.readFile(__dirname + '/usage.txt', function(err, data){
            process.stdout.write(data);
        });
        return false;
    }
    return true;
}
process.stdout.on('error', process.exit);
var opts = process.argv.slice(2);
if (!checkOpts(opts)) {
    return;
    process.exit(1);
}
if (opts.length === 2) {
    graph = dTrack.graph.readFromFile('AMD', opts[0], opts[1]);
}
else {
    graph = dTrack.graph.readFromFile('AMD', opts[0]);
}
process.stdout.write(dTrack.layout.dot(graph, 'dependencies'));
// process.stdout.write(util.inspect(dTrack.graph.readFromFile(opts[0], opts[1], opts[2]), { depth: null, colors: true }))
