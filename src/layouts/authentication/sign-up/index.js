import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
import curved6 from "assets/images/curved-images/curved14.jpg";
import UserController from "Services/UserServices";
import CustomPopup from "components/Modal";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

function SignUp() {
  const [agreement, setAgreement] = useState(true); // Corrected state variable name
  const [step, setStep] = useState(1);
  const [user, setUser] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const form = useRef(null); // Changed to null
  const userController = new UserController();

  const handleSetAgreement = () => setAgreement((prevAgreement) => !prevAgreement); // Corrected function name and added functional update for agreement state

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userData = await userController.registerUser({
        fullName: form.current.fullName.value,
        initial: form.current.initial.value,
        phone: form.current.phone.value,
        email: form.current.email.value,
        sponsorId: form.current.sponsorId.value,
        placementId: form.current.placementId.value,
        password: form.current.password.value,
      });
      sessionStorage.setItem("userId", userData?.data?.userId);
      setUser(userData);
      setStep(2);
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  const handleAddress = async (e) => {
    e.preventDefault();

    try {
      const userData = await userController.createAddress({
        street1: form.current.street1.value,
        street2: form.current.street2.value,
        city: form.current.city.value,
        state: form.current.state.value,
        country: form.current.country.value,
        postalCode: form.current.postalCode.value,
      });
      console.log("Address added successful:", userData);
      console.log(form.current.userId);
      setStep(2);
    } catch (error) {
      console.error("Address creation failed:", error.message);
    }
  };

  return (
    <DashboardLayout>
      <BasicLayout title="Welcome!" description="NextWork Technologies" image={curved6}>
        <Card>
          <form ref={form}>
            <SoftBox pt={2} pb={3} px={3}>
              <SoftBox component="form" role="form">
                {step === 1 ? (
                  <>
                    <SoftBox mb={2}>
                      <h3>Add your Profile info</h3>
                    </SoftBox>
                    <SoftBox mb={2}>
                      <SoftInput
                        placeholder="Name"
                        onChange={(e) => {
                          form.fullName = e.target.value;
                        }}
                      />
                    </SoftBox>
                    <SoftBox mb={2}>
                      <SoftInput
                        placeholder="Initial"
                        onChange={(e) => {
                          form.initial = e.target.value;
                        }}
                      />
                    </SoftBox>
                    <SoftBox mb={2}>
                      <SoftInput
                        type="email"
                        placeholder="Email"
                        onChange={(e) => {
                          form.email = e.target.value;
                        }}
                      />
                    </SoftBox>
                    <SoftBox mb={2}>
                      <SoftInput
                        type="tel"
                        placeholder="Phone"
                        onChange={(e) => {
                          form.phone = e.target.value;
                        }}
                        onKeyPress={(e) => {
                          if (isNaN(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </SoftBox>
                    <SoftBox mb={2}>
                      <SoftInput
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {
                          form.password = e.target.value;
                        }}
                      />
                    </SoftBox>
                    <SoftBox mb={2}>
                      <SoftInput
                        type="text"
                        placeholder="sponsor id"
                        onChange={(e) => {
                          form.sponsorId = e.target.value;
                        }}
                      />
                    </SoftBox>
                    <SoftBox mb={2}>
                      <SoftInput
                        type="text"
                        placeholder="placement id"
                        onChange={(e) => {
                          form.placementId = e.target.value;
                        }}
                      />
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
                      <SoftButton variant="gradient" color="dark" fullWidth onClick={handleLogin}>
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
                        placeholder="Street-1"
                        onChange={(e) => {
                          form.street1 = e.target.value;
                        }}
                      />
                    </SoftBox>
                    <SoftBox mb={2}>
                      <SoftInput
                        placeholder="Street 2"
                        onChange={(e) => {
                          form.street2 = e.target.value;
                        }}
                      />
                    </SoftBox>
                    <SoftBox mb={2}>
                      <SoftInput
                        type="text"
                        placeholder="Postal Code"
                        onChange={(e) => {
                          form.postalCode = e.target.value;
                        }}
                        onKeyPress={(e) => {
                          if (isNaN(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </SoftBox>
                    <SoftBox mb={2}>
                      <SoftInput
                        type="text"
                        placeholder="City"
                        onChange={(e) => {
                          form.city = e.target.value;
                        }}
                      />
                    </SoftBox>
                    <SoftBox mb={2}>
                      <SoftInput
                        type="State"
                        placeholder="State"
                        onChange={(e) => {
                          form.state = e.target.value;
                        }}
                      />
                    </SoftBox>
                    <SoftBox mb={2}>
                      <SoftInput
                        type="text"
                        placeholder="Country"
                        onChange={(e) => {
                          form.country = e.target.value;
                        }}
                      />
                    </SoftBox>

                    <SoftBox display="flex" alignItems="center">
                      <Checkbox checked={agreement} onChange={handleSetAgremment} />
                      <SoftTypography
                        variant="button"
                        fontWeight="regular"
                        onClick={handleSetAgremment}
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
                      <SoftInput
                        placeholder="Bank Name"
                        onChange={(e) => {
                          form.bankName = e.target.value;
                        }}
                      />
                    </SoftBox>
                    <SoftBox mb={2}>
                      <SoftInput
                        placeholder="Account Number"
                        onChange={(e) => {
                          form.initial = e.target.value;
                        }}
                      />
                    </SoftBox>
                    <SoftBox mb={2}>
                      <SoftInput
                        type="text"
                        placeholder="IFSC"
                        onChange={(e) => {
                          form.email = e.target.value;
                        }}
                      />
                    </SoftBox>
                    <SoftBox mb={2}>
                      <SoftInput
                        type="State"
                        placeholder="Holder's Name"
                        onChange={(e) => {
                          form.phone = e.target.value;
                        }}
                      />
                    </SoftBox>
                    <SoftBox mb={2}>
                      <SoftInput
                        type="tel"
                        placeholder="Aadhar Number"
                        onChange={(e) => {
                          form.sponsorId = e.target.value;
                        }}
                        onKeyPress={(e) => {
                          if (isNaN(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </SoftBox>
                    <SoftBox mb={2}>
                      Aadhar file
                      <SoftInput
                        type="file"
                        placeholder="aadhar file"
                        onChange={(e) => {
                          form.password = e.target.value;
                        }}
                      />
                    </SoftBox>

                    <SoftBox mb={2}>
                      <SoftInput
                        type="tel"
                        placeholder="PAN Number"
                        onChange={(e) => {
                          form.sponsorId = e.target.value;
                        }}
                        onKeyPress={(e) => {
                          if (isNaN(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </SoftBox>
                    <SoftBox mb={2}>
                      PAN file
                      <SoftInput
                        type="file"
                        placeholder="aadhar file"
                        onChange={(e) => {
                          form.password = e.target.value;
                        }}
                      />
                    </SoftBox>
                    <SoftBox mb={2}>
                      Sign file
                      <SoftInput
                        type="file"
                        placeholder="Signature"
                        onChange={(e) => {
                          form.password = e.target.value;
                        }}
                      />
                    </SoftBox>
                    <SoftBox mb={2}>
                      <SoftInput
                        type="text"
                        placeholder="Nominie Name"
                        onChange={(e) => {
                          form.password = e.target.value;
                        }}
                      />
                    </SoftBox>
                    <SoftBox mb={2}>
                      <SoftInput
                        type="text"
                        placeholder="Nominie Relation"
                        onChange={(e) => {
                          form.password = e.target.value;
                        }}
                      />
                    </SoftBox>
                    <SoftBox mb={2}>
                      <SoftInput
                        type="text"
                        placeholder="Nominie age"
                        onChange={(e) => {
                          form.password = e.target.value;
                        }}
                      />
                    </SoftBox>
                    <SoftBox display="flex" alignItems="center">
                      <Checkbox checked={agreement} onChange={handleSetAgremment} />
                      <SoftTypography
                        variant="button"
                        fontWeight="regular"
                        onClick={handleSetAgremment}
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
          </form>
        </Card>
        {/* <CustomPopup open={isOpen} setOpen={setIsOpen} data={user} /> */}
      </BasicLayout>
    </DashboardLayout>
  );
}

export default SignUp;
