import express from 'express';
import multer from 'multer';
import {
  makePrediction,
  getPredictionHistories,
} from '../controllers/predictionController';

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

export default router;
