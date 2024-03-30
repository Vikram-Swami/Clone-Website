import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, Slide, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ApiClient from "Services/ApiClient";
import { validateUser } from "Services/endpointes";
import { toast } from "react-toastify";
import { setLoading } from "context";
import { useSoftUIController } from "context";
import { startLoading } from "context";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FormDialog({ open, setOpen, data }) {
  let userIdref = useRef();
  const navigate = useNavigate();
  let [controller, dispatch] = useSoftUIController();

  const validateUsers = async (e, step) => {
    e.preventDefault();
    startLoading(dispatch, true);
    const userId = new FormData(userIdref.current);

    try {
      const response = await ApiClient.createData(validateUser, userId);
      if (response.status === 200) {
        setOpen(false);
        navigate(`/sign-up/${step}?userId=${userId.get("userId")}`);
      } else {
        toast.error(response.message ?? "User Not found");
      }
      setLoading(dispatch, false);
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Oops! Network Error. Please try later.");
      setLoading(dispatch, false);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
        <Grid>
          <DialogTitle>{data?.message}</DialogTitle>
          {data?.remainingAttempts && (
            <DialogTitle>Attempts Left: {data?.remainingAttempts}</DialogTitle>
          )}

          {data.status === 200 && data?.data?.id && (
            <DialogContent textAlign="center">
              <DialogContentText>Id:{data?.data?.id}</DialogContentText>
              {data.data?.userId && <DialogContentText>userId:{data?.data?.userId}</DialogContentText>}
            </DialogContent>
          )}

          <DialogActions display="flex">
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Grid>
      </Dialog>
    </React.Fragment>
  );
}

FormDialog.defaultProps = {
  open: false,
  setOpen: () => { },
  data: [] ?? "",
};

FormDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  data: PropTypes.any,
};

export default FormDialog;
