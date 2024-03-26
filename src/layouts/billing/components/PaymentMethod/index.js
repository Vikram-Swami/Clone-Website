// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Next Work Dashboard React base styles
import borders from "assets/theme/base/borders";

// Images

import { useSoftUIController } from "context";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
function PaymentMethod() {
  const { borderWidth, borderColor } = borders;
  const [controller] = useSoftUIController();
  const { user } = controller;
  const [openDialog, setOpenDialog] = useState(false);
  const [utrlInput, setUtrlInput] = useState("");
  const handleUtrlClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUtrlSubmit = () => {
    console.log("UTRL input:", utrlInput);
    // Perform any other actions you want with the UTRL input
    handleCloseDialog();
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [withdrawalAmount, setWithdrawalAmount] = useState('');

  const handleAmountChange = (event) => {
    setWithdrawalAmount(event.target.value);
  };
  return (
    <Card id="delete-account">
      <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <SoftTypography variant="h4" fontWeight="medium">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Account Details
        </SoftTypography>
        <SoftBox>
          <SoftButton variant="gradient" color="dark" style={{ marginRight: "20px" }} onClick={handleClickOpen} >
            &nbsp;add Money
          </SoftButton>

          <SoftButton variant="gradient" color="dark" ml={2} onClick={handleClickOpen}>
            &nbsp;Withdraw
          </SoftButton>
        </SoftBox>

        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              console.log(formJson);
              handleClose();
            },
          }}
        >
          <DialogTitle>Withdraw</DialogTitle>
          <DialogContent>
            <TextField
              label="Enter Amount To Withdraw"
              variant="outlined"
              fullwidth
              value={withdrawalAmount}
              onChange={handleAmountChange}
              margin="normal"
            />
            <FormControl component="fieldset" margin="dense">

              <RadioGroup aria-label="payment-method" color="secondary" name="paymentMethod">
                <FormControlLabel
                  value="withdraw"
                  control={<Radio />}
                  label={
                    <span>
                      Wallet&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      0
                    </span>
                  }
                />
                <FormControlLabel
                  value="credit-debit"
                  control={<Radio />}
                  label={
                    <span>
                      Credit/Debit
                      Card&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      (Coming Soon)
                    </span>
                  }
                  disabled={true}
                />
                <FormControlLabel
                  value="upi"
                  control={<Radio />}
                  label={
                    <span>
                      Netbanking&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      (Coming Soon)
                    </span>
                  }
                  disabled={true}
                />
                <FormControlLabel
                  value="utrl"
                  control={<Radio />}
                  label="UTI"
                  onClick={handleUtrlClick}
                />
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                  <DialogTitle>Enter UTI </DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="utrlInput"
                      label="UTI"
                      type="text"
                      fullwidth
                      variant="standard"
                      value={utrlInput}
                      onChange={(e) => setUtrlInput(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleUtrlSubmit}>Submit</Button>
                  </DialogActions>
                </Dialog>
              </RadioGroup>
            </FormControl>
            {/* Additional input fields based on payment method */}
            {PaymentMethod === "credit-debit" && (
              <TextField
                required
                margin="dense"
                id="cardNumber"
                name="cardNumber"
                label="Card Number"
                type="text"
                fullwidth
                variant="standard"
              />
            )}
            {PaymentMethod === "upi" && (
              <TextField
                required
                margin="dense"
                id="upiId"
                name="upiId"
                label="UPI ID"
                type="text"
                fullwidth
                variant="standard"
              />
            )}
            {PaymentMethod === "utrl" && (
              <TextField
                required
                margin="dense"
                id="utrlLink"
                name="utrlLink"
                label="UTR Link"
                type="text"
                fullwidth
                variant="standard"
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Dialog>
      </SoftBox>
      <SoftBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={8} ml={4}>
            <Card sx={{ height: "100%", boxShadow: "none" }}>
              <SoftBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                pt={2}
                px={2}
              >
                <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                  {`Holder Name :  ${user?.holder}`}
                  <br></br>
                  {`Account No :  ${user?.accountNo}`}
                  <br></br>
                  {`IFSC :  ${user?.IFSC}`}
                </SoftTypography>
              </SoftBox>
              <SoftBox p={2}>
                <SoftBox opacity={0.3}></SoftBox>
                <SoftBox>{`Bank Name : ${user?.bankName}`}</SoftBox>
              </SoftBox>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
    </Card>
  );
}

export default PaymentMethod;
