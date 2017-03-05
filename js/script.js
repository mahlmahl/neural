nn = new NeuralNetwork([3, 4, 5, 2]);
nn.process([Math.random() * 100, Math.random() * 100, Math.random() * 100]);
document.write(nn.show());