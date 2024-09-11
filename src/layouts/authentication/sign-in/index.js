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
import Separator from "../components/Separator";
import { TextField } from "@mui/material";
import { sendOtp } from "Services/endpointes";
import { verifyOtp } from "Services/endpointes";
import { validateUser } from "Services/endpointes";

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
        setCookie("authToken", response?.data.token, 1);
        setCookie("userId", response?.data.userId, 1);
        navigate("/dashboard");
        console.log(response.message);
        toast.success(response.message);
      } else {
        setDialog(dispatch, [response]);
      }
    } catch (error) {
      toast.error(error.toString());
    } finally {
      setLoading(dispatch, false);
    }
  };

  const verifyOtpLogin = async (id, form) => {
    try {
      form.append("userId", id);
      startLoading(dispatch, false);
      const response = await ApiClient.createData(verifyOtp, form);
      if (response.status === 200) {
        setCookie("authToken", response?.data.token, 1);
        setCookie("userId", response?.data.userId, 1);
        navigate("/dashboard");
        toast.success(response.message);
        setLoading(dispatch, false);
      } else {
        setDialog(dispatch, [response]);
      }
    } catch (err) {
      setLoading(dispatch, false);
      toast.error(err.toString());
    }
  };

  const handleOtpLogin = async (form) => {
    try {
      startLoading(dispatch, true);
      const response = await ApiClient.createData(sendOtp, form);
      if (response.status === 200) {
        response.status = "form";
        response.action = "submit";
        response.title = "Pleae Enter Your OTP";
        response.children = (
          <TextField
            autoFocus
            name="otp"
            placeholder="6 digit otp"
            margin="dense"
            label="Enter OTP"
            type="number"
            fullWidth
          />
        );
        response.call = (data) => verifyOtpLogin(response.data?.userId, data);
      }
      setDialog(dispatch, [response]);
    } catch (err) {
      setLoading(dispatch, false);
      toast.error(err?.toString());
    }
  };

  const completeProfile = async (form) => {
    try {
      startLoading(dispatch, true);
      const response = await ApiClient.createData(validateUser, form);
      if (response.status === 200) {
        let step = response.data?.step;
        let userId = response.data?.userId;
        navigate(`/sign-up/${step}?userId=${userId}`);
        setLoading(dispatch, false);
      } else {
        setDialog(dispatch, [response]);
      }
    } catch (error) {
      toast.error(error.toString());
      setLoading(dispatch, false);
    }
  };

  const register = async (form) => {
    try {
      const response = await ApiClient.createData("/sponsor-now", form);
      if (response.status === 200) {
        navigate(`/sign-up/1?sponsorId=${response?.data?.userId}&placementId=${response?.data?.userId}`)

      }
      setDialog(dispatch, [response]);
    } catch (err) {
      setDialog(dispatch, [{ status: 400, message: err?.toString() }])
    }
  }

  return (
    <>
      <CoverLayout title="SIGN IN HERE!">
        <SoftBox
          component="form"
          role="form"
          textAlign="center"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          onSubmit={handleLogin}
        >
          <SoftBox mb={1} width="100%">
            <SoftTypography
              component="h5"
              fontWeight="bold"
              onChange={(e) => {
                e.target.value = e.target.value.toUpperCase();
              }}
            >Enter Your Credentials Here!</SoftTypography>
            <SoftBox ml={0.5} textAlign="left">
            </SoftBox>
            <SoftInput type="text" placeholder="Please Enter Email or User ID" name="userId" />
          </SoftBox>
          <SoftBox mb={1} width="100%">
            <SoftBox ml={0.5} textAlign="left">
            </SoftBox>
            <SoftInput type="password" placeholder="Password" name="password" />
          </SoftBox>
          <SoftBox mt={1}>
            <SoftButton variant="gradient" color="info" type="submit">
              Login
            </SoftButton>
          </SoftBox>
          <SoftBox mt={1} mb={2}>
            <SoftButton
              onClick={() => {
                setDialog(dispatch, [
                  {
                    status: "form",
                    title: "Please Enter Your User Id",
                    children: (
                      <TextField
                        autoFocus
                        name="userId"
                        placeholder="User ID / Email"
                        margin="dense"
                        label="ID"
                        type="text"
                        fullWidth
                      />
                    ),
                    action: "Submit",
                    call: handleOtpLogin,
                  },
                ]);
              }}
              variant="info"
              color="info"
              fontSize="0.8rem"
              whiteSpace="nowrap"
              ml={1}
              textTransform="uppercase"
              cursor="pointer"
            >
              Login with OTP
            </SoftButton>
          </SoftBox>
          <SoftBox fontSize="0.9rem">
            <SoftTypography variant="p" fontWeight="bold" color="text">
              New User?
            </SoftTypography>{" "}
            <SoftTypography
              onClick={() => {
                setDialog(dispatch, [
                  {
                    status: "form",
                    title: "Please Enter Sponsor User ID or Email",
                    children: (
                      <TextField
                        autoFocus
                        name="userId"
                        placeholder="User Id | Email"
                        margin="dense"
                        label="ID"
                        type="text"
                        fullWidth
                      />
                    ),
                    action: "Submit",
                    call: register,
                  },
                ]);
              }}
              variant="a"
              color="info"
              textGradient
              cursor="pointer"
            >
              Register Here
            </SoftTypography>
          </SoftBox>
          <Separator />
          <SoftBox fontSize="0.9rem">
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
