import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';
import UserController from 'Services/UserServices';
import { useNavigate } from 'react-router-dom';
import { useSoftUIController, setLoading } from 'context';

function LoginDialog({ open, setOpen, data }) {
    const otpRef = useRef();
    const [controller, dispatch] = useSoftUIController();
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
    function getCookie(name) {
        const cookieArray = document.cookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            const cookie = cookieArray[i].trim();
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    }
    const handleSubmit = async () => {
        setLoading(dispatch, true);
        try {
            const enteredOtp = otpRef.current.value;
            const response = await userController.verifyOtp(enteredOtp);
            console.log(response);

            if (response?.status === 200) {
                setCookie('authToken', response?.data.token, 7);
                setCookie('userId', response?.data.userId, 7);
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(dispatch, false);

        }
        console.log('Submitting OTP:', otpRef.current.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleResendOtp = async () => {
        try {
            const userId = getCookie('userId');
            console.log(userId);
            const res = await userController.resendOtp(userId)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const expirationTimeout = setTimeout(() => {
        }, 1 * 60 * 1000);


        return () => clearTimeout(expirationTimeout);
    }, []);

    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose}>
                <Grid>
                    <DialogTitle>{data?.message}</DialogTitle>
                    {
                        data?.status == 200 &&
                        <DialogContent>
                            <DialogContent>

                                <div ref={(el) => (otpRef.message = el)} style={{ display: 'none', marginBottom: '10px' }}>
                                    <h2>Your OTP has expired</h2>
                                    <Button onClick={handleResendOtp}>
                                        Resend OTP
                                    </Button>
                                </div>


                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Enter OTP"
                                    type="text"
                                    fullWidth
                                    inputRef={otpRef}
                                    onChange={handleOtpChange}
                                />

                                <Button
                                    onClick={handleSubmit}
                                    color="primary"
                                    ref={(el) => (otpRef.button = el)}
                                    style={{ display: 'none' }}
                                >
                                    Submit
                                </Button>
                            </DialogContent>
                        </DialogContent>
                    }

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
    data: [] ?? '',
};

LoginDialog.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    data: PropTypes.any,
};

export default LoginDialog;
