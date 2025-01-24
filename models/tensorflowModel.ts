import * as tf from '@tensorflow/tfjs-node';

let tensorflowModel: tf.GraphModel | null = null;

async function loadModel(): Promise<void> {
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

export const predict = (inputTensor: tf.Tensor): tf.Tensor | undefined => {
  if (!tensorflowModel) {
    throw new Error('Model is not loaded yet');
  }
  return tensorflowModel.predict(inputTensor) as tf.Tensor;
};
