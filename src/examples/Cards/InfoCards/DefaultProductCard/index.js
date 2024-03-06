// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useSoftUIController } from "context";
import ApiClient from "Services/ApiClient";
import { createConnections } from "Services/endpointes";
import React from "react";
function DefaultProductCard({ color, icon, storage, range, rent, basicAmt, tax, totalprice }) {
  const [controller] = useSoftUIController();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const { user } = controller;
  const createConnection = async (storage) => {
    try {
      const response = await ApiClient.createData(createConnections, storage, user?.id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Terms And Conditions</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,

              )
              .join('\n')}
            <FormControlLabel
              control={<Checkbox />}
              label="I Agree"
              ml={2}
              style={{ marginLeft: '20px' }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div style={{ flex: 5 }} />
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
      <Card>
        <SoftBox pt={2} mx={1} mb={0} display="flex" alignItems="flex-end" justifyContent="center">
          <SoftBox
            display="grid"
            justifyContent="center"
            alignItems="center"
            bgColor={color}
            color="white"
            width="7rem"
            height="5rem"
            shadow="md"
            marginRight="15px"
            borderRadius="lg"
            variant="gradient"
          >
            <div style={{ textAlign: "center" }}>
              <Icon fontSize="large">{icon}</Icon>
              <div style={{ fontSize: "1.40rem", marginTop: "-10px" }}>{range} TB</div>
            </div>
          </SoftBox>

          <Box>
            <SoftTypography variant="h6">Free Space : {storage} GB</SoftTypography>

            <SoftTypography variant="h6">Rent : {rent}%</SoftTypography>
          </Box>
        </SoftBox>
        <SoftBox pb={2} px={2} textAlign="center" lineHeight={1.25}>
          <Divider />

          <SoftBox display="flex" justifyContent="space-between">
            <Box>
              <SoftTypography
                variant="h6"
                fontWeight="medium"
                textTransform="capitalize"
                textAlign="left"
              >
                Basic Amount : {basicAmt}
              </SoftTypography>
              <SoftTypography
                variant="h6"
                fontWeight="medium"
                textTransform="capitalize"
                textAlign="left"
              >
                GST : {tax}%
              </SoftTypography>
              <SoftTypography
                variant="h6"
                fontWeight="medium"
                textTransform="capitalize"
                textAlign="left"
              >
                Total Payble : {totalprice}/-
              </SoftTypography>
            </Box>
            <SoftButton
              display="grid"
              justifyContent="center"
              alignItems="center"
              bgColor="green"
              color="info"
              width="1.5rem !important"
              height="0.75rem !important"
              shadow="md"
              marginRight="2rem"
              borderRadius="lg"
              variant="gradient"
              onClick={() => createConnection(range)}
            >
              <SoftTypography onClick={handleClickOpen('paper')}>BUY</SoftTypography>
            </SoftButton>

          </SoftBox>
        </SoftBox>
      </Card>
    </>

  );
}

// Setting default values for the props of DefaultInfoCard
DefaultProductCard.defaultProps = {
  color: "info",
  space: "",
  rent: "",
  basicAmt: "",
  tax: "",
  totalprice: "",
  range: "",
  freeSpace: 0, // Add default value for freeSpace
};

// Typechecking props for the DefaultInfoCard
DefaultProductCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  storage: PropTypes.number,

  rent: PropTypes.number,
  basicAmt: PropTypes.number,
  tax: PropTypes.number,
  totalprice: PropTypes.number,
  range: PropTypes.number, // Adjust the type to number
};

export default DefaultProductCard;
