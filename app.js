const express = require('express');
const multer = require('multer');
const admin = require('firebase-admin');
const tf = require('@tensorflow/tfjs-node');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080;
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

admin.initializeApp();
const firestore = admin.firestore();

let modelInstance;

const initializeModel = async () => {
	try {
		modelInstance = await tf.loadGraphModel(
			'https://storage.googleapis.com/mlgc-gerry-bucket/model.json'
		);
		console.log('Model loaded successfully');
	} catch (error) {
		console.error('Error initializing model:', error);
	}
};

initializeModel();

const storage = multer({
	limits: { fileSize: 1 * 1024 * 1024 },
	fileFilter: (req, file, callback) => {
		file.mimetype.startsWith('image/')
			? callback(null, true)
			: callback(new Error('File harus berupa gambar'));
	},
});

app.post('/predict', storage.single('image'), async (req, res) => {
	if (!req.file) {
		return res
			.status(400)
			.json({ status: 'fail', message: 'Tidak ada file yang diunggah' });
	}

	try {
		const imgBuffer = req.file.buffer;
		const tensor = tf.node
			.decodeImage(imgBuffer)
			.resizeBilinear([224, 224])
			.expandDims();
		const prediction = modelInstance.predict(tensor);
		const label = prediction.dataSync()[0] > 0.5 ? 'Cancer' : 'Non-cancer';
		const advice =
			label === 'Cancer'
				? 'Segera periksa ke dokter!'
				: 'Penyakit kanker tidak terdeteksi.';

		const docId = uuidv4();
		const timestamp = new Date().toISOString();
		const resultData = {
			id: docId,
			result: label,
			suggestion: advice,
			createdAt: timestamp,
		};

		await firestore.collection('predictions').doc(docId).set(resultData);

		res.status(201).json({
			status: 'success',
			message: 'Model is predicted successfully',
			data: resultData,
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: 'Terjadi kesalahan dalam melakukan prediksi',
		});
	}
});

app.get('/predict/histories', async (req, res) => {
	try {
		const snapshot = await firestore.collection('predictions').get();
		const records = snapshot.docs.map((doc) => ({
			id: doc.id,
			history: doc.data(),
		}));

		res.status(200).json({ status: 'success', data: records });
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Gagal mengambil data riwayat prediksi',
		});
	}
});

app.use((error, req, res, next) => {
	if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
		return res.status(413).json({
			status: 'fail',
			message: 'Payload content length greater than maximum allowed: 1000000',
		});
	}
	next(error);
});

app.listen(PORT, HOST, () => {
	console.log(`Server is running on ${HOST}:${PORT}`);
});
