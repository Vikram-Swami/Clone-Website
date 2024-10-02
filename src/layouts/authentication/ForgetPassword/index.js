import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const { useState } = require("react");

const ForgetPassword = () => {

    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className="d-flex column">

            <div className="mb10 relative" >
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
            <div className="mb10">
                <input name="confirmPassword" placeholder="Re-enter Your New Password" type="password" />
            </div>
        </div>
    )
}
export default ForgetPassword;