dTrack
=====

[![Build Status](https://api.travis-ci.org/jltalens/dTrack.svg?branch=es6-outside-in)](https://travis-ci.org/jltalens/dTrack)
[![Code Climate](https://codeclimate.com/github/jltalens/dTrack/badges/gpa.svg)](https://codeclimate.com/github/jltalens/dTrack)
[![Test Coverage](https://codeclimate.com/github/jltalens/dTrack/badges/coverage.svg)](https://codeclimate.com/github/jltalens/dTrack/coverage)
[![Issue Count](https://codeclimate.com/github/jltalens/dTrack/badges/issue_count.svg)](https://codeclimate.com/github/jltalens/dTrack)

dTrack is a Node.js app that outputs all the dependencies for projects using ES6 imports.


#Motivation

When I started working in big JS projects I missed having a more clear picture of which modules are related to which ones.
First I couldn't find any tool that could output a dependency graph of my projects in a clear way (okay... I really didn't look 
hard for one as I wanted to build it anyway) so I started to build my own. Also it's a good opportunity to learn some stuff on the way:

- ES6
- Some transpiler to ES5 ([babel](https://babeljs.io/) in this case)
- Building npm libraries.

Internally is using a nested list representation of the dependencies so I can detach the program output and use different "translators" if needed,
right now the only one outputs the diagram in dot format.

#Usage

Probably the ~~most~~ only interesting one is outputting the dependency tree of an ES6 app that can be directly piped to
dot to produce the printable version:

```bash
$ /usr/local/bin/dTrack lib/dTrack.js -f dot | dot -Tjpeg -odTrack.jpg
```

![pdf output](https://raw.githubusercontent.com/jltalens/dTrack/master/samples/dTrack.jpg)

## Options
- `-f dot`: output format, for now only `dot` is accepted.
- `-t [es6|commonJS]`: import format used in the project. ES6 import or CommonJS requires currently supported.  

##Dependencies
You'll need [graphviz](http://graphviz.org/download..php) installed.

#Install
Still in early stage. I'll have a npm module soon. For now cloning this bad boy and doing:

```bash
npm link
```

should do the trick, leaving the node executable in `/usr/local/bin/dTrack`

