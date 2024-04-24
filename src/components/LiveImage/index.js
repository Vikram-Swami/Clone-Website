import React from "react";
import Webcam from "react-webcam";
import { Button } from "@mui/material";
import useImageCapture from "Hooks/useImageCapture/useImageCapture";
import SoftButton from "components/SoftButton";

const LivePictureCapture = () => {
  const { webcamRef, imageSrc, cameraOpen, openCamera, capturePhoto, reset } = useImageCapture();

  return (
    <div>
      {!cameraOpen && !imageSrc && (
        <img src={"/user.png"} onClick={openCamera} style={{ width: "50%" }} />
      )}

      {cameraOpen && (
        <>
          <div
            style={{
              border: "2px solid green",
              borderRadius: "50px",
              overflow: "hidden",
              width: "300px",
              height: "300px",
            }}
          >
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/png"
              width={300}
              imageSmoothing
              mirrored
              screenshotQuality={1}
              disablePictureInPicture={true}
            />
            <SoftButton onClick={capturePhoto} variant="outlined" color="info">
              Capture Photo
            </SoftButton>
          </div>
        </>
      )}
      {imageSrc && (
        <>
          <div
            style={{
              border: "2px solid green",
              borderRadius: "50%",

              width: "200px",
              height: "200px",
              marginBottom: "20px",
            }}
          >
            <img
              src={imageSrc}
              alt="Captured Photo"
              style={{
                borderRadius: "50%",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <SoftButton onClick={reset} variant="outlined" color="info">
            Retake Photo
          </SoftButton>
        </>
      )}
    </div>
  );
};

export default LivePictureCapture;
