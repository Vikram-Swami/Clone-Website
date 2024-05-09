import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { useSoftUIController } from "context";
import PropTypes from "prop-types";
import { setDialog, setLoading } from "context";
import ApiClient from "Services/ApiClient";
import { createTransactions } from "Services/endpointes";

export default function AccountPaymentView({ amount, id }) {
  const [controller, dispatch] = useSoftUIController();
  const { user } = controller;
  const [tnxId, setTnxId] = useState("");
  const [type, setType] = useState("");

  const handleRadioChange = (event) => {
    const selectedType = event.target.value;
    setType(selectedType);
    if (selectedType === "wallet") {
      setDialog(dispatch, [
        {
          status: "form",
          title: "Please select payment method",
          message: `Connection -  TB`,
          action: "Pay Now",
          call: () => withDraw(),

          children: (
            <TextField
              margin="dense"
              id="amountInput"
              label="Amount"
              type="text"
              fullWidth
              name="withdraw"
              variant="standard"
            />
          ),
        },
      ]);
    }
  };

  const withDraw = async () => {
    const amountInput = document.getElementById("amountInput");
    const amount = amountInput.value;

    setLoading(dispatch, true);

    try {
      const response = await ApiClient.createData(createTransactions, {
        amount: parseFloat(amount),
        type: "withdraw",
        userId: id,
        paymentMethod: "tnxId",
      });

      setDialog(dispatch, [response]);
    } catch (error) {
      setLoading(dispatch, false);
      console.error(error);
    }
  };

  return (
    <>
      <FormControl required>
        <FormLabel>
          <span style={{ fontWeight: "bold" }}>Balance:</span> {amount}
        </FormLabel>
        <RadioGroup name="type" required value={type} onChange={handleRadioChange}>
          <>
            <FormControlLabel value="add" control={<Radio />} label="Add" />
            <FormControlLabel value="wallet" control={<Radio />} label="Withdraw" />
            <FormControlLabel value="transfer" control={<Radio />} label="Transfer" />
          </>
        </RadioGroup>
      </FormControl>

      {type === "tnxId" && (
        <TextField
          margin="dense"
          id="tnxIdInput"
          label="Enter UTI"
          type="text"
          fullWidth
          name="tnxId"
          variant="standard"
          value={tnxId}
          onChange={(e) => setTnxId(e.target.value)}
        />
      )}

      {(type === "add" || type === "transfer" || type === "wallet") && (
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

      {type === "transfer" && (
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
      {type === "add" && (
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
    </>
  );
}

AccountPaymentView.propTypes = {
  amount: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};
