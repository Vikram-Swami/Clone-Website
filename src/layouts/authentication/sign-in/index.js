import { useRef, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

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
import { setLoading } from "context";
import { startLoading } from "context";

function SignIn() {
  const [, dispatch] = useSoftUIController();
  const navigate = useNavigate();

  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      startLoading(dispatch, true);
      const formDetails = new FormData(e.currentTarget);
      const response = await ApiClient.createData(login, formDetails);
      if (response?.status == 200) {
        setCookie("authToken", response?.data.token, 7);
        setCookie("userId", response?.data.userId, 7);
        navigate("/dashboard");
      }
      setDialog(dispatch, [response]);
    } catch (error) {
      setLoading(dispatch, false);
      console.log(error);
      toast.error(error.response?.data?.message ?? "Network Error!")
    }
  };

  return (
    <>
      <CoverLayout
        title="Sign In"
      >
        <SoftBox component="form" role="form" textAlign="center" display="flex" flexDirection="column" justifyContent="center" alignItems="center" onSubmit={handleLogin}>
          <SoftBox mb={1} width="100%">
            <SoftBox ml={0.5} textAlign="left">
              <SoftTypography component="label" variant="caption" fontWeight="bold" onChange={(e) => { e.target.value = e.target.value.toUpperCase(); }}>
                ID
              </SoftTypography>
            </SoftBox>
            <SoftInput type="text" placeholder="Email / User ID" name="userId" />
          </SoftBox>
          <SoftBox mb={1} width="100%">
            <SoftBox ml={0.5} textAlign="left">
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Password
              </SoftTypography>
            </SoftBox>
            <SoftInput type="password" placeholder="Password" name="password" />
          </SoftBox>
          <SoftBox mt={1} mb={1}>
            <SoftButton variant="gradient" color="info" type="submit">
              Submit
            </SoftButton>
          </SoftBox>
          <SoftBox mt={1} fontSize="0.9rem">

            <SoftTypography variant="p" fontWeight="bold" color="text">
              Forget Password?{" "}
            </SoftTypography>
            <SoftTypography
              component={Link}
              to="/reset-password"
              variant="a"
              color="info"
              textGradient
              cursor="pointer"
            >
              Reset Now
            </SoftTypography>
          </SoftBox>
        </SoftBox>
      </CoverLayout>
    </>
  );
}

export default SignIn;
