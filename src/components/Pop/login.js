import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Grid } from '@mui/material';
import UserController from 'Services/UserServices';
import { useNavigate } from 'react-router-dom';

function LoginDialog({ open, setOpen, data }) {
    const [user, setUser] = useState();
    const otpRef = useRef();
    const navigate = useNavigate();
    const userController = new UserController();

    const handleOtpChange = () => {
        const enteredOtp = otpRef.current.value;
        otpRef.button.style.display = enteredOtp.length === 6 ? 'block' : 'none';
    };

    const setCookie = (name, value, days) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    };

    const handleSubmit = async () => {
        try {
            const enteredOtp = otpRef.current.value;
            const response = await userController.verifyOtp(enteredOtp);
            console.log(response);

            // Assuming the API response structure is correct
            if (response.status === 200) {
                setCookie('authToken', response.data.token, 7);
                setCookie('userId', response.data.userId, 7);
                // Redirect to some page after successful login
                navigate('/dashboard'); // Adjust the path accordingly
            }
        } catch (error) {
            console.log(error);
        }

        console.log('Submitting OTP:', otpRef.current.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setUser(data);
        console.log("=>", data);
    }, [data]);

    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose}>
                <Grid>
                    <DialogTitle>{data?.message}</DialogTitle>
                    {data.status === 200 ? (
                        <DialogContent>

                            {/* Add OTP input using ref */}
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Enter OTP"
                                type="text"
                                fullWidth
                                inputRef={otpRef}
                                onChange={handleOtpChange}
                            />
                            {/* Show submit button conditionally */}
                            <Button
                                onClick={handleSubmit}
                                color="primary"
                                ref={el => otpRef.button = el}
                                style={{ display: 'none' }}
                            >
                                Submit
                            </Button>
                        </DialogContent>
                    ) : (
                        ""
                    )}
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Grid>
            </Dialog>
        </React.Fragment>
    );
}

LoginDialog.defaultProps = {
    open: false,
    setOpen: () => { },
    data: [] ?? "",
};

LoginDialog.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    data: PropTypes.any,
};

export default LoginDialog;
