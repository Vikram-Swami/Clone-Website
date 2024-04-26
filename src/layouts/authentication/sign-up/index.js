import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { Box, Button, FormControl, FormLabel, Icon, MenuItem, Select } from "@mui/material";
import ApiClient from "Services/ApiClient";
import { registerUser, createKyc } from "Services/endpointes";
import { ifscValidate } from "Services/endpointes";
import { setDialog } from "context";
import { toast } from "react-toastify";
import { useSoftUIController } from "context";
import { createAddress } from "Services/endpointes";
import CoverLayout from "../components/CoverLayout";
import { setAccept } from "context";
import { startLoading } from "context";

import SignatureCanvas from "react-signature-canvas";
import { Typography } from "antd";
import { setLoading } from "context";
import { Label } from "@mui/icons-material";
import LivePictureCapture from "components/LiveImage";
import Webcam from "react-webcam";
import useImageCapture from "Hooks/useImageCapture/useImageCapture";

function SignUp() {
  const form = useRef(null);
  const [controller, dispatch] = useSoftUIController();
  const { accept } = controller;
  const fileInputRef = useRef(null);
  const aadharBackInputRef = useRef(null);
  const panCardInputRef = useRef(null);
  const { step } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImages([...images, imageSrc]);
  };

  const switchCamera = () => {
    const newFacingMode = facingMode === "user" ? "environment" : "user";
    setFacingMode(newFacingMode);
  };
  // const switchCamera = () => {
  //   const newFacingMode = facingMode === "user" ? "environment" : "user";
  //   setFacingMode(newFacingMode);
  // };
  const webcamRef = useRef(null);
  const [images, setImages] = useState([]);
  const [facingMode, setFacingMode] = useState("user");
  const signatureRef = useRef(null);

  const titles = ["CREATE NEW ACCOUNT", "ADD ADDRESS", "Complete KYC", "Upload Documents"];
  const routes = [registerUser, createAddress, createKyc];

  function dataURLtoFile(dataURL) {
    const [, mimeType, data] = dataURL.match(/^data:(.*?);base64,(.*)$/);

    const binaryData = atob(data);

    const blob = new Blob([binaryData], { type: mimeType });

    const file = new File([blob], "sign.png", { type: mimeType });

    return file;
  }

  const [imagePreviews, setImagePreviews] = useState({
    "Aadhar Front": null,
    "Aadhar Back": null,
    "Pan Card": null,
  });

  // Function to handle image preview
  const handleImagePreview = (event, label) => {
    const selectedImage = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreviews({
        ...imagePreviews,
        [label]: reader.result,
      });
    };

    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    }
  };

  // Validate IFSC Codes
  const handleIFSCCodeChange = async (e) => {
    const ifsc = e.target.value;
    try {
      if (ifsc.length === 11) {
        const response = await ApiClient.getDataByParam(ifscValidate, ifsc);
        if (response.status == 200) {
          const bank = response?.data?.BANK;
          form.current.bankName.value = bank;
          form.current.IFSC.parentNode.style.border = "2px solid #67ca67 ";
        } else {
          form.current.bankName.value = "IFSC required";

          form.current.IFSC.parentNode.style.border = "2px solid red";
        }
      } else {
        form.current.IFSC.parentNode.style.border = "none";
      }
    } catch (error) {
      form.current.IFSC.parentNode.style.border = "2px solid red";
      toast.error(error.toString());
    }
  };

  // Validate postal code
  const handlePostalCodeChange = async (e) => {
    const postalCode = e.target.value;
    try {
      if (postalCode.length == 6) {
        const response = await fetch(`https://api.postalpincode.in/pincode/${postalCode}`);
        const data = await response.json();
        if (data && data[0] && data[0].PostOffice) {
          const postOffice = data[0].PostOffice[0];
          form.current.city.value = postOffice?.District;
          form.current.state.value = postOffice?.State;
          form.current.country.value = postOffice?.Country;
          form.current.postalCode.parentNode.style.border = "2px solid #67ca67 ";
        } else {
          form.current.postalCode.parentNode.style.border = "2px solid red";
        }
      } else {
        form.current.postalCode.parentNode.style.border = "none";
        form.current.city.value = "City";
        form.current.state.value = "State";
        form.current.country.value = "Country";
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };

  //
  const handleSetAgreement = () => setAccept(dispatch, !accept);

  const submitHandler = async (e, route) => {
    e.preventDefault();
    if (!accept) {
      toast.error("Please accept our Terms and Policies.");
      return;
    }
    const formdata = new FormData(e.currentTarget);
    if (step == 3 && !form.sign) {
      toast.error("Signatures are required!");
      return;
    } else if (step == 3 && form.sign) {
      let sign = dataURLtoFile(form.sign);
      formdata.append("sign", sign);
    }
    if (step == 3 && !isValidPAN(formdata.get("panNo"))) {
      toast.error("Invalid PAN Number");
      return;
    }
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.createData(route, formdata);
      if (response.status == 200) {
        form.current.reset();
        let next = parseInt(step) + 1;
        form.userId = response.data?.userId;
        let route = `/sign-up/${next}?userId=${form.userId}`;
        if (step == 3) {
          route = "/sign-in";
        }
        navigate(route);
      }
      setDialog(dispatch, [response]);
    } catch (error) {
      setLoading(dispatch, false);
      toast.error(error.toString());
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value.toUpperCase();
    e.target.value = inputValue;
    return isValidPAN(inputValue);
  };

  const isValidPAN = (pan) => {
    const panRegex = /^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/;
    return panRegex.test(pan);
  };

  const handleCapture = () => {
    // Handle capture functionality
    console.log("Capture button clicked");
  };

  // Function to handle the upload button click
  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      console.log("error");
    }
    if (aadharBackInputRef.current) {
      aadharBackInputRef.current.click();
      console.log("error");
    }
    if (panCardInputRef.current) {
      panCardInputRef.current.click();
      console.log("error");
    }
  };
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (parseInt(step) > 1 && queryParams.get("userId")) {
      form.userId = queryParams.get("userId");
    } else if (queryParams.get("sponsorId")) {
      form.sponsorId = queryParams.get("sponsorId");
      form.placementId = queryParams.get("placementId");
    } else {
      navigate("/");
    }
  }, []);
  return (
    <CoverLayout title={titles[step - 1]}>
      <SoftBox pt={2} pb={3} px={3}>
        <SoftBox
          component="form"
          role="form"
          onSubmit={(e) => submitHandler(e, routes[parseInt(step - 1)])}
          textAlign="center"
          display="flex"
          encType="multipart/form-data"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          ref={form}
          maxWidth="300px"
        >
          {step == 1 ? (
            <>
              <SoftBox mb={2} width="100%">
                <FormControl
                  sx={{
                    display: "flex",
                    gap: 5,
                    justifyContent: "center",
                    flexDirection: "row",
                    alignContent: "center",
                  }}
                >
                  <FormLabel color="primary" sx={{ alignSelf: "center" }}>
                    Initials
                  </FormLabel>
                  <Select
                    labelId="initial"
                    id="demo-simple-select"
                    defaultValue="Mr."
                    label="Initial"
                    name="initial"
                  >
                    <MenuItem fullWidth value="Mr.">
                      Mr.
                    </MenuItem>
                    <MenuItem value="Mrs.">Mrs.</MenuItem>
                    <MenuItem value="Miss">Miss</MenuItem>
                    <MenuItem value="Ms.">Ms.</MenuItem>
                    <MenuItem value="Dr.">Dr.</MenuItem>
                    {/* Add more titles as needed */}
                  </Select>
                </FormControl>
              </SoftBox>
              <SoftBox mb={2} width="100%">
                <SoftInput name="fullName" placeholder="Name" />
              </SoftBox>
              <SoftBox mb={2} width="100%">
                <SoftInput name="email" type="email" placeholder="Email" />
              </SoftBox>
              <SoftBox mb={2} width="100%">
                <SoftInput name="dob" type="date" placeholder="DOB" />
              </SoftBox>
              <SoftBox mb={2} width="100%">
                <SoftInput
                  name="phone"
                  type="text"
                  placeholder="Phone"
                  onChange={(e) => {
                    e.target.value.replace();
                    e.target.value =
                      e.target.value.length > 10
                        ? e.target.value.toString().substr(0, 10)
                        : e.target.value;
                  }}
                  max={10}
                  onKeyPress={(e) => {
                    if (isNaN(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                <SoftTypography color="text" fontWeight="light" fontSize="0.8rem">
                  Please enter the Valid Mobile Number
                </SoftTypography>
              </SoftBox>
              <SoftBox mb={2} width="100%">
                <SoftInput name="password" type="password" placeholder="Password" />
                <SoftTypography color="text" fontWeight="light" fontSize="0.8rem">
                  Password must be Alphanumerical, minimum 8 characters long and must contain
                  atleast one special charactor.
                </SoftTypography>
              </SoftBox>
              <SoftBox mb={2} width="100%">
                <SoftInput
                  name="sponsorId"
                  value={form.sponsorId}
                  disabled={form.sponsorId}
                  type="text"
                  placeholder="sponsor id"
                />
              </SoftBox>
              <SoftBox mb={2} width="100%">
                <SoftInput
                  name="placementId"
                  value={form.placementId ?? form.sponsorId}
                  disabled={form.placementId ?? form.sponsorId}
                  type="text"
                  placeholder="placement id"
                />
              </SoftBox>
            </>
          ) : step == 2 ? (
            <>
              <SoftBox mb={2} width="100%">
                <SoftInput
                  placeholder="User Id"
                  name="userId"
                  value={form?.userId}
                  disabled={form?.userId ?? false}
                  onInput={(e) => {
                    form.userId = e.target.value;
                  }}
                />
              </SoftBox>
              <SoftBox mb={2} width="100%">
                <SoftInput placeholder="Street-1" name="street1" />
              </SoftBox>
              <SoftBox mb={2} width="100%">
                <SoftInput placeholder="Street 2" name="street2" />
              </SoftBox>
              <SoftBox mb={2} width="100%">
                <SoftInput
                  name="postalCode"
                  type="text"
                  placeholder="Postal Code"
                  onChange={(e) => {
                    e.target.value =
                      e.target.value.length > 6
                        ? e.target.value.toString().substr(0, 6)
                        : e.target.value;
                    handlePostalCodeChange(e);
                  }}
                  max={10}
                />
              </SoftBox>
              <SoftBox mb={2} width="100%">
                <SoftInput type="text" name="city" placeholder="City" disabled />
              </SoftBox>
              <SoftBox mb={2} width="100%">
                <SoftInput type="text" name="state" disabled placeholder="State" />
              </SoftBox>
              <SoftBox mb={2} width="100%">
                <SoftInput type="text" name="country" disabled placeholder="Country" />
              </SoftBox>
            </>
          ) : step == 3 ? (
            <>
              <SoftBox mb={2} width="100%">
                <SoftInput
                  placeholder="User ID"
                  name="userId"
                  value={form?.userId ?? ""}
                  disabled={form.userId ? true : false}
                />
              </SoftBox>
              <SoftBox mb={2} width="100%">
                <SoftInput placeholder="Account Number" name="accountNo" />
              </SoftBox>

              <SoftBox mb={2} width="100%">
                <SoftInput
                  type="text"
                  placeholder="IFSC"
                  name="IFSC"
                  onChange={handleIFSCCodeChange}
                />
              </SoftBox>
              <SoftBox mb={2} width="100%">
                <SoftInput placeholder="Bank Name" name="bankName" disabled />
              </SoftBox>
              <SoftBox mb={2} width="100%">
                <SoftInput type="text" placeholder="Holder's Name" name="holder" />
              </SoftBox>
              <SoftBox mb={2} width="100%">
                <SoftInput
                  type="tel"
                  placeholder="Aadhar Number"
                  name="aadharNo"
                  onKeyPress={(e) => {
                    if (isNaN(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </SoftBox>

              <SoftBox mb={2} width="100%">
                <SoftInput
                  type="text"
                  placeholder="PAN Number"
                  name="panNo"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
              </SoftBox>
              <SoftBox mb={2} width="100%">
                <SoftInput type="text" placeholder="Nominie Name" name="nomineeName" />
              </SoftBox>
              <SoftBox mb={2} width="100%">
                <SoftInput type="text" placeholder="Nominie Relation" name="nomineeRel" />
              </SoftBox>
              <SoftBox mb={2} width="100%">
                <SoftInput type="text" placeholder="Nominie age" name="nomineeAge" />
              </SoftBox>
              <SoftBox mb={2} width="100%">
                {/* Input for capturing Aadhar Front photo */}
                <SoftBox display="flex" alignItems="center" justifyContent="space-between">
                  <SoftTypography
                    color="text"
                    fontWeight="medium"
                    whiteSpace="nowrap"
                    pr={1}
                    fontSize="0.9rem"
                  >
                    Aadhar Front
                  </SoftTypography>
                  <input type="file" accept="image/*" name="aadharFront" />
                </SoftBox>
              </SoftBox>
              <SoftBox mb={2} width="100%">
                {/* Input for capturing Aadhar Back photo */}
                <SoftBox display="flex" alignItems="center" justifyContent="space-between">
                  <SoftTypography
                    color="text"
                    fontWeight="medium"
                    whiteSpace="nowrap"
                    pr={1}
                    fontSize="0.9rem"
                  >
                    Aadhar Back
                  </SoftTypography>
                  <input type="file" accept="image/*" name="aadharBack" />
                </SoftBox>
              </SoftBox>
              <SoftBox mb={2} width="100%">
                {/* Input for capturing PAN file */}
                <SoftBox display="flex" alignItems="center" justifyContent="space-between">
                  <SoftTypography
                    color="text"
                    fontWeight="medium"
                    whiteSpace="nowrap"
                    pr={1}
                    fontSize="0.9rem"
                  >
                    Upload PAN
                  </SoftTypography>
                  <input type="file" accept="image/*" name="panFile" />
                </SoftBox>
              </SoftBox>
            </>
          ) : step == 4 ? (
            <>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="webcam"
                videoConstraints={{ facingMode }}
              />
              <button onClick={capture}>Capture Image</button>
              {images.length > 0 && <img src={images[images.length - 1]} alt="Captured" />}
              {webcamRef.current && <button onClick={switchCamera}>Switch Camera</button>}
              <SoftTypography variant="h6">Upload Live Image</SoftTypography>{" "}
              {/* <SoftBox>
                <SoftBox>
                  {!imageSrc && (
                    <img src={"/user.png"} onClick={openCamera} style={{ width: "50%" }} />
                  )}

                  {cameraOpen && (
                    <>
                      <SoftBox
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
                          videoConstraints={facingMode} 
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

                      </SoftBox>
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
                </SoftBox>
              </SoftBox> */}
              <SoftTypography variant="h6" mt={3}>
                Upload Aadhar Card
              </SoftTypography>{" "}
              <SoftBox>
                <SoftBox mb={2} width="100%">
                  <SoftBox
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="column"
                    css={`
                      &:hover {
                        opacity: 0.8;
                      }
                    `}
                  >
                    <SoftBox
                      className="profile-pic"
                      onClick={() => {
                        setDialog(dispatch, [
                          {
                            status: "form",
                            title: "Aadhar ",
                            message: "Upload Front side of Aadhar",
                            children: (
                              <Box
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
                                  videoConstraints={facingMode}
                                  screenshotQuality={1}
                                  disablePictureInPicture={true}
                                  mirrored={facingMode === "user"}
                                />
                                <Box style={{ display: "flex", justifyContent: "space-evenly" }}>
                                  <Typography
                                    onClick={switchCamera}
                                    variant="contained"
                                    color="info"
                                    cursor="pointer"
                                    mt={1}
                                  >
                                    <Icon>cameraswitch</Icon>
                                  </Typography>
                                  <Button onClick={capturePhoto} variant="outlined" color="info">
                                    Capture Photo
                                  </Button>
                                </Box>

                                {/* Button to switch the camera */}
                              </Box>
                            ),
                          },
                        ]);
                      }}
                    >
                      <img
                        src={imagePreviews["Aadhar Front"] || "/aadhar.png"}
                        width={"100%"}
                        height={"100%"}
                      />
                      <Box className="edit">
                        <Icon fontSize="medium" color="inherit">
                          edit
                        </Icon>
                      </Box>
                    </SoftBox>
                  </SoftBox>
                </SoftBox>
                <SoftBox mb={2} width="100%">
                  <SoftBox
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="column"
                  >
                    <SoftBox
                      className="profile-pic"
                      onClick={() => {
                        setDialog(dispatch, [
                          {
                            status: "form",
                            title: "Aadhar ",
                            message: "Upload Back side of Aadhar",
                            children: (
                              <Box style={{ padding: 20 }}>
                                <Button
                                  variant="outlined"
                                  color="info"
                                  onClick={() => {
                                    setDialog(dispatch, [
                                      {
                                        status: "form",
                                        title: "Aadhar ",
                                        message: "Upload Front side of Aadhar",
                                        children: (
                                          <Box
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
                                            <Box
                                              style={{
                                                display: "flex",
                                                justifyContent: "space-evenly",
                                              }}
                                            >
                                              <Typography
                                                onClick={switchCamera}
                                                variant="contained"
                                                color="info"
                                                cursor="pointer"
                                                mt={1}
                                              >
                                                <Icon>cameraswitch</Icon>
                                              </Typography>
                                              <Button
                                                onClick={capturePhoto}
                                                variant="outlined"
                                                color="info"
                                              >
                                                Capture Photo
                                              </Button>
                                            </Box>

                                            {/* Button to switch the camera */}
                                          </Box>
                                        ),
                                      },
                                    ]);
                                  }}
                                  fullWidth
                                >
                                  Capture
                                </Button>
                                <Box className="profile-pic">
                                  <input
                                    ref={aadharBackInputRef}
                                    type="file"
                                    accept="image/*"
                                    name="aadharBack"
                                    onChange={(e) => handleImagePreview(e, "Aadhar Back")}
                                    style={{ display: "none" }}
                                    id="aadhar-back-input"
                                  />

                                  <Button
                                    variant="outlined"
                                    color="info"
                                    onClick={handleUploadButtonClick}
                                    fullWidth
                                  >
                                    Upload
                                  </Button>
                                </Box>
                              </Box>
                            ),
                          },
                        ]);
                      }}
                    >
                      <img
                        src={imagePreviews["Aadhar Back"] || "/aadharback.png"}
                        width={"100%"}
                        height={"100%"}
                      />
                      <SoftBox className="edit">
                        <Icon fontSize="medium" color="inherit">
                          edit
                        </Icon>
                      </SoftBox>
                    </SoftBox>
                  </SoftBox>
                </SoftBox>
              </SoftBox>
              <SoftTypography variant="h6" mt={3}>
                Upload Pan Card
              </SoftTypography>{" "}
              <SoftBox>
                <SoftBox width="100%">
                  <SoftBox
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="column"
                    css={`
                      &:hover {
                        opacity: 0.8;
                      }
                    `}
                  >
                    <SoftBox
                      className="profile-pic"
                      onClick={() => {
                        setDialog(dispatch, [
                          {
                            status: "form",
                            title: "PAN ",
                            message: "Upload Front side of PAN",
                            children: (
                              <Box style={{ padding: 20 }}>
                                <Button
                                  variant="outlined"
                                  color="info"
                                  onClick={handleCapture}
                                  fullWidth
                                >
                                  Capture
                                </Button>
                                <Box className="profile-pic">
                                  <input
                                    ref={panCardInputRef}
                                    type="file"
                                    accept="image/*"
                                    name="aadharBack"
                                    onChange={(e) => handleImagePreview(e, "Pan Card")}
                                    style={{ display: "none" }}
                                    id="aadhar-back-input"
                                  />

                                  <Button
                                    variant="outlined"
                                    color="info"
                                    onClick={handleUploadButtonClick}
                                    fullWidth
                                  >
                                    Upload
                                  </Button>
                                </Box>
                              </Box>
                            ),
                          },
                        ]);
                      }}
                    >
                      <img
                        src={imagePreviews["Pan Card"] || "/pan.png"}
                        width={"100%"}
                        height={"100%"}
                      />
                      <SoftBox className="edit">
                        <Icon fontSize="medium" color="inherit">
                          edit
                        </Icon>
                      </SoftBox>
                    </SoftBox>
                  </SoftBox>
                </SoftBox>
              </SoftBox>
            </>
          ) : (
            ""
          )}
          <SoftBox display="flex" alignItems="center">
            <Checkbox checked={accept} onChange={handleSetAgreement} />
            <SoftTypography
              variant="button"
              fontWeight="regular"
              onClick={handleSetAgreement}
              sx={{ cursor: "poiner", userSelect: "none", whiteSpace: "nowrap" }}
            >
              &nbsp;&nbsp;I agree with Nextwork&apos;s &nbsp;
            </SoftTypography>
            <SoftTypography
              component={Link}
              cursor="pointer"
              fontWeight="regular"
              textGradient
              fontSize="0.8rem"
              sx={{ whiteSpace: "nowrap" }}
            >
              Terms and Policy
            </SoftTypography>
          </SoftBox>
          <SoftBox mt={1} mb={1}>
            {step == 4 && (
              <SoftBox mb={2} width="100%">
                <SoftButton
                  variant="gradient"
                  color="info"
                  onClick={() => {
                    setDialog(dispatch, [
                      {
                        status: "form",
                        title: "E-SIGN",
                        message: "Add new signatures",
                        children: (
                          <Box display="flex" flexDirection="column" alignItems="center">
                            <Box
                              border="1px solid black"
                              sx={{
                                width: "100%",
                                maxWidth: "400px",
                                height: "30vh",
                                maxHeight: "400px",
                              }}
                            >
                              <SignatureCanvas
                                ref={signatureRef}
                                penColor="blue"
                                canvasProps={{ style: { width: "100%", height: "100%" } }}
                              />
                            </Box>

                            <Typography
                              fontSize="0.9rem"
                              fontWeight="medium"
                              style={{ color: "red", marginTop: "5px" }}
                              color="#00ff00"
                              textAlign="center"
                            >
                              Please make sure the information you provide is correct and best of
                              your knowledge. Wrong information leads to rejection or suspension of
                              your account.
                            </Typography>
                          </Box>
                        ),
                        action: "submit",
                        call: () => {
                          if (signatureRef.current.isEmpty()) {
                            toast.warn("Signatures are required!");
                          } else {
                            setDialog(dispatch, []);
                            form.sign = signatureRef.current.toDataURL();
                            toast.success("Signatures Captured Successfully!");
                          }
                        },
                      },
                    ]);
                  }}
                >
                  E-sign
                </SoftButton>
              </SoftBox>
            )}
            <SoftButton variant="gradient" type="submit" color="info">
              Submit
            </SoftButton>
          </SoftBox>
          <SoftBox mt={1} fontSize="0.9rem">
            <SoftTypography variant="p" fontWeight="bold" color="text">
              Already a User?
            </SoftTypography>
            <br />
            <SoftTypography
              component={Link}
              to="/"
              variant="a"
              color="info"
              textGradient
              cursor="pointer"
            >
              Sign In
            </SoftTypography>
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}
export default SignUp;
