import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { useSoftUIController } from "context";
import CoverLayout from "../components/CoverLayout";
import { setAccept } from "context";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { submitHandler } from "api/users";

function SignUp() {

  const form = useRef(null);
  const [controller, dispatch] = useSoftUIController();
  const { accept } = controller;

  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("sponsorId")) {
      form.sponsorId = queryParams.get("sponsorId")
      form.placementId = queryParams?.get("placementId") ?? form.sponsorId;
    }
    else {
      navigate("/")
    }
  }, []);
  useEffect(() => {
    form.current.reset()
  }, [])
  return (
    <CoverLayout title="CREATE NEW ACCOUNT!" >

      <form role="d-flex column"
        onSubmit={(e) => submitHandler(e, dispatch, accept, form, navigate)}
        encType="multipart/form-data" ref={form} className="d-flex column">

        <>
          <div className="mb10" width="100%">
            <div className="d-flex">
              <label style={{ width: "20%" }} htmlFor="initial" className="custom-label">INTIALS</label>
              <div className="custom-select-wrapper">
                <select id="initial" name="initial" className="custom-select" defaultValue="Mr.">
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Miss">Miss</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Dr.">Dr.</option>
                  <option value="Ms.">Ms</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb10" width="100%">
            <input type="text" name="fullName" placeholder="Name" />
          </div>

          <div width="100%" className="mb10 custom-form-control">
            <label style={{ width: "20%" }} htmlFor="dob" className="custom-label">DOB</label>
            <input name="dob" type="date" placeholder="Date of Birth" />
          </div>

          <div className="mb10" width="100%">
            <input name="email" type="email" placeholder="Email" />
          </div>

          <div className="mb10" width="100%">
            <input
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
            <p className="help-text" style={{ fontSize: "0.8rem" }}>
              Please enter the Valid 10 digit Mobile Number
            </p>
          </div>

          <div className="mb10 relative" width="100%">
            <input
              name="password"
              type={showPassword ? "text" : "password"} // Toggle between text and password
              placeholder="Password"
            />
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              sx={{ position: "absolute", right: 10, top: 0 }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            <p className="help-text" style={{ fontSize: "0.8rem" }}>
              Password must be Alphanumerical, minimum 8 characters long and must contain at least one special character.
            </p>
          </div>

          <div className="mb10" width="100%">
            <div className="custom-select-wrapper">
              <select name="type" className="custom-select" defaultValue="Individual">
                <option value="individual">INDIVIDUAL</option>
                <option value="organization">ORGANIZATION</option>
              </select>
            </div>
          </div>
        </>
        <div className="mb10">
          <input type="checkbox" onChange={(e) => { setAccept(dispatch, e.target.checked) }} checked={accept} />
          <span onClick={() => setAccept(dispatch, !accept)} style={{ cursor: "poiner", userSelect: "none", fontSize: "1rem", whiteSpace: "nowrap" }}>
            &nbsp;&nbsp;I agree with KNO-ONE India&apos;s&nbsp;
            <span className="help-text"> Terms and Policy</span>
          </span>
        </div>
        <div className="mb10 d-flex column">
          <button type="submit" className="btn">Submit</button>
        </div>
      </form>
      <div className="mt10 textCenter">

        <p className="help-text">
          Already a User?
        </p >
        <NavLink className="custom-label" to={"/sign-in"}> Click Here!</NavLink>
      </div>
    </CoverLayout >
  );
}

export default SignUp;
