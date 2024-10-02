// react-router-dom components
import { useNavigate } from "react-router-dom";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

import { useSoftUIController } from "context";
import { login } from "Services/endpointes";
import { setDialog } from "context";
import { verifyOtp } from "Services/endpointes";
import { setAccept } from "context";
import { handleLogin } from "api/users";
import { setOtp } from "context";
import { handleOtp } from "api/users";
import { forget } from "api/users";
import { register } from "api/users";

function SignIn() {
  const [controller, dispatch] = useSoftUIController();
  const { accept, otp } = controller;
  const navigate = useNavigate();

  const handleSendOtp = async (form) => {
    let response = await handleOtp(form, dispatch);
    if (response.status == 200) {
      response.title = "Enter OTP";
      response.children = <input type="number" placeholder="6 Digit OTP" name="otp" />;
      response.action = "Submit"
      response.call = (f) => { f.append("userId", response.data?.userId); forget(f, dispatch) };
    }
    setDialog(dispatch, [response]);
  }



  return (
    <>
      <CoverLayout title="SIGN IN!">
        <form
          className="d-flex column"
          role="form"
          encType="multipart/form-data"
          onSubmit={(e) => { e.preventDefault(); let form = new FormData(e.currentTarget); accept && otp?.status != 200 ? handleOtp(form, dispatch) : handleLogin(form, (accept && otp?.status) == 200 ? verifyOtp : login, dispatch, navigate); }}
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
          <div className="mb20 textCenter">

            <button type="submit" className="btn">Submit</button>
          </div>

          <div className="d-flex j-between textCenter mt5">
            <div className="desc-small">

              <h6 className="help-text">
                New User?
              </h6><br />
              <p className="help-text c-point" style={{ color: "blue" }}
                onClick={() => {
                  setDialog(dispatch, [
                    {
                      status: "form",
                      title: "New Registration? Welcome!",
                      message: "Enter Sponsor ID",
                      children: (
                        <input
                          autoFocus
                          name="userId"
                          placeholder="User Id | Email"
                          type="text"
                        />
                      ),
                      action: "Submit",
                      call: (form) => register(form, dispatch, navigate),
                    },
                  ]);
                }}
              >
                Register Here
              </p>
            </div>
            <div style={{ borderRight: "2px solid #a5a5a5", height: "40px" }}></div>
            <div className="desc-small">
              <h6 className="help-text">
                Forget Password?
              </h6><br />
              <p className="help-text c-point" style={{ color: "blue" }}
                onClick={() => {
                  setDialog(dispatch, [
                    {
                      status: "form",
                      title: "Forget Password?",
                      message: "Enter Your User ID or Email ID",
                      children: (
                        <input
                          autoFocus
                          name="userId"
                          placeholder="User Id | Email"
                          type="text"
                        />
                      ),
                      action: "Submit",
                      call: (form) => handleSendOtp(form),
                    },
                  ]);
                }}
              >
                Reset Now
              </p>
            </div>
          </div>
        </form>
      </CoverLayout>
    </>
  );
}

export default SignIn;
