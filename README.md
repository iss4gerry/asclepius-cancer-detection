# TensorFlow Prediction API 🚀

## 📋 Description

This project is a simple backend API that utilizes **TensorFlow.js** to perform predictions based on uploaded images. The prediction detects the likelihood of cancer based on the input image using a pre-trained machine learning model. The API is built with **Node.js**, **TypeScript**, **Express**, **Multer**, and **Firebase Firestore** to store prediction histories.

## ✨ Features

- **Image Prediction**: Upload an image to get a prediction result.
- **Prediction History**: Retrieve past predictions stored in Firestore.
- **Error Handling**: User-friendly error messages for invalid uploads or other issues.

## 🛠️ Technologies Used

- **Node.js**: Backend runtime.
- **TypeScript**: Type-safe code development.
- **TensorFlow.js**: Machine learning framework.
- **Express**: Web framework for building REST APIs.
- **Multer**: Middleware for handling file uploads.
- **Firebase Firestore**: Cloud database to store prediction history.
- **Docker** (optional): For containerized deployment.

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **Firebase Admin SDK** credentials (JSON file)
- TensorFlow.js-compatible **model URL**

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase Admin SDK:
   - Add your Firebase Admin SDK credentials as `firebase-service-account.json` in the project root.

4. Create a `.env` file in the root directory with the following content:
   ```env
   PORT=8080
   NODE_ENV=development
   ```

5. Start the server:
   ```bash
   npm start
   ```

## 🐳 Docker (Optional)

1. Build the Docker image:
   ```bash
   docker build -t tensorflow-prediction-api .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:8080 tensorflow-prediction-api
   ```

## 🤝 Contributions

Contributions are welcome! Feel free to open an issue or submit a pull request for improvements.
