const express = require('express');
const multer = require('multer');
const {
	makePrediction,
	getPredictionHistories,
} = require('../controllers/predictionController');

const router = express.Router();

const upload = multer({
	limits: { fileSize: 1 * 1024 * 1024 },
	fileFilter: (req, file, cb) => {
		if (!file.mimetype.startsWith('image/')) {
			cb(new Error('File yang diunggah harus berupa gambar'));
		} else {
			cb(null, true);
		}
	},
});

router.post('/', upload.single('image'), makePrediction);
router.get('/histories', getPredictionHistories);

module.exports = router;
