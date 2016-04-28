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
				filterNode.convNode = filter;
				filterNode.inputNode = 0;
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
					filterNode.x = 735 + 10*row - 320*filter;
					filterNode.y = 50;
					filterNode.z = -45 + 10*column;
					filterNode.convNode = filterTwo;
					filterNode.inputNode = filter;
					filterTwoNodes.push(filterNode);
				}
			}
		}
	}
}


fs.writeFile('filter2_positions.json', JSON.stringify(filterTwoNodes), function(err) {});

var hidden1 = nn.hiddenWeights1().toArray();
var rows = nn.hiddenWeights1().dimensions().rows;
var columns = nn.hiddenWeights1().dimensions().cols;

for (var i = 0; i < rows; i++) {
	hidden1[i] = {"column": hidden1[i]};
}
var hidden1Json = {"weights": hidden1};

fs.writeFile('hidden_weights_1.json', JSON.stringify(hidden1Json), function(err) {});


var hidden2 = nn.hiddenWeights2().toArray();
rows = nn.hiddenWeights2().dimensions().rows;
columns = nn.hiddenWeights2().dimensions().cols;

for (var i = 0; i < rows; i++) {
	hidden2[i] = {"column": hidden2[i]};
}
var hidden2Json = {"weights": hidden2};

fs.writeFile('hidden_weights_2.json', JSON.stringify(hidden2Json), function(err) {});



