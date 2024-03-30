// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useSoftUIController } from "context";
import ApiClient from "Services/ApiClient";
import { createConnections } from "Services/endpointes";
import React from "react";
import { setDialog } from "context";
import { setLoading } from "context";
import { toast } from "react-toastify";
import { getSourceByType } from "Services/endpointes";
import { useNavigate } from "react-router-dom";
import { setAccept } from "context";
import { setConnection } from "context";
function DefaultProductCard({ color, icon, storage, range, rent, basicAmt, tax, totalprice }) {
  const [controller, dispatch] = useSoftUIController();
  const { user, accept } = controller;
  const navigate = useNavigate();

  const createConnection = (storage) => async (accept) => {
    try {
      if (!accept) {
        toast.error("Please Accept Terms & conditions first.");
        return;
      }
      setLoading(dispatch, true);
      const response = await ApiClient.createData(createConnections, {
        userId: user.userId,
        storage: storage,
      });
      console.log(response);
      setDialog(dispatch, [response]);
      setConnection(dispatch, []);
      navigate("/connections");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(dispatch, false);
    }
  };

  const getTermsCondition = (storage) => async (form) => {
    try {
      setLoading(dispatch, true);
      const response = await ApiClient.getDataByParam(getSourceByType, "terms-condition");
      setDialog(dispatch, [
        {
          status: "form",
          title: "Please Accept Terms & Conditions",
          message: response?.data?.range,
          children: (
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => {
                    setAccept(dispatch, e.target.checked);
                  }}
                />
              }
              label="I Agree*"
            />
          ),
          action: "Agree & Buy",
          call: createConnection(storage),
        },
      ]);
    } catch (err) {
      toast.warn(err?.response?.data?.message);
      setLoading(dispatch, false);
    }
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

          <SoftBox display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <SoftTypography
                variant="h6"
                fontWeight="medium"
                textTransform="capitalize"
                textAlign="left"
              >
                Amount : {basicAmt * range}
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
              display="block"
              bgColor="green"
              color="info"
              shadow="md"
              height="0.001rem"
              sx={{ padding: "0 !important" }}
              borderRadius="md"
              variant="gradient"
              onClick={() =>
                setDialog(dispatch, [
                  {
                    status: "form",
                    title: "please confirm your purchase",
                    children: (
                      <Box>
                        <Typography
                          variant="h6"
                          fontWeight="medium"
                          textTransform="capitalize"
                          textAlign="left"
                        >
                          Basic Amount : {basicAmt}
                        </Typography>
                        <Typography
                          variant="h6"
                          fontWeight="medium"
                          textTransform="capitalize"
                          textAlign="left"
                        >
                          GST : {tax}%
                        </Typography>
                        <Typography
                          variant="h6"
                          fontWeight="medium"
                          textTransform="capitalize"
                          textAlign="left"
                        >
                          Total Payble : {totalprice}/-
                        </Typography>
                      </Box>
                    ),
                    call: getTermsCondition(range),
                    action: "Confirm",
                  },
                ])
              }
            >
              BUY
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
