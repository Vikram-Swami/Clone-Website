import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";

import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField";
import { useSoftUIController } from "context";
import PropTypes from "prop-types";

export default function AccountPaymentView({ amount, id }) {

  return (
    <>
      <FormControl required>
        <Typography style={{ fontWeight: "bold", textAlign: "center" }}>Wallet: {amount}</Typography>
      </FormControl>

        <TextField
          margin="dense"
          id="amountInput"
          label="Enter Amount to Withdraw.."
          type="text"
          fullWidth
          name="amount"
          variant="standard"
        />
    </>
  );
}

AccountPaymentView.propTypes = {
  amount: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};
