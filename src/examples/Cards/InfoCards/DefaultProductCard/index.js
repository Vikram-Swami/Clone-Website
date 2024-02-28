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
  description,
  value,
  space,
  rent,
  basicAmt,
  tax,
  totalprice,
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
          <div style={{ textAlign: "center" }}>
            <Icon fontSize="large">{icon}</Icon>
            <div style={{ fontSize: "1.40rem", marginTop: "-10px" }}>512 GB</div>
          </div>
        </SoftBox>

        <Box>
          <SoftTypography variant="h6">Free Space : 16 GB</SoftTypography>

          <SoftTypography variant="h6">Rent : 4.5%</SoftTypography>
        </Box>
      </SoftBox>
      <SoftBox pb={2} px={2} textAlign="center" lineHeight={1.25}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SoftTypography>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {space}
        </SoftTypography>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {rent}
        </SoftTypography>

        {description && (
          <SoftTypography variant="caption" color="text" fontWeight="regular">
            {description}
          </SoftTypography>
        )}

        {description && !value ? null : <Divider />}
        {value && (
          <SoftTypography variant="h5" fontWeight="medium">
            {value}
          </SoftTypography>
        )}
        <SoftBox display="flex" justifyContent="space-between">
          <Box>
            <SoftTypography
              variant="h6"
              fontWeight="medium"
              textTransform="capitalize"
              textAlign="left"
            >
              {basicAmt}
            </SoftTypography>
            <SoftTypography
              variant="h6"
              fontWeight="medium"
              textTransform="capitalize"
              textAlign="left"
            >
              {tax}
            </SoftTypography>
            <SoftTypography
              variant="h6"
              fontWeight="medium"
              textTransform="capitalize"
              textAlign="left"
            >
              {totalprice}
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
            marginright="2rem"
            borderRadius="lg"
            alignSelf="center"
            variant="gradient"
          >
            <Icon sx={{ fontWeight: "bold" }}> add</Icon>
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Setting default values for the props of DefaultInfoCard
DefaultProductCard.defaultProps = {
  color: "info",
  value: "",
  description: "",
  space: "",
  rent: "",
  basicAmt: "",
  tax: "",
  totalprice: "",
};

// Typechecking props for the DefaultInfoCard
DefaultProductCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  space: PropTypes.string,
  rent: PropTypes.string,
  basicAmt: PropTypes.string,
  tax: PropTypes.string,
  totalprice: PropTypes.string,
};

export default DefaultProductCard;
