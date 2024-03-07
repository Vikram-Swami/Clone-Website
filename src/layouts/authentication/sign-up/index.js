import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import curved6 from "assets/images/curved-images/curved14.jpg";
import { NativeSelect } from "@mui/material";
import ApiClient from "Services/ApiClient";
import { registerUser, createKyc } from "Services/endpointes";
import { ifscValidate } from "Services/endpointes";
import { setDialog } from "context";
import { toast } from "react-toastify";
import { useSoftUIController } from "context";
import { createAddress } from "Services/endpointes";
import { setLoading } from "context";
function SignUp() {
  const [agreement, setAgreement] = useState(true);
  const form = useRef(null);
  const { step } = useParams();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  let userId;
  const [controller, dispatch] = useSoftUIController();
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

  const handleSetAgreement = () => setAgreement((prevAgreement) => !prevAgreement);

  const submitHandler = async (e, route) => {
    const formdata = new FormData(form.current);
    setLoading(dispatch, true);
    try {
      const response = await ApiClient.createData(route, formdata);
      if (response.status === 200) {
        if (step == 1) {
          form.userId = response.data?.id;
        } else if (step == 3) {
          navigate("/sign-in");
        }
        let next = parseInt(step) + 1;
        navigate(`/sign-up/${next}?userId=${form.userId}`);
        setDialog(dispatch, [response]);
      } else {
        setDialog(dispatch, [response]);
      }
      setLoading(dispatch, false);
    } catch (error) {
      setDialog(dispatch, [error.response?.data]);
      setLoading(dispatch, false);
    }
  };
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("userId")) {
      form.userId = queryParams.get("userId");
    } else {
      navigate("/sign-up/1");
    }
  }, []);
  return (
    <BasicLayout title="Welcome!" description="" image={curved6}>
      <Card>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox
            component="form"
            role="form"
            encType="multipart/form-data"
            method="POST"
            ref={form}
          >
            {step == 1 ? (
              <>
                <SoftBox mb={2}>
                  <h3>Add your Profile info</h3>
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftInput name="fullName" placeholder="Name" />
                </SoftBox>
                <SoftBox mb={2}>
                  <NativeSelect
                    fullWidth
                    defaultValue="Mr. / Ms. / Mrs."
                    inputProps={{
                      name: "initial",
                      id: "uncontrolled-native",
                    }}
                  >
                    <option value="Mr. / Ms. / Mrs.">Mr. / Ms. / Mrs.</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                  </NativeSelect>
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftInput name="email" type="email" placeholder="Email" />
                </SoftBox>
                <SoftBox mb={2}>
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
                  <SoftTypography color="text" fontWeight="light" fontSize="14px">
                    Please enter the Valid Mobile Number
                  </SoftTypography>
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftInput name="password" type="password" placeholder="Password" />
                  <SoftTypography color="text" fontWeight="light" fontSize="14px">
                    Password must be Alphanumerical and must contain atleast one special charactor.
                  </SoftTypography>
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftInput name="sponsorId" type="text" placeholder="sponsor id" />
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftInput name="placementId" type="text" placeholder="placement id" />
                </SoftBox>
                <SoftBox display="flex" alignItems="center">
                  <Checkbox checked={agreement} onChange={handleSetAgreement} />
                  <SoftTypography
                    variant="button"
                    fontWeight="regular"
                    onClick={handleSetAgreement}
                    sx={{ cursor: "poiner", userSelect: "none" }}
                  >
                    &nbsp;&nbsp;I agree the&nbsp;
                  </SoftTypography>
                  <SoftTypography
                    component="a"
                    href="#"
                    variant="button"
                    fontWeight="bold"
                    textGradient
                  >
                    Terms and Conditions
                  </SoftTypography>
                </SoftBox>
                <SoftBox mt={4} mb={1}>
                  <SoftButton
                    variant="gradient"
                    color="dark"
                    fullWidth
                    onClick={(e) => submitHandler(e, registerUser)}
                  >
                    Next
                  </SoftButton>
                </SoftBox>
              </>
            ) : step == 2 ? (
              <>
                <SoftBox mb={2}>
                  <h3>Add your Address</h3>
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftInput
                    placeholder="User Id"
                    name="userId"
                    value={form?.userId ?? ""}
                    disabled={form?.userId ?? false}
                    onInput={(e) => {
                      form.userId = e.target.value;
                    }}
                  />
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftInput placeholder="Street-1" name="street1" />
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftInput placeholder="Street 2" name="street2" />
                </SoftBox>
                <SoftBox mb={2}>
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
                <SoftBox mb={2}>
                  <SoftInput type="text" name="city" placeholder="City" disabled />
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftInput type="text" name="state" disabled placeholder="State" />
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftInput type="text" name="country" disabled placeholder="Country" />
                </SoftBox>

                <SoftBox display="flex" alignItems="center">
                  <Checkbox checked={agreement} onChange={setAgreement} />
                  <SoftTypography
                    variant="button"
                    fontWeight="regular"
                    onClick={handleSetAgreement}
                    sx={{ cursor: "poiner", userSelect: "none" }}
                  >
                    &nbsp;&nbsp;I agree the&nbsp;
                  </SoftTypography>
                  <SoftTypography
                    component="a"
                    href="#"
                    variant="button"
                    fontWeight="bold"
                    textGradient
                  >
                    Terms and Conditions
                  </SoftTypography>
                </SoftBox>
                <SoftBox mt={4} mb={1}>
                  <SoftButton
                    variant="gradient"
                    color="dark"
                    fullWidth
                    onClick={(e) => submitHandler(e, createAddress)}
                  >
                    Next
                  </SoftButton>
                </SoftBox>
              </>
            ) : step == 3 ? (
              <>
                <SoftBox mb={2}>
                  <h3>Add your Bank details</h3>
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftInput
                    placeholder="User Id"
                    name="userId"
                    value={form?.userId ?? ""}
                    disabled={form.userId ?? false}
                  />
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftInput placeholder="Account Number" name="accountNo" />
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftInput
                    type="text"
                    placeholder="IFSC"
                    name="IFSC"
                    onChange={handleIFSCCodeChange}
                  />
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftInput placeholder="Bank Name" name="bankName" disabled />
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftInput type="text" placeholder="Holder's Name" name="holder" />
                </SoftBox>
                <SoftBox mb={2}>
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
                <SoftBox mb={2}>
                  Aadhar file
                  <SoftInput type="file" placeholder="aadhar file" name="aadharFile" />
                </SoftBox>

                <SoftBox mb={2}>
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
                <SoftBox mb={2}>
                  PAN file
                  <SoftInput type="file" placeholder="PAN file" name="panFile" />
                </SoftBox>
                <SoftBox mb={2}>
                  Sign file
                  <SoftInput type="file" placeholder="Signature" name="sign" />
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftInput type="text" placeholder="Nominie Name" name="nomineeName" />
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftInput type="text" placeholder="Nominie Relation" name="nomineeRel" />
                </SoftBox>
                <SoftBox mb={2}>
                  <SoftInput type="text" placeholder="Nominie age" name="nomineeAge" />
                </SoftBox>
                <SoftBox display="flex" alignItems="center">
                  <Checkbox checked={agreement} onChange={setAgreement} />
                  <SoftTypography
                    variant="button"
                    fontWeight="regular"
                    onClick={setAgreement}
                    sx={{ cursor: "poiner", userSelect: "none" }}
                  >
                    &nbsp;&nbsp;I agree the&nbsp;
                  </SoftTypography>
                  <SoftTypography
                    component="a"
                    href="#"
                    variant="button"
                    fontWeight="bold"
                    textGradient
                  >
                    Terms and Conditions
                  </SoftTypography>
                </SoftBox>
                <SoftBox mt={4} mb={1}>
                  <SoftButton
                    variant="gradient"
                    color="dark"
                    fullWidth
                    onClick={(e) => submitHandler(e, createKyc)}
                  >
                    Register
                  </SoftButton>
                </SoftBox>
              </>
            ) : (
              ""
            )}
          </SoftBox>
          <SoftBox mt={3} textAlign="center">
            <SoftTypography variant="button" color="text" fontWeight="regular">
              Already have an account?&nbsp;
              <SoftTypography
                component={Link}
                to="/"
                variant="button"
                color="dark"
                fontWeight="bold"
                textGradient
              >
                Sign in
              </SoftTypography>
            </SoftTypography>
          </SoftBox>
          <SoftBox mt={3} textAlign="center">
            <SoftTypography variant="button" color="text" fontWeight="regular">
              Is your profile pending?
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
                color="dark"
                fontWeight="bold"
                textGradient
                cursor="pointer"
              >
                complete profile
              </SoftTypography>
            </SoftTypography>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
