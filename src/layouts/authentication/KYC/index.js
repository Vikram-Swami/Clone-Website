import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@mui/material";
import ApiClient from "Services/ApiClient";
import { createKyc } from "Services/endpointes";
import { ifscValidate } from "Services/endpointes";
import { setDialog } from "context";
import { toast } from "react-toastify";
import { useSoftUIController } from "context";
import { createAddress } from "Services/endpointes";
import { setAccept } from "context";
import { startLoading } from "context";

import SignatureCanvas from "react-signature-canvas";
import { setLoading } from "context";
import { uploadDocuments } from "Services/endpointes";
import { completeProfile } from "api/users";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Webcam from "react-webcam";

function CompleteKYC() {

  const form = useRef(null);
  const [controller, dispatch] = useSoftUIController();
  const { accept, user, step } = controller;

  const [capturedImage, setCapturedImage] = React.useState(null); // Store the captured image
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const signatureRef = useRef(null);

  const titles = ["ADD ADDRESS", "COMPLETE KYC", "UPLOAD REQUIRED DOCUMENTS"]
  const routes = [createAddress, createKyc, uploadDocuments];

  function dataURLtoFile(dataURL, fileName) {
    // Split the data URL into components
    const [header, base64Data] = dataURL.split(',');
    const mimeType = header.match(/:(.*?);/)[1]; // Extract MIME type
    const binaryData = atob(base64Data); // Decode base64 to binary
    const arrayBuffer = new Uint8Array(binaryData.length);

    for (let i = 0; i < binaryData.length; i++) {
      arrayBuffer[i] = binaryData.charCodeAt(i); // Convert to binary
    }

    return new File([arrayBuffer], fileName, { type: mimeType }); // Create a File object
  }

  // Validate IFSC Codes
  const handleIFSCCodeChange = async (e) => {
    const ifsc = e.target.value;
    startLoading(dispatch, true);
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
      toast.error(error.message ?? "Network Error1");
    } finally {
      setLoading(dispatch, false);
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
      toast.error(error?.message ?? "Network Error!");
    } finally {
      setLoading(dispatch, false);
    }
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot(); // Capture image from webcam
    setCapturedImage(imageSrc); // Store the captured image
    form.image = imageSrc; // Append the captured image
  };

  const submitHandler = async (e, route) => {
    e.preventDefault();
    if (!accept) {
      toast.error("Please accept our Terms and Policies.");
      return;
    }

    const formdata = new FormData(e.currentTarget);

    if (step === 3) {
      if (!capturedImage) {
        toast.error("Live photo is required!");
        return;
      }
      if (!form.sign) {
        toast.error("Signatures are required!");
        return;
      }
      const signDataURL = form.sign;
      const signFile = dataURLtoFile(signDataURL, "sign.png");
      formdata.append("sign", signFile);
      let imageURL = form.image;
      const photoFile = dataURLtoFile(imageURL, "profile.png");
      formdata.append("image", photoFile);
    }

    // Continue with other formdata appending...
    formdata.append("userId", user?.id?.toLowerCase() ?? "");
    startLoading(dispatch, true);

    try {
      const response = await ApiClient.createData(route, formdata);
      if (response.status == 200) {
        form.current.reset();
        completeProfile(dispatch, navigate);
      }
      setDialog(dispatch, [response]);
    } catch (error) {
      toast.error(error?.message ?? "Network Error!");
      setLoading(dispatch, false);
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


  return (
    <DashboardLayout>
      <DashboardNavbar />

      <h3>{titles[step - 1]}</h3>
      <form role="form"
        onSubmit={(e) => submitHandler(e, routes[parseInt(step - 1)])}
        ref={form} className="mt5 form" >

        {step == 0
          ?
          "Checking KYC Status"
          :
          step == 1 ? (
            <>
              <div className="mb10">
                <input placeholder="Street" name="street" />
              </div>

              <div className="mb10">
                <input
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
              </div>
              <div className="mb10">
                <input type="text" name="city" placeholder="City" readOnly />
              </div>
              <div className="mb10">
                <input type="text" name="state" readOnly placeholder="State" />
              </div>
              <div className="mb10">
                <input type="text" name="country" readOnly placeholder="Country" />
              </div>
            </>
          ) : step == 2 ? (
            <>
              <div className="mb10" width="100%">
                <input type="text" name="accountNo" placeholder="Enter Your Bank Account Nunmber..." onKeyDown={(e) => {
                  if (isNaN(e.key) && !['Delete', 'Backspace', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                    e.preventDefault();
                  }
                }} />
              </div>
              <div className="mb10" width="100%">
                <input type="text" name="IFSC" placeholder="ENTER IFSC Code" onChange={handleIFSCCodeChange} />
              </div>
              <div className="mb10" width="100%">
                <input className="disabled" type="text" name="bankName" readOnly placeholder="Bank Name" />
              </div>
              <div className="mb10" width="100%">
                <input type="text" name="holder" placeholder="Enter Bank Account Holder's Name..." onChange={(e) => { handleInputChange(e); }} />
              </div>
              <div className="mb10" width="100%">
                <input type="text" name="aadharNo" placeholder="Enter Aadhar Number" onKeyDown={(e) => {
                  if (isNaN(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                    e.preventDefault();
                  }
                }} />
              </div>

              <div className="mb10" width="100%">
                <input type="text" name="panNo" placeholder="Enter PAN Number" onChange={(e) => { handleInputChange(e); }} />
              </div>
              <div className="mb10" width="100%">
                <input type="text" name="gstIn" placeholder="GST Number ( optional )" />
              </div>
              <div className="mb10" width="100%">
                <input type="text" name="nomineeName" placeholder="Nominee Name" />
              </div>
              <div className="mb10" width="100%">
                <div className="custom-form-control">
                  <div className="custom-select-wrapper">
                    <select id="initial" name="nomineeRel" className="custom-select" defaultValue="select">
                      <option value="select">Kindly Select Your Relation with Nominee</option>
                      <option value="Mother">Mother</option>
                      <option value="Father">Father</option>
                      <option value="Siblling">Siblling</option>
                      <option value="Son/Daughter">Son/Daughter</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Friend">Friend</option>
                    </select>
                  </div>
                </div>
              </div>
              <div width="100%" className="mb10 custom-form-control">
                <label style={{ width: "30%" }} htmlFor="nomineeAge" className="custom-label">NOMINEE DOB</label>
                <input name="nomineeAge" type="date" />
              </div>


            </>
          ) : step == 3 ? (
            <>
              <div className="mb10" style={{ overflow: "hidden" }}>
                {/* Input for capturing Aadhar Front photo */}
                <div className="custom-form-control">
                  <label style={{ width: "40%" }} htmlFor="aadharFront" className="custom-label">AADHAR FRONT IMAGE</label>
                  <input
                    type="file"
                    accept="image/*"
                    name="aadharFront"
                    id="aadharFront"
                    style={{ display: 'none' }} // Hide the default input
                    onChange={(e) => {
                      const fileName = e.target.files[0] ? e.target.files[0].name : 'No file chosen';
                      document.querySelector(`#aadharFrontLabel .file-name`).textContent = fileName;
                    }}
                  />
                  <label htmlFor="aadharFront" style={{ width: "40%" }} className="file-label" id="aadharFrontLabel">
                    <Icon style={{ verticalAlign: "middle" }}>upload</Icon>
                    <span className="file-name">No file chosen</span>
                  </label>
                </div>

                {/* Input for capturing Aadhar Back photo */}
                <div className="custom-form-control mb10">
                  <label style={{ width: "40%" }} htmlFor="aadharBack" className="custom-label">AADHAR BACK IMAGE</label>
                  <input

                    type="file"
                    accept="image/*"
                    name="aadharBack"
                    id="aadharBack"
                    style={{ display: 'none' }} // Hide the default input
                    onChange={(e) => {
                      const fileName = e.target.files[0] ? e.target.files[0].name : 'No file chosen';
                      document.querySelector(`#aadharBackLabel .file-name`).textContent = fileName;
                    }}
                  />
                  <label htmlFor="aadharBack" style={{ width: "40%" }} className="file-label" id="aadharBackLabel">
                    <Icon style={{ verticalAlign: "middle" }}>upload</Icon>
                    <span className="file-name">No file chosen</span>
                  </label>
                </div>

                {/* Input for capturing PAN file */}
                <div className="custom-form-control">
                  <label style={{ width: "40%" }} htmlFor="panFile" className="custom-label">PAN CARD</label>
                  <input
                    type="file"
                    accept="image/*"
                    name="panFile"
                    id="panFile"
                    style={{ display: 'none' }} // Hide the default input
                    onChange={(e) => {
                      const fileName = e.target.files[0] ? e.target.files[0].name : 'No file chosen';
                      document.querySelector(`#panFileLabel .file-name`).textContent = fileName;
                    }}
                  />
                  <label htmlFor="panFile" style={{ width: "40%" }} className="file-label" id="panFileLabel">
                    <Icon style={{ verticalAlign: "middle" }}>upload</Icon>
                    <span className="file-name">No file chosen</span>
                  </label>
                </div>
                <div className="custom-form-control" style={{ maxHeight: "100%" }}>
                  <label style={{ width: "40%" }} className="custom-label">LIVE PHOTO</label>
                  {capturedImage === true ? (
                    <div className="d-flex j-center" style={{ borderRadius: "50%" }}>
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/png"
                        width="200px"
                        height="auto"
                        borderRadius="50%"
                      />
                    </div>
                  ) : capturedImage && <img src={capturedImage} alt="Captured" style={{ borderRadius: "50%", maxWidth: "200px" }} />
                  }
                </div>
                <div className="d-flex column mb20 g8" >

                  <button type="button" className="btn btn-prime" onClick={() => setCapturedImage(!Boolean(capturedImage))}>{capturedImage ? "cancel" : "capture photo"}</button>
                  {capturedImage === true && <button type="button" className="btn" onClick={capturePhoto}>Capture</button>}
                </div>
              </div>

            </>
          ) : (
            ""
          )}
        <div className="mb10">
          <input type="checkbox" onChange={(e) => { setAccept(dispatch, e.target.checked) }} checked={accept} />
          <span onClick={() => setAccept(dispatch, !accept)} style={{ cursor: "poiner", userSelect: "none", fontSize: "1rem", }}>
            &nbsp;&nbsp;I agree with KNO-ONE&apos;s&nbsp;
            <span className="help-text"> Terms and Policy</span>
          </span>
        </div>
        <div className=" mb10" style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          {
            step == 3 &&

            <button type="button" className="btn btn-prime" onClick={() => {
              setDialog(dispatch, [{
                status: "form",
                title: "E-SIGN",
                message: "Add new signatures",
                children: <div className="form">
                  <div style={{ width: "100%", maxWidth: "400px", height: "30vh", maxHeight: "400px", border: "1px solid black" }}>
                    <SignatureCanvas
                      ref={signatureRef}
                      penColor="blue"
                      canvasProps={{ style: { width: "100%", height: "100%" } }}
                    />
                  </div>

                  <h6 className="help-text textCenter">Please make sure the information you provide is correct and best of your knowledge. Wrong information leads to rejection or suspension of your account.</h6>
                </div>
                , action: "submit", call: () => {
                  if (signatureRef.current.isEmpty()) {
                    toast.warn("Signatures are required!")
                  } else {
                    setDialog(dispatch, []);
                    form.sign = signatureRef.current.toDataURL();
                    toast.success("Signatures Captured Successfully!");
                  }
                }
              }])
            }}>E-sign
            </button>
          }
          <button
            className="btn"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}

export default CompleteKYC;
