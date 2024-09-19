import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { FormLabel } from "@mui/material";

export default function Withdraw({ amount }) {

  return (
    <>
        <FormLabel style={{ fontWeight: "bold", textAlign: "center" }}>Current Balance: {amount}</FormLabel>

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

Withdraw.propTypes = {
  amount: PropTypes.number.isRequired,
};
