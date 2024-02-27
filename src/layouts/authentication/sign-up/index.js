import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import curved6 from "assets/images/curved-images/curved14.jpg";
import FormDialog from "components/Pop";
import UserController from "Services/UserServices";
import { NativeSelect } from "@mui/material";
function SignUp() {
  const [agreement, setAgreement] = useState(true);
  const [user, setUser] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const form = useRef(null);
  const userController = new UserController();
  const navigate = useNavigate();
  let newUserId = sessionStorage.getItem("userId") ?? 0;
  const [step, setStep] = useState(newUserId && 2);
  const fetchPostalDetails = async (postalCode, e) => {
    try {
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
    } catch (error) {
      console.error("Error fetching postal details:", error);
    }
  };
  const bankDetails = async (ifsc, e) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/ifsc-validate/${ifsc}`);
      const data = await response.json();
      if (data) {
        const bank = data?.data?.BANK;
        form.current.bankName.value = bank;
        form.current.IFSC.parentNode.style.border = "2px solid #67ca67 ";
      } else {
        form.current.IFSC.parentNode.style.border = "2px solid red";
      }
    } catch (error) {
      form.current.IFSC.parentNode.style.border = "2px solid red";

      console.error("Error fetching postal details:", error);
    }
  };

  const handlePostalCodeChange = async (e) => {
    const postalCode = e.target.value;
    if (postalCode.length == 6) {
      await fetchPostalDetails(postalCode, e);
      return;
    } else {
      form.current.postalCode.parentNode.style.border = "none";
      form.current.city.value = "City";
      form.current.state.value = "State";
      form.current.country.value = "Country";
    }
  };
  const handleIFSCCodeChange = async (e) => {
    const ifsc = e.target.value;
    if (ifsc.length == 11) {
      await bankDetails(ifsc, e);
      return;
    } else {
      form.current.IFSC.parentNode.style.border = "none";
    }
  };

  const handleSetAgreement = () => setAgreement((prevAgreement) => !prevAgreement);

  const registerHandler = async (e) => {
    try {
      const formdata = new FormData(form.current);
      const userData = await userController.registerUser(formdata);
      if (userData.status === 200) {
        setIsOpen(true);
        setStep(step + 1);
        setUser(userData);
        sessionStorage.setItem("userId", userData?.data?.id);
        form.current.reset();
      } else {
        setIsOpen(true);
        setUser(userData);
      }
    } catch (error) {
      setIsOpen(true);
      setUser(error.response.data);
      console.error("Registration failed:", error);
    }
  };

  const handleAddress = async () => {
    try {
      const formdata = new FormData(form.current);
      const userData = await userController.createAddress(formdata);
      setStep(3);
      form.current.reset();
      setUser(userData);
      setIsOpen(true);
    } catch (error) {
      setIsOpen(true);
      setUser(error?.response?.data);
    }
  };
  const handleKyc = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData(form.current);
      const userData = await userController.createKycDetails(formdata);
      setUser(userData);
      setIsOpen(true);
      navigate("/login");
    } catch (error) {
      setIsOpen(true);
      setUser(error?.response?.data);
    }
  };
  useEffect(() => {}, []);
  console.log("called");
  return (
    <BasicLayout title="Welcome!" description="NextWork Technologies" image={curved6}>
      <Card>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox
            component="form"
            role="form"
            encType="multipart/form-data"
            method="POST"
            ref={form}
          >
            {step === 1 ? (
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
                  <SoftButton variant="gradient" color="dark" fullWidth onClick={registerHandler}>
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
                  <SoftInput placeholder="User Id" name="userId" value={newUserId} disabled />
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
                  <SoftButton variant="gradient" color="dark" fullWidth onClick={handleAddress}>
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
                  <SoftInput placeholder="User Id" name="userId" disabled />
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
                  <SoftButton variant="gradient" color="dark" fullWidth onClick={handleKyc}>
                    Register
                  </SoftButton>
                </SoftBox>
              </>
            ) : (
              ""
            )}
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
      <FormDialog open={isOpen} setOpen={setIsOpen} data={user} />
    </BasicLayout>
  );
}

export default SignUp;
