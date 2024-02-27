import React, { useState, useEffect } from 'react';
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

function FormDialog({ open, setOpen, data }) {
  const [user, setUser] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setUser(data);
  }, [data]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}

      >
        <Grid >
          <DialogTitle>{data?.message}</DialogTitle>
          {data.status === 200 ? <DialogContent>
            <DialogContentText>Id:{data?.data?.id}</DialogContentText>
          </DialogContent> : ""}
          <DialogActions>
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
