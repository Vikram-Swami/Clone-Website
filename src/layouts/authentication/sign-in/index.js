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

import { useSoftUIController } from "context";
import ApiClient from "Services/ApiClient";
import { login } from "Services/endpointes";
import { setDialog } from "context";
import { toast } from "react-toastify";

function SignIn() {
  const form = useRef();
  const [dispatch] = useSoftUIController();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const formDetails = new FormData(form.current);
      const response = await ApiClient.createData(login, formDetails);
      if (response?.status == 200) {
        response.status = "otp";
      }
      setDialog(dispatch, [response]);
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Network Error!")
    }
  };

  return (
    <>
      <CoverLayout
        title="Sign In"
      >
        <SoftBox component="form" role="form" display="flex" flexDirection="column" justifyContent="center" alignItems="center" ref={form}>
          <SoftBox mb={1} width="100%">
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                ID
              </SoftTypography>
            </SoftBox>
            <SoftInput type="text" placeholder="Email / User ID" name="userId" />
          </SoftBox>
          <SoftBox mb={1} width="100%">
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Password
              </SoftTypography>
            </SoftBox>
            <SoftInput type="password" placeholder="Password" name="password" />
          </SoftBox>
          <SoftBox mt={1} mb={1}>
            <SoftButton variant="gradient" color="info" onClick={handleLogin}>
              Submit
            </SoftButton>
          </SoftBox>
          <hr />
          <SoftBox mt={2} textAlign="center" display="flex" justifyContent="center" fontSize="0.9rem">
            <SoftBox px={2}>

              <SoftTypography variant="p" fontWeight="bold" color="text">
                New to Nextwork?
              </SoftTypography>
              <SoftTypography
                component={Link}
                to="/sign-up/1"
                variant="a"
                color="info"
                textGradient
                cursor="pointer"
              >
                Create Account
              </SoftTypography>
            </SoftBox>
            <hr />
            <SoftBox px={2}>

              <SoftTypography variant="p" fontWeight="bold" color="text">
                Forget Password?
              </SoftTypography>
              <SoftTypography
                component={Link}
                to="/sign-up/1"
                variant="a"
                color="info"
                textGradient
                cursor="pointer"
              >
                Reset Now
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </CoverLayout>
    </>
  );
}

export default SignIn;
