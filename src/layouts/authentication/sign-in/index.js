import { useRef, useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import UserController from "Services/UserServices";
import FormDialog from "components/Pop";

function SignIn() {
  const form = useRef();
  const userController = new UserController();
  const handleLogin = async (e) => {
    try {
      const formDetails = new FormData(form.current);
      const userData = await userController.login(formDetails);
      console.log("Login successful:", userData);
      console.log(form.userId);
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
      console.error("Login failed:", error.message);
      6;
      // Handle login error (e.g., display error message)
    }
  };
  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <SoftBox component="form" role="form" ref={form}>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="text"
            placeholder="user-Id"
            name="userId"
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="password"
            placeholder="Password"
            name="password"
          />
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth onClick={handleLogin}>
            sign in
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
      <FormDialog />
    </CoverLayout>
  );
}

export default SignIn;
