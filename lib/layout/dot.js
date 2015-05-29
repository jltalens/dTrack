/**
* @module layout/dot
*/
(function(){
	'use strict';

	/**
	* @var {String} dot digraph definition
	*/
	var graphDefinition = 'digraph %name% { %nodes% }';
	var nodeDefinition = '"%key%" -> "%value%" [dir=back];';

	/**
	* translates the dependency object into a dot compatible string format
	* @param {Object} dependency graph
	*/
	var translateMap = function translateMap(dependencyMap, graphDefinition) {
		var nodes = '',
			visitedKeys = [];
		var replaceNodeDefinition = function replaceNodeDefinition(key, value) {
			nodes += nodeDefinition.replace('%key%', key).replace('%value%', value);		
		};
		/**
		* Generates the dot compatible string from the dependency graph
		*/
		var traverseGraph = function traverseGraph(dependencyMap) {
			Object.keys(dependencyMap).forEach(function(key) {
				if (typeof dependencyMap[key] === 'object' && visitedKeys.indexOf(key) === -1) {
					visitedKeys.push(key);
					Object.keys(dependencyMap[key]).forEach(function(subkey) {
						replaceNodeDefinition(key, subkey);
					});
					traverseGraph(dependencyMap[key]);	
				}
			});
		};
		if (!dependencyMap || typeof dependencyMap !== 'object') {
			throw "The dependency map is not valid";
		}
		traverseGraph(dependencyMap);
		return graphDefinition.replace('%nodes%', nodes);
	};

	/**
	* @param {Object} dependency graph
	* @param {String} graphName
	*/
	var dot = function dot(dependencyMap, graphName) {
		var result = translateMap(dependencyMap, graphDefinition.replace('%name%', graphName || ''));
		return result;
	};

	module.exports = {
		dot: dot
	};
})();