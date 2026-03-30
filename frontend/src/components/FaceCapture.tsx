import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

interface FaceCaptureProps {
  onCapture: (descriptor: number[]) => void;
  buttonText: string;
}

const FaceCapture: React.FC<FaceCaptureProps> = ({ onCapture, buttonText }) => {
  const webcamRef = useRef<Webcam>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        // Using a public CDN for models to avoid local file issues
        const MODEL_URL = 'https://justadudewhohacks.github.io/face-api.js/models';
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
      } catch (err) {
        console.error('Error loading models:', err);
        setError('Failed to load face recognition models.');
      }
    };
    loadModels();
  }, []);

  const capture = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const img = await faceapi.fetchImage(imageSrc);
        const detection = await faceapi.detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (detection) {
          onCapture(Array.from(detection.descriptor));
        } else {
          alert('No face detected. Please try again.');
        }
      }
    }
  };

  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!modelsLoaded) return <div className="p-4">Loading models...</div>;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative rounded-lg overflow-hidden border-4 border-blue-500 shadow-xl">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={480}
          height={360}
          videoConstraints={{ width: 480, height: 360, facingMode: 'user' }}
          mirrored={false}
          imageSmoothing={true}
          forceScreenshotSourceSize={false}
          disablePictureInPicture={true}
          onUserMedia={() => {}}
          onUserMediaError={() => {}}
          screenshotQuality={0.92}
        />
      </div>
      <button
        onClick={capture}
        className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default FaceCapture;
