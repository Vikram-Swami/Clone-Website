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
