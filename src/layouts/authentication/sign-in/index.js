import { useRef, useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import LoginDialog from "components/Pop/login";
import { useSoftUIController } from "context";
import ApiClient from "Services/ApiClient";
import { login } from "Services/endpointes";
import { setDialog } from "context";
import { toast } from "react-toastify";

function SignIn() {
  const form = useRef();
  const [controller, dispatch] = useSoftUIController();
  const handleLogin = async (e) => {
    try {
      const formDetails = new FormData(form.current);
      const userData = await ApiClient.createData(login, formDetails);
      if (userData?.status == 200) {
        userData.status = "otp";
      }
      setDialog(dispatch, [userData])
    } catch (error) {
      if (error.response?.data?.message) {
        setDialog(dispatch, [error.response?.data]);

      } else {
        toast.error("Oops! Something went wrong. Please try later.")
      }
      console.error("Login failed:", error);
      // Handle login error (e.g., display error message)
    }
  };
  return (
    <CoverLayout
      title=" Welcome"
      description="Enter your User-Id and password to Log-in"
      image={curved9}
    >
      <SoftBox component="form" role="form" ref={form}>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              User Id
            </SoftTypography>
          </SoftBox>
          <SoftInput type="text" placeholder="user-Id" name="userId" />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder="Password" name="password" />
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth onClick={handleLogin}>
            Log-in
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/sign-up/1"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SoftTypography>
          </SoftTypography>
          <br></br>
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Forget Password ?{" "}
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

    </CoverLayout>
  );
}

export default SignIn;
