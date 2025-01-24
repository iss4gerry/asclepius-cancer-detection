import * as tf from '@tensorflow/tfjs-node';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import model from '../models/tensorflowModel';
import db from '../services/firebaseService';

interface PredictionResult {
  id: string;
  result: string;
  suggestion: string;
  createdAt: string;
}

export const makePrediction = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({
      status: 'fail',
      message: 'Harap unggah file gambar untuk prediksi',
    });
    return;
  }

  try {
    const buffer: Buffer = req.file.buffer;
    const tensor = tf.node
      .decodeImage(buffer)
      .resizeBilinear([224, 224])
      .expandDims();

    const prediction = model.predict(tensor) as tf.Tensor;
    const label = prediction.dataSync()[0] > 0.5 ? 'Cancer' : 'Non-cancer';
    const suggestion =
      label === 'Cancer'
        ? 'Segera periksa ke dokter!'
        : 'Penyakit kanker tidak terdeteksi.';

    const docId = uuidv4();
    const timestamp = new Date().toISOString();
    const result: PredictionResult = {
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

export const getPredictionHistories = async (req: Request, res: Response): Promise<void> => {
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
