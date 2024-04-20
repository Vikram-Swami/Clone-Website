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

export default function Transaction({ amount, type }) {
  const [controller, dispatch] = useSoftUIController();
  const { user } = controller;

  const [openDialog, setOpenDialog] = useState(false);
  const [tnxId, setTnxId] = useState("");

  const handleRadioChange = (event) => {
    const selectedPaymentMethod = event.target.value;

    // If the selected payment method is "TnxId," open the dialog
    if (selectedPaymentMethod === "tnxId") {
      setOpenDialog(true);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogSubmit = () => {
    // Close the dialog
    setOpenDialog(false);
  };
  return (
    <>
      <FormControl required>
        <FormLabel id="demo-radio-buttons-group-label">Payment Method</FormLabel>
        <RadioGroup name="paymentMethod" required onChange={handleRadioChange}>
          <FormControlLabel
            value="creditDebit"
            control={<Radio />}
            label={
              <Box display="grid" gridTemplateColumns="3fr 1fr">
                <span>Credit/Debit Card</span>{" "}
                <Typography variant="caption" color="textSecondary">
                  (Coming Soon)
                </Typography>
              </Box>
            }
            disabled={true}
          />
          <FormControlLabel
            value="netbanking"
            control={<Radio />}
            label={
              <Box display="grid" gridTemplateColumns="3fr 1fr">
                <span>Netbanking</span>
                <Typography variant="caption" color="textSecondary">
                  (Coming Soon)
                </Typography>
              </Box>
            }
            disabled={true}
          />
          {type === "purchase" && (
            <>
              <FormControlLabel
                value="wallet"
                control={<Radio />}
                label={
                  <Box display="grid" gridTemplateColumns="2fr 1fr">
                    <span>Wallet - </span>
                    {parseInt(amount) > parseInt(user.wallet) && (
                      <Typography variant="caption" color="textSecondary">
                        (Unsufficient Balance)
                      </Typography>
                    )}
                  </Box>
                }
                disabled={parseInt(amount) > parseInt(user.wallet)}
              />
              <FormControlLabel
                value="tnxId"
                control={<Radio />}
                label={
                  <Box display="grid" gridTemplateColumns="3fr 1fr">
                    <span>UTI -</span>
                    <Typography variant="caption" color="textSecondary">
                      {"Enter Token"}
                    </Typography>
                  </Box>
                }
              />
            </>
          )}
        </RadioGroup>
      </FormControl>
      {
        <TextField
          margin="dense"
          id="tnxIdInput"
          label="UTI"
          type="text"
          fullWidth
          name="tnxId"
          variant="standard"
          value={tnxId}
          onChange={(e) => setTnxId(e.target.value)} // Update tnxId state here
        />
      }
      <Box display="block" textAlign="right">
        <Typography display="block" variant="caption" color="dark">
          Amount : ₹{amount}
        </Typography>
        <Typography fontSize={10} display="block" variant="caption" color="textSecondary">
          *Inclusive all taxes
        </Typography>
      </Box>
      {/* Dialog for entering transaction ID */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Enter Transaction ID</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

Transaction.defaultProps = {
  amount: 0,
  type: "purchase",
};

Transaction.propTypes = {
  amount: PropTypes.number,
  type: PropTypes.string,
};
