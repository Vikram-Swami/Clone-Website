import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { useSoftUIController } from "context";
import { PropTypes } from "prop-types";
import { Box, Button } from "@mui/material";

export default function AccountPaymentView({ amount, type }) {
  const [controller, dispatch] = useSoftUIController();
  const { user } = controller;
  const [tnxId, setTnxId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleRadioChange = (event) => {
    const selectedPaymentMethod = event.target.value;
    setPaymentMethod(selectedPaymentMethod);
  };

  return (
    <>
      <FormControl required>
        <FormLabel id="demo-radio-buttons-group-label">Payment Method </FormLabel>
        <RadioGroup
          name="paymentMethod"
          required
          value={paymentMethod}
          onChange={handleRadioChange}
        >
          {type === "purchase" && (
            <>
              <FormControlLabel value="add" control={<Radio />} label="Add" />
              <FormControlLabel value="wallet" control={<Radio />} label="Wallet" />
              <FormControlLabel value="transfer" control={<Radio />} label="Transfer" />
            </>
          )}
        </RadioGroup>
      </FormControl>

      {paymentMethod === "tnxId" && (
        <TextField
          margin="dense"
          id="tnxIdInput"
          label="Enter UTI"
          type="text"
          fullWidth
          name="tnxId"
          variant="standard"
          value={tnxId}
          onChange={(e) => setTnxId(e.target.value)} // Update tnxId state here
        />
      )}

      {(paymentMethod === "add" || paymentMethod === "transfer" || paymentMethod === "wallet") && (
        <TextField
          margin="dense"
          id="amountInput"
          label="Amount"
          type="text"
          fullWidth
          name="amount"
          variant="standard"
        />
      )}

      {paymentMethod === "transfer" && (
        <TextField
          margin="dense"
          id="userIdInput"
          label="User Id"
          type="text"
          fullWidth
          name="userId"
          variant="standard"
        />
      )}
      {paymentMethod === "add" && (
        <TextField
          margin="dense"
          id="userIdInput"
          label="UTI"
          type="text"
          fullWidth
          name="userId"
          variant="standard"
        />
      )}

      <Box display="block" textAlign="right">
        <Typography display="block" variant="caption" color="dark">
          Amount : ₹{amount}
        </Typography>
        <Typography fontSize={10} display="block" variant="caption" color="textSecondary">
          *Inclusive all taxes
        </Typography>
      </Box>
    </>
  );
}
AccountPaymentView.propTypes = {
  amount: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};
