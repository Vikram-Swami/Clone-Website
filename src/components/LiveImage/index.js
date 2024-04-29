import React, { useState } from "react";
import Webcam from "react-webcam";
import { Button, Icon } from "@mui/material";
import useImageCapture from "Hooks/useImageCapture/useImageCapture";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

const LivePictureCapture = () => {
  const [facingMode, setFacingMode] = useState("user");
  const { webcamRef, imageSrc, cameraOpen, openCamera, capturePhoto, reset } = useImageCapture();

  const switchCamera = () => {
    const newFacingMode = facingMode === "user" ? "environment" : "user";
    setFacingMode(newFacingMode);
  };

  return (
    <div>
      {!imageSrc && <img src={"/user.png"} onClick={openCamera} style={{ width: "50%" }} />}

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
              videoConstraints={{ facingMode }} // Set the facing mode based on state
              screenshotQuality={1}
              disablePictureInPicture={true}
              mirrored={facingMode === "user"}
            />
            <SoftBox style={{ display: "flex", justifyContent: "space-evenly" }}>
              <SoftTypography
                onClick={switchCamera}
                variant="contained"
                color="info"
                cursor="pointer"
                mt={1}
              >
                <Icon>cameraswitch</Icon>
              </SoftTypography>
              <SoftButton onClick={capturePhoto} variant="outlined" color="info">
                Capture Photo
              </SoftButton>
            </SoftBox>

            {/* Button to switch the camera */}
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
