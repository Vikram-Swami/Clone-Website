// @mui material components
import Card from "@mui/material/Card";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";

// Billing page components
import Bill from "layouts/billing/components/Bill";
import { NavLink } from "react-router-dom";

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
          <Bill
            name="oliver liam"
            company="viking burrito"
            email="oliver@burrito.com"
            vat="FRB1235476"
          />
       
        
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default BillingInformation;
