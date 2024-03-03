import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Slide } from '@mui/material';
import { setDialog } from 'context';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FormDialog({ open, setOpen, data }) {
  const [user, setUser] = useState();

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

  useEffect(() => {
    setUser(data);
  }, [data]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}

      >
        <Grid >

          <DialogTitle>{data?.message}</DialogTitle>
          {data?.remainingAttempts && <DialogTitle>Attempts Left: {data?.remainingAttempts}</DialogTitle>}

          {data.status === 200 &&
            <DialogContent>
              <DialogContentText>Id:{data?.data?.id}</DialogContentText>
            </DialogContent>}

          <DialogActions display="flex" justifyContent="space-between">
            {data.status === "Logout" &&
              <Button
                onClick={handleLogout}
              >
                Logout
              </Button>

            }
            <Button
              onClick={handleClose}
            >
              Close
            </Button>
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
