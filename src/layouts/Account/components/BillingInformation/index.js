// @mui material components
import Card from "@mui/material/Card";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Bill from "../Bill";

// Billing page components

function BillingInformation() {
  return (
    <Card id="delete-account">
      <SoftBox pt={3} px={2} display={"flex"} justifyContent={"space-between"}>
        <SoftTypography variant="h6" fontWeight="medium">
          Account Information
        </SoftTypography>
      </SoftBox>
      <SoftBox pt={1} pb={2} px={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Bill/>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default BillingInformation;
