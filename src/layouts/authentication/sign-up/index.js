import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { FormControl, FormLabel, MenuItem, Select } from "@mui/material";
import ApiClient from "Services/ApiClient";
import { registerUser, createKyc } from "Services/endpointes";
import { ifscValidate } from "Services/endpointes";
import { setDialog } from "context";
import { toast } from "react-toastify";
import { useSoftUIController } from "context";
import { createAddress } from "Services/endpointes";
import { setLoading } from "context";
import CoverLayout from "../components/CoverLayout";
import { setAccept } from "context";
import { startLoading } from "context";


function SignUp() {
  const [controller, dispatch] = useSoftUIController();

  const form = useRef(null);
  const { accept } = controller;

  const { step } = useParams();
  const location = useLocation();

  const navigate = useNavigate();

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
      toast.error("Error While fetching IFSC");
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
      console.error("Error fetching postal details:", error);
      toast.error("Error while fetching postal code");
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
    startLoading(dispatch, true);
    const formdata = new FormData(form.current);
    try {
      const response = await ApiClient.createData(route, formdata);
      if (response.status == 200) {
        form.current.reset();
        let next = parseInt(step) + 1;
        form.userId = response.data?.userId

        let route = `/sign-up/${next}?userId=${form.userId}`;
        if (step == 3) {
          route = '/sign-in';
        }
        setDialog(dispatch, [response]);
        navigate(route);
      }
      else {
        setDialog(dispatch, [response]);
      }
    } catch (error) {
      setDialog(dispatch, [error.response?.data]);
    }
  };

  const titles = ["Create Id", "Add Your Address", "Complete KYC"]
  const routes = [registerUser, createAddress, createKyc];

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("userId")) {
      form.userId = queryParams.get("userId");
    } else {
      navigate("/sign-up/1");
    }
  }, []);
  return (
    <CoverLayout title={titles[step - 1]} >
      <SoftBox pt={2} pb={3} px={3}>

        <SoftBox component="form" role="form"
          onSubmit={(e) => submitHandler(e, routes[parseInt(step - 1)])}

          display="flex" encType="multipart/form-data" flexDirection="column" justifyContent="center" alignItems="center" ref={form}>
          {step == 1 ? (
            <>
              <SoftBox mb={2} width="100%">
                <FormControl sx={{ display: "flex", gap: 5, justifyContent: "center", flexDirection: "row", alignContent: "center" }} >
                  <FormLabel color="primary" sx={{ alignSelf: "center" }} >Initials</FormLabel>
                  <Select
                    labelId="initial"
                    id="demo-simple-select"
                    defaultValue="Mr."
                    label="Initial"
                    name="initial"
                  >
                    <MenuItem fullWidth value="Mr.">Mr.</MenuItem>
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
                  Password must be Alphanumerical and must contain atleast one special charactor.
                </SoftTypography>
              </SoftBox>
              <SoftBox mb={2} width="100%">
                <SoftInput name="sponsorId" type="text" placeholder="sponsor id" />
              </SoftBox>
              <SoftBox mb={2} width="100%">
                <SoftInput name="placementId" type="text" placeholder="placement id" />
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
                  disabled={form.userId ?? false}
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
                Aadhar file
                <SoftInput type="file" placeholder="aadhar file" name="aadharFile" />
              </SoftBox>

              <SoftBox mb={2} width="100%">
                <SoftInput
                  type="tel"
                  placeholder="PAN Number"
                  name="panNo"
                  onKeyPress={(e) => {
                    if (isNaN(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </SoftBox>
              <SoftBox mb={2} width="100%">
                PAN file
                <SoftInput type="file" placeholder="PAN file" name="panFile" />
              </SoftBox>
              <SoftBox mb={2} width="100%">
                Sign file
                <SoftInput type="file" placeholder="Signature" name="sign" />
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
              sx={{ cursor: "poiner", userSelect: "none" }}
            >
              &nbsp;&nbsp;I agree the&nbsp;
            </SoftTypography>
            <SoftTypography
              component="p"
              cursor="pointer"
              fontWeight="bold"
              textGradient
            >
              Terms and Conditions
            </SoftTypography>
          </SoftBox>
          <SoftBox mt={1} mb={1}>
            <SoftButton
              variant="gradient"
              type="submit"
              color="info"
            >
              Submit
            </SoftButton>
          </SoftBox>
          <SoftBox mt={2} textAlign="center" display="flex" justifyContent="center" alignContent="center" fontSize="0.9rem">

            <SoftBox px={2} >

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
            <hr />

            <SoftBox px={2}>

              <SoftTypography variant="p" fontWeight="bold" color="text">
                Incomplete Profile?
              </SoftTypography><br />
              <SoftTypography
                onClick={() => {
                  setDialog(dispatch, [
                    {
                      status: "skip",
                      message: "Please Enter Your User Id",
                    },
                  ]);
                }}
                variant="button"
                color="info"
                textGradient
                cursor="pointer"
              >
                Complete Now
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignUp;
