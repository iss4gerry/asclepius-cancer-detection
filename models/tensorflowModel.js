const tf = require('@tensorflow/tfjs-node');

let tensorflowModel;

async function loadModel() {
	try {
		tensorflowModel = await tf.loadGraphModel(
			'https://storage.googleapis.com/mlgc-gerry-bucket/model.json'
		);
		console.log('TensorFlow model loaded successfully');
	} catch (error) {
		console.error('Error loading TensorFlow model:', error);
	}
}

loadModel();

module.exports = {
	predict: (inputTensor) => tensorflowModel.predict(inputTensor),
};
