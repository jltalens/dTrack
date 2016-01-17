dTrack
=====

dTrack is a Node.js app to output all the dependencies in each one of the ES6 modules of your project.


#Motivation

When I started working in big JS projects I missed having a more clear picture of which modules are related to which ones.
First I couldn't find any tool that could output a dependency graph of my projects in a clear way (okay... I really didn't look 
hard for one as I wanted to build it anyway) so I started to build my own. Also it's a good opportunity to learn some stuff on the way:

- ES6
- Some transpiler to ES5([babel](https://babeljs.io/) in this case)
- Building npm libraries.

For the graph I will just output the dependencies in [dot](http://www.graphviz.org/content/dot-language) format so 
it can be piped to the program itself, I will add an example.

#Example
TBD

#Install
Still in early stage to have an installable but it will be published as an npm module.


