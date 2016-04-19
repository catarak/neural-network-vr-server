var nn = require('./libs/nn_funcs.js');
var fs = require('fs');

var numFilters = 6;
var filterSide = 5;

var filterNodes = [];

nn.setupWeightArrays();

for (var filter = 0; filter < numFilters; filter++) {
	for (var column = 0; column < filterSide; column++) {
		for (var row = 0; row < filterSide; row++) {
				var filterNode = {};
				filterNode.value = nn.convWeights1a()[filter][column][row];
				filterNode.x = 665 - 320*filter + 10*row;
				filterNode.y = -200;
				filterNode.z = -135 + 10*column;
				filterNodes.push(filterNode);
		}
	}
}

fs.writeFile('filter1_positions.json', JSON.stringify(filterNodes), function(err) {});

var numFiltersTwo = 16;

filterTwoNodes = [];
for (var filterTwo = 0; filterTwo < numFiltersTwo; filterTwo++) {
	for (var filter = 0; filter < numFilters; filter++) {
		if (nn.keepers()[filter][filterTwo]) {
			for (var row = 0; row < filterSide; row++) {
				for (var column = 0; column < filterSide; column++) {
					var filterNode = {};
					filterNode.value = nn.convWeights2a()[filterTwo][filter][row][column];
					filterNode.x = 1005 + 10*row - 140*filter;
					filterNode.y = 50;
					filterNode.z = -45 + 10*column;
					filterNode.convNode = filterTwo;
					filterTwoNodes.push(filterNode);
				}
			}
		}
	}
}


fs.writeFile('filter2_positions.json', JSON.stringify(filterTwoNodes), function(err) {});