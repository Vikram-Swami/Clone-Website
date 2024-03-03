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
import { setDialog } from "context";
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
  const handleLogout = () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    setOpen(false);
    window.location.reload();
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
        <Grid>
          <DialogTitle>{data?.message}</DialogTitle>
          {data?.remainingAttempts && (
            <DialogTitle>Attempts Left: {data?.remainingAttempts}</DialogTitle>
          )}

          {data.status === 200 && (
            <DialogContent>
              <DialogContentText>Id:{data?.data?.id}</DialogContentText>
            </DialogContent>
          )}
          {data.status === "skip" && (
            <>
              <DialogContent>
                <DialogContent>
                  <form encType="multipart/form-data" ref={(userIdref = {})}>
                    <div
                      ref={(el) => (userIdref.message = el)}
                      style={{ display: "none", marginBottom: "10px" }}
                    ></div>

                    <TextField
                      autoFocus
                      name="userId"
                      margin="dense"
                      label="Enter User Id"
                      type="text"
                      fullWidth
                    />
                  </form>
                </DialogContent>
              </DialogContent>
              <Button
                variant="gradient"
                color="light"
                onClick={(e) => {
                  validateUsers(e, 2);
                }}
              >
                Pending Address? complete now
              </Button>
              <Button
                variant="gradient"
                color="dark"
                onClick={(e) => {
                  validateUsers(e, 3);
                }}
              >
                Pending KYC?<> complete now</>
              </Button>
            </>
          )}

          <DialogActions display="flex" justifyContent="space-between">
            {data.status === "Logout" && <Button onClick={handleLogout}>Logout</Button>}
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Grid>
      </Dialog>
    </React.Fragment>
  );
}

FormDialog.defaultProps = {
  open: false,
  setOpen: () => {},
  data: [] ?? "",
};

FormDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  data: PropTypes.any,
};

export default FormDialog;
