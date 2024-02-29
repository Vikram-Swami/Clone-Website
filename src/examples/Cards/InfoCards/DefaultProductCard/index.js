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

function DefaultProductCard({
  color,
  icon,
  title,
  space,
  range,
  rent,
  basicAmt,
  tax,
  totalprice,
  freeSpace, // Add freeSpace to props
}) {
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
          <div style={{ textAlign: "center" }}>/
            <Icon fontSize="large">{icon}</Icon>
            <div style={{ fontSize: "1.40rem", marginTop: "-10px" }}>{range} TB</div>
          </div>
        </SoftBox>

        <Box>
          <SoftTypography variant="h6">Free Space : {freeSpace} GB</SoftTypography>

          <SoftTypography variant="h6"> {rent}%</SoftTypography>
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
              {" "}
              {basicAmt}
            </SoftTypography>
            <SoftTypography
              variant="h6"
              fontWeight="medium"
              textTransform="capitalize"
              textAlign="left"
            >
              {tax}%
            </SoftTypography>
            <SoftTypography
              variant="h6"
              fontWeight="medium"
              textTransform="capitalize"
              textAlign="left"
            >
              {totalprice}/-
            </SoftTypography>
          </Box>
          <SoftBox
            display="grid"
            justifyContent="center"
            alignItems="center"
            bgColor={color}
            color="white"
            width="3rem"
            height="2rem"
            shadow="md"
            marginRight="2rem" // Corrected property name
            borderRadius="lg"
            alignSelf="center"
            variant="gradient"
          >
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          </SoftBox>
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
  title: PropTypes.string.isRequired,
  rent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  space: PropTypes.string,
  rent: PropTypes.string,
  basicAmt: PropTypes.string,
  tax: PropTypes.string,
  totalprice: PropTypes.string,
  freeSpace: PropTypes.number, // Adjust the type to number
  range: PropTypes.number, // Adjust the type to number
};

export default DefaultProductCard;
