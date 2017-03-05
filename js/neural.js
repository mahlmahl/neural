// Neuron class

function Neuron(number_of_inputs){
	
	this.result = null;
	this.output = null;
	this.bias = this.random();
	this.weights = [];
	
	for(var i = 0; i < number_of_inputs; i++){
		this.weights.push(this.random());
	}
	
}

Neuron.prototype.random = function(){
	return Math.random() * 2 - 1;
}

Neuron.prototype.sigmoid = function(x){
	return 1.0 / (1.0 + Math.exp(-x));
}

Neuron.prototype.process = function(array_of_inputs){
	if(array_of_inputs.length != this.weights.length) return false;
	this.result = null;
	for(var i = 0, al = array_of_inputs.length; i < al; i++){
		this.result += array_of_inputs[i] * this.weights[i];
	}
	this.result += this.bias;
	this.output = this.sigmoid(this.result);
}

// Layer class

function Layer(number_of_neurons, inputs_per_neuron){
	
	this.neurons = [];
	this.outputs = [];
	
	for(var n = 0; n < number_of_neurons; n++){
		this.neurons.push(new Neuron(inputs_per_neuron));
	}
	
}

Layer.prototype.process = function(array_of_inputs){
	this.outputs = [];
	for(var n = 0, nl = this.neurons.length; n < nl; n++){
		this.neurons[n].process(array_of_inputs);
		this.outputs.push(this.neurons[n].output);
	}
}

// Neural Network class

function NeuralNetwork(topology){
	
	this.layers = [];
	this.inputs = [];
	this.weights_count = 0;
	
	for(var t = 1, tl= topology.length; t < tl; t++){
		this.layers.push(new Layer(topology[t], topology[t-1]));
		this.weights_count += topology[t] * (topology[t-1] + 1);
	}
	
}

NeuralNetwork.prototype.process = function(array_of_inputs){
	this.inputs = array_of_inputs;
	var inputs = this.inputs;
	for(var l = 0, ll = this.layers.length; l < ll; l++){
		this.layers[l].process(inputs);
		inputs = this.layers[l].outputs;
	}
	return inputs;
}

NeuralNetwork.prototype.getWeights = function(){
	var weights = [];
	for(var l = 0, ll = this.layers.length; l < ll; l++){
		for(var n = 0, nl = this.layers[l].neurons.length; n < nl; n++){
			for(var w = 0, wl = this.layers[l].neurons[n].weights.length; w < wl; w++){
				weights.push(this.layers[l].neurons[n].weights[w]);
			}
			weights.push(this.layers[l].neurons[n].bias);
		}	
	}
	return weights;
}

NeuralNetwork.prototype.setWeights = function(weights){
	if(weights.length != this.weights_count) return false;
	var index = 0;
	for(var l = 0, ll = this.layers.length; l < ll; l++){
		for(var n = 0, nl = this.layers[l].neurons.length; n < nl; n++){
			for(var w = 0, wl = this.layers[l].neurons[n].weights.length; w < wl; w++){
				this.layers[l].neurons[n].weights[w] = weights[index];
				index++;
			}
			this.layers[l].neurons[n].bias = weights[index];
			index++;
		}	
	}
}

// show functions 

Neuron.prototype.show = function(){
	var out = '<table border="1">';
	for(var i = 0, wl = this.weights.length; i < wl; i++){
		out += '<tr><td>w<sub>' + i + '</sub></td><td>' + this.weights[i] + '</td></tr>';
	}
	out += '<tr><td>b</td><td>' + this.bias + '</td></tr>';
	out += '<tr><td>r</td><td>' + this.result + '</td></tr>';
	out += '<tr><td class="out">o</td><td class="out">' + this.output + '</td></tr>';
	out += '</table>';
	return out;
}

Layer.prototype.show = function(){
	var out = '<table border="0"><tr>';
	for(var n = 0, nl = this.neurons.length; n < nl; n++){
		out += '<td>' + this.neurons[n].show() + '</td>';
	}
	out += '</table>';
	return out;
}

NeuralNetwork.prototype.show = function(){
	var out = '<table><tr>';
	for(var i = 0, il = this.inputs.length; i < il; i++){
		out += '<td class="out">' + this.inputs[i] + '</td>';
	}
	out += '</tr></table><hr/>';
	for(var l = 0, ll = this.layers.length; l < ll; l++){
		out += this.layers[l].show() + '<hr/>';
	}
	return out;
}