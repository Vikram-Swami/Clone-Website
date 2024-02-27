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

function SignIn() {
  const form = useRef();
  const userController = new UserController();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userData = await userController.login({ userId: form.userId, password: form.password });
      console.log("Login successful:", userData);
      console.log(form.userId);
      // Handle successful login (e.g., store token in local storage, redirect user)
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
      <form ref={form}>
        <SoftBox component="form" role="form">
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Email
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="text"
              placeholder="user-Id"
              onChange={(e) => {
                form.userId = e.target.value;
              }}
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
              onChange={(e) => {
                form.password = e.target.value;
              }}
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
                to="/authentication/sign-up"
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
      </form>
    </CoverLayout>
  );
}

export default SignIn;
