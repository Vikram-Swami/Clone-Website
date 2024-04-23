import { useRef, useState } from "react";
import Webcam from "react-webcam";

const useImageCapture = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  const openCamera = () => {
    setCameraOpen(true);
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    setCameraOpen(false);
  };

  const reset = () => {
    setImageSrc(null);
  };

  return { webcamRef, imageSrc, cameraOpen, openCamera, capturePhoto, reset };
};

export default useImageCapture;
