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
import { setDialog } from "context";
import { toast } from "react-toastify";
import { setLoading } from "context";
import { startLoading } from "context";
import { forgetPassword } from "Services/endpointes";
import { TextField } from "@mui/material";
import { changePassword } from "Services/endpointes";

function ForgetPassword() {
    const [, dispatch] = useSoftUIController();
    const navigate = useNavigate();

    const changePass = (id) => async (form) => {
        try {
            form.append("id", id);
            console.log(form, id);
            startLoading(dispatch, true);
            const response = await ApiClient.updateData(changePassword, form);
            console.log(response);
            if (response.status == 200) {
                navigate("/");
            }
            setDialog(dispatch, [response]);

        } catch (err) {
            setLoading(dispatch, false);
            toast.error(err.response?.data?.message ?? "Network Error!")
        }
    }

    const forgetPass = async (e) => {
        try {
            e.preventDefault();
            startLoading(dispatch, true);
            const formDetails = new FormData(e.currentTarget);
            let userId = formDetails.get("userId");
            const response = await ApiClient.createData(forgetPassword, formDetails);
            if (response?.status == 200) {
                response.call = changePass(userId);
                response.status = "form";
                response.children = <TextField autoFocus name="otp" margin="dense" label="Enter OTP" type="text" fullWidth />;
                response.action = "Submit";
                console.log(userId);
                setDialog(dispatch, [response]);
            }
            else {
                setDialog(dispatch, [response])
            }
        } catch (error) {
            setLoading(dispatch, false);
            toast.error(error.response?.data?.message ?? "Network Error!")
        }
    };

    return (
        <>
            <CoverLayout
                title="Reset Password"
            >
                <SoftBox component="form" role="form" textAlign="center" display="flex" flexDirection="column" justifyContent="center" alignItems="center" onSubmit={forgetPass}>
                    <SoftBox mb={1} width="100%">
                        <SoftBox ml={0.5} textAlign="left">
                            <SoftTypography component="label" variant="caption" fontWeight="bold">
                                USER ID
                            </SoftTypography>
                        </SoftBox>
                        <SoftInput type="text" placeholder="User ID" name="userId" />
                    </SoftBox>
                    <SoftBox mb={1} width="100%">
                        <SoftBox ml={0.5} textAlign="left">
                            <SoftTypography component="label" variant="caption" fontWeight="bold">
                                PASSWORD
                            </SoftTypography>
                        </SoftBox>
                        <SoftInput type="password" placeholder="Password" name="password" />
                    </SoftBox>
                    <SoftBox mb={1} width="100%">
                        <SoftBox ml={0.5} textAlign="left">
                            <SoftTypography component="label" variant="caption" fontWeight="bold">
                                CONFIRM PASSWORD
                            </SoftTypography>
                        </SoftBox>
                        <SoftInput type="password" placeholder="Confirm Password" name="confirmPassword" />
                    </SoftBox>
                    <SoftBox mt={1} mb={1}>
                        <SoftButton variant="gradient" color="info" type="submit">
                            Submit
                        </SoftButton>
                    </SoftBox>
                    <SoftBox mt={1} fontSize="0.9rem">

                        <SoftTypography variant="p" fontWeight="bold" color="text">
                            Remmemeber Account?{" "}
                        </SoftTypography>
                        <SoftTypography
                            component={Link}
                            to="/"
                            variant="a"
                            color="info"
                            textGradient
                            cursor="pointer"
                        >
                            Login now
                        </SoftTypography>
                    </SoftBox>
                </SoftBox>
            </CoverLayout>
        </>
    );
}

export default ForgetPassword;
