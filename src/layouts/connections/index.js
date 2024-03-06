// @mui material components
import Card from "@mui/material/Card";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import SoftButton from "components/SoftButton";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
} from "@mui/material";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { NavLink } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useSoftUIController, setConnection, setLoading } from "context";
import Table from "examples/Tables/Table";
import connectionView from "layouts/connections/data/connections";
import ApiClient from "Services/ApiClient";
import { toast } from "react-toastify";
import { setDialog } from "context";
import { getConnectionByUserID } from "Services/endpointes";
import { startLoading } from "context";
import React from "react";
import PaymentMethod from "layouts/billing/components/PaymentMethod";

function Connections() {
  const [controller, dispatch] = useSoftUIController();
  const { connection, user } = controller;

  const getConnection = async () => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.getData(getConnectionByUserID);
      if (response?.status === 200) {
        setConnection(dispatch, response.data);
        toast.success(response?.message);
        setLoading(dispatch, false);
        console.log(response);
      } else {
        setDialog(dispatch, [userData]);
      }
    } catch (error) {
      setLoading(dispatch, false);
      toast.error(error.response?.data?.message ?? "Oops! Something went wrong, please try later");
    }
  };
  const memoizedRows = useMemo(
    () => connectionView.rows(connection, user.fullName),
    [connection, user.fullName]
  );
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

  useEffect(() => {
    connection.length < 1 && getConnection();
  }, []);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DashboardLayout>
      <></>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">My Connections</SoftTypography>
              <Button variant="outlined" onClick={handleClickOpen}>
                Open payment dialog
              </Button>
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
                <DialogTitle>Payment</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please select your payment method and enter the required details.
                  </DialogContentText>
                  <FormControl component="fieldset" margin="dense">
                    <FormLabel component="legend">Payment Method</FormLabel>
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
                            fullWidth
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
                      fullWidth
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
                      fullWidth
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
                      fullWidth
                      variant="standard"
                    />
                  )}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit">Submit</Button>
                </DialogActions>
              </Dialog>
              <NavLink to="/new-connections">
                {" "}
                <SoftButton variant="gradient" color="dark" ml={2}>
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;Add New
                </SoftButton>
              </NavLink>
            </SoftBox>

            {connection.length > 0 ? (
              <Table columns={connectionView.columns} rows={memoizedRows} />
            ) : (
              <SoftBox mt={4}>
                <SoftBox mb={1.5}>
                  <Grid container spacing={3}>
                    <Grid item lg={12}>
                      <Grid item container spacing={3}>
                        <Grid item xs={12} xl={12}>
                          <DefaultInfoCard
                            icon="cloud"
                            title={`You Don't have a connection yet. Add connection to your portfolio and start earning.`}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </SoftBox>
              </SoftBox>
            )}
          </Card>
        </SoftBox>
      </SoftBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Connections;
