var express = require('express');
var app = express();
var nn = require('./libs/nn_funcs.js');


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/image', function(req, res) {
	console.log(req.body);
	var input = JSON.parse(req.body.matrix);
	nn.getNNOutput(input);
	var outputArray = nn.allNodeOutputs;
	// var outputArray = require('./testOutput.json');
	res.json({"nodeOutputs": outputArray});
});

app.listen(6969, function () {
  console.log('Example app listening on port 3000!');
});