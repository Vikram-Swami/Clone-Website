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
import { Box } from "@mui/material";
import { useSoftUIController } from "context";
import ApiClient from "Services/ApiClient";
import { createConnections } from "Services/endpointes";

function DefaultProductCard({ color, icon, storage, range, rent, basicAmt, tax, totalprice }) {
  const [controller] = useSoftUIController();

  const { user } = controller;
  const createConnection = async (storage) => {
    try {
      const response = await ApiClient.createData(createConnections, storage, user?.id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
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
            /<Icon fontSize="large">{icon}</Icon>
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
            bgColor={color}
            color="white"
            width="3rem"
            height="2rem"
            shadow="md"
            marginRight="2rem"
            borderRadius="lg"
            variant="gradient"
            onClick={() => createConnection(range)}
          >
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </Card>
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
