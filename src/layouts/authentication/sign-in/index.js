// react-router-dom components
import { NavLink, useNavigate } from "react-router-dom";
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
import { sendOtp } from "Services/endpointes";
import { verifyOtp } from "Services/endpointes";
import { setAccept } from "context";
import { handleLogin } from "api/users";
import { setOtp } from "context";

function SignIn() {
  const [controller, dispatch] = useSoftUIController();
  const { accept, otp } = controller;
  const navigate = useNavigate();

  const handleOtpLogin = async (e) => {
    try {
      e.preventDefault();
      startLoading(dispatch, true);
      const form = new FormData(e.currentTarget);
      const response = await ApiClient.createData(sendOtp, form);
      setOtp(dispatch, response);
    } catch (err) {
      toast.error(err?.message);
      setLoading(dispatch, false);
    }
  };

  const register = async (form) => {
    try {
      const response = await ApiClient.createData("/sponsor-now", form);
      if (response.status === 200) {
        navigate(`/sign-up?sponsorId=${response?.data?.userId}`)

      }
      setDialog(dispatch, [response]);
    } catch (err) {
      setDialog(dispatch, [{ status: 400, message: err?.toString() }])
    }
  }

  return (
    <>
      <CoverLayout title="SIGN IN!">
        <form
          className="d-flex column"
          role="form"
          encType="multipart/form-data"
          onSubmit={(e) => { accept && otp?.status != 200 ? handleOtpLogin(e) : handleLogin(e, (accept && otp?.status) == 200 ? verifyOtp : login, dispatch, navigate); }}
        >
          <div className="mb10">
            <h4 className="mb10">Enter Your Credentials Here!</h4>
          </div>
          <div className="mb10">
            <input type="text" placeholder="Please Enter Email or User ID" name="userId" />
          </div>
          {!accept || otp?.status == 200 ? <div className="mb10">
            <input type={otp?.status == 200 ? "text" : "password"} placeholder={otp?.status == 200 ? "Enter OTP" : "Enter Password"} name={otp?.status == 200 ? "otp" : "password"} />
          </div> : ""}
          <div className="mb10">
            <input type="checkbox" onChange={(e) => { setAccept(dispatch, e.target.checked); setOtp(dispatch, {}); }} checked={accept} />
            <span onClick={() => { setAccept(dispatch, !accept); setOtp(dispatch, {}); }} className="c-point help-text" style={{ userSelect: "none", marginLeft: 10 }}>
              Login with OTP
            </span>
          </div>
          {otp?.status && <p style={{ width: "300px", color: otp?.status == 200 ? "green" : "red" }} className="help-text mb20">{otp?.message}</p>}
          <button type="submit" className="btn">Submit</button>

          <div className="mt5">
            <h6 className="help-text">
              New User?
            </h6>{" "}
            <a className="help-text"
              onClick={() => {
                setDialog(dispatch, [
                  {
                    status: "form",
                    title: "Please Enter Sponsor User ID or Email",
                    children: (
                      <input
                        autoFocus
                        name="userId"
                        placeholder="User Id | Email"
                        type="text"
                      />
                    ),
                    action: "Submit",
                    call: register,
                  },
                ]);
              }}
            >
              Register Here
            </a>
          </div>
          <Separator />
          <div>
            <h6 className="help-text">
              Forget Password?{" "}
            </h6>
            <NavLink
              className="help-text"
              to="/reset-password"
            >
              Reset Now
            </NavLink>
          </div>
        </form>
      </CoverLayout>
    </>
  );
}

export default SignIn;
