const tf = require('@tensorflow/tfjs-node');
const { v4: uuidv4 } = require('uuid');
const model = require('../models/tensorflowModel');
const db = require('../services/firebaseService');

exports.makePrediction = async (req, res) => {
	if (!req.file) {
		return res
			.status(400)
			.json({
				status: 'fail',
				message: 'Harap unggah file gambar untuk prediksi',
			});
	}

	try {
		const buffer = req.file.buffer;
		const tensor = tf.node
			.decodeImage(buffer)
			.resizeBilinear([224, 224])
			.expandDims();
		const prediction = model.predict(tensor);
		const label = prediction.dataSync()[0] > 0.5 ? 'Cancer' : 'Non-cancer';
		const suggestion =
			label === 'Cancer'
				? 'Segera periksa ke dokter!'
				: 'Penyakit kanker tidak terdeteksi.';

		const docId = uuidv4();
		const timestamp = new Date().toISOString();
		const result = {
			id: docId,
			result: label,
			suggestion,
			createdAt: timestamp,
		};

		await db.collection('predictions').doc(docId).set(result);

		res.status(201).json({
			status: 'success',
			message: 'Model is predicted successfully',
			data: result,
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: 'Terjadi kesalahan dalam melakukan prediksi',
		});
	}
};

exports.getPredictionHistories = async (req, res) => {
	try {
		const snapshot = await db.collection('predictions').get();
		const histories = snapshot.docs.map((doc) => ({
			id: doc.id,
			history: doc.data(),
		}));

		res.status(200).json({ status: 'success', data: histories });
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Gagal mengambil data riwayat prediksi',
		});
	}
};
