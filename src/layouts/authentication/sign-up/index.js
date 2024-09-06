import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { Box, FormControl, FormLabel, IconButton, InputAdornment, MenuItem, Select } from "@mui/material";
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
import { uploadDocuments } from "Services/endpointes";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function SignUp() {

  const form = useRef(null);
  const [controller, dispatch] = useSoftUIController();
  const { accept } = controller;

  const { step } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const signatureRef = useRef(null);

  const titles = ["CREATE NEW ACCOUNT", "ADD ADDRESS", "COMPLETE KYC", "UPLOAD DOCUMENTS"]
  const routes = [registerUser, createAddress, createKyc, uploadDocuments];

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function dataURLtoFile(dataURL) {
    // Split the data URL into components
    const [, mimeType, data] = dataURL.match(/^data:(.*?);base64,(.*)$/);

    // Convert base64 to binary data
    const binaryData = atob(data);

    // Create a Blob object from the binary data
    const blob = new Blob([binaryData], { type: mimeType });

    // Create a File object from the Blob
    const file = new File([blob], "sign.png", { type: mimeType });

    return file;
  }


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
    if (step == 4 && !form.sign) {
      toast.error("Signatures are required!");
      return;
    }
    else if (step == 4 && form.sign) {
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
        form.userId = response.data?.userId
        let route = `/sign-up/${next}?userId=${form.userId}`;
        if (step == 4 || step == 1) {
          route = '/sign-in';
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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (parseInt(step) > 1 && queryParams.get("userId")) {
      form.userId = queryParams.get("userId");
    } else if (queryParams.get("sponsorId")) {
      form.sponsorId = queryParams.get("sponsorId")
      form.placementId = queryParams.get("placementId");
    }
    else {
      navigate("/")
    }
  }, []);
  return (
    <CoverLayout title={titles[step - 1]} >
      <SoftBox pt={2} pb={3} px={3}>

        <SoftBox component="form" role="form"
          onSubmit={(e) => submitHandler(e, routes[parseInt(step - 1)])}
          textAlign="center"
          display="flex" encType="multipart/form-data" flexDirection="column" justifyContent="center" alignItems="center" ref={form} >
          {step == 1 ? (
            <>
              <SoftBox mb={2} width="100%">
                <FormControl sx={{ display: "flex", gap: 5, justifyContent: "center", flexDirection: "row", alignContent: "center" }} >
                  <FormLabel color="primary" sx={{ alignSelf: "center" }}>Initials</FormLabel>
                  <Select
                    labelId="initial"
                    defaultValue="Mr."
                    label="Initial"
                    name="initial"
                  >
                    <MenuItem fullWidth value="Mr.">Mr.</MenuItem>
                    <MenuItem value="Mrs.">Mrs.</MenuItem>
                    <MenuItem value="Miss">Miss</MenuItem>
                    <MenuItem value="Ms.">Ms.</MenuItem>
                    <MenuItem value="Dr.">Dr.</MenuItem>
                    <MenuItem value="">Organization</MenuItem>
                    {/* Add more titles as needed */}
                  </Select>
                </FormControl>
              </SoftBox>

              <SoftBox mb={2} width="100%">
                <SoftInput name="fullName" placeholder="Name" />
              </SoftBox>

              <SoftBox mb={2} width="100%">
                <FormLabel color="primary" sx={{ alignSelf: "center" }}>Initials</FormLabel>

                <SoftInput name="dob" type="date" placeholder="Date of Birth" />

              </SoftBox>

              <SoftBox mb={2} width="100%">
                <SoftInput name="email" type="email" placeholder="Email" />
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
                  Please enter the Valid 10 digit Mobile Number
                </SoftTypography>
              </SoftBox>

              <SoftBox mb={2} width="100%">
                <SoftInput
                  name="password"
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  placeholder="Password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        sx={{ position: "absolute", right: 10, top: 0 }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <SoftTypography color="text" fontWeight="light" fontSize="0.8rem">
                  Password must be Alphanumerical, minimum 8 characters long and must contain at least one special character.
                </SoftTypography>
              </SoftBox>

              <FormControl mb={2} sx={{ marginBottom: 2, width: '100%', display: "flex", gap: 5, justifyContent: "center", flexDirection: "row", alignContent: "center" }} >
                <Select
                  labelId="accountType"
                  defaultValue="individual"
                  name="type"
                >
                  <MenuItem fullWidth value="individual">Individual</MenuItem>
                  <MenuItem value="organization">Organization</MenuItem>
                  {/* Add more titles as needed */}
                </Select>
              </FormControl>

              <SoftBox mb={2} width="100%">
                <SoftInput name="sponsorId" value={form.sponsorId} disabled={form.sponsorId} type="text" placeholder="sponsor id" />
              </SoftBox>

              <SoftBox mb={2} width="100%">
                <SoftInput name="placementId" value={form.placementId ?? form.sponsorId} disabled={form.placementId ?? form.sponsorId} type="text" placeholder="placement id" />
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
              <SoftBox mb={2} width='100%'>
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
                  onChange={(e) => { handleInputChange(e); }}
                />
              </SoftBox>
              <SoftBox mb={2} width="100%">
                <SoftInput type="text" placeholder="Nominie Name" name="nomineeName" />
              </SoftBox>
              <SoftBox mb={2} width="100%">
                <FormControl sx={{ display: "flex", gap: 5, justifyContent: "center", flexDirection: "row", alignContent: "center" }} >
                  <Select
                    labelId="nominee"
                    defaultValue="Select"
                    label="Nominee Relation"
                    name="nomineeRel"
                  >
                    <MenuItem fullWidth value="Select">Kindly Select Your Relation with Nominee...</MenuItem>
                    <MenuItem value="Mother">Mother</MenuItem>
                    <MenuItem value="Father">Father</MenuItem>
                    <MenuItem value="Siblling">Siblling</MenuItem>
                    <MenuItem value="Son/Daughter">Son/Daughter</MenuItem>
                    <MenuItem value="Spouse">Spouse</MenuItem>
                    <MenuItem value="Friend">Friend</MenuItem>
                  </Select>
                </FormControl>
              </SoftBox>
              <SoftBox mb={2} width="100%">
                <SoftInput type="number" placeholder="Nominie age" name="nomineeAge" />
              </SoftBox>

            </>
          ) : step == 4 ? (
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
                {/* Input for capturing Aadhar Front photo */}
                <SoftBox
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <SoftTypography
                    color="text"
                    fontWeight="medium"
                    whiteSpace="nowrap"
                    pr={1}
                    fontSize="0.9rem"
                  >
                    Aadhar Front
                  </SoftTypography>
                  <input
                    type="file"
                    accept="image/*"
                    name="aadharFront"
                  />
                </SoftBox>
              </SoftBox>
              <SoftBox mb={2} width="100%">
                {/* Input for capturing Aadhar Back photo */}
                <SoftBox
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <SoftTypography
                    color="text"
                    fontWeight="medium"
                    whiteSpace="nowrap"
                    pr={1}
                    fontSize="0.9rem"
                  >
                    Aadhar Back
                  </SoftTypography>
                  <input
                    type="file"
                    accept="image/*"
                    name="aadharBack"
                  />
                </SoftBox>
              </SoftBox>
              <SoftBox mb={2} width="100%">
                {/* Input for capturing PAN file */}
                <SoftBox
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <SoftTypography
                    color="text"
                    fontWeight="medium"
                    whiteSpace="nowrap"
                    pr={1}
                    fontSize="0.9rem"
                  >
                    Upload PAN
                  </SoftTypography>
                  <input
                    type="file"
                    accept="image/*"
                    name="panFile"
                  />
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
              &nbsp;&nbsp;I agree with Kno-one India&apos;s &nbsp;
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
            {
              step == 4 &&
              <SoftBox mb={2} width="100%">
                <SoftButton variant="gradient" color="info" onClick={() => {
                  setDialog(dispatch, [{
                    status: "form",
                    title: "E-SIGN",
                    message: "Add new signatures",
                    children: <Box display="flex" flexDirection="column" alignItems="center">
                      <Box border="1px solid black" sx={{ width: "100%", maxWidth: "400px", height: "30vh", maxHeight: "400px" }}>
                        <SignatureCanvas
                          ref={signatureRef}
                          penColor="blue"
                          canvasProps={{ style: { width: "100%", height: "100%" } }}
                        />
                      </Box>

                      <Typography fontSize="0.9rem" fontWeight="medium" style={{ color: "red", marginTop: "5px" }} color="#00ff00" textAlign="center">Please make sure the information you provide is correct and best of your knowledge. Wrong information leads to rejection or suspension of your account.</Typography>
                    </Box>
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
                </SoftButton>
              </SoftBox>
            }
            <SoftButton
              variant="gradient"
              type="submit"
              color="info"
            >
              Submit
            </SoftButton>
          </SoftBox>
          <SoftBox mt={1} fontSize="0.9rem">

            <SoftTypography variant="p" fontWeight="bold" color="text">
              Already a User?
            </SoftTypography><br />
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
    </CoverLayout >
  );
}

export default SignUp;
