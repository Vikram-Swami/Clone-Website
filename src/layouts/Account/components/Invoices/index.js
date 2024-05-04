// @mui material components
import Card from "@mui/material/Card";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Billing page components
import Invoice from "layouts/billing/components/Invoice";
import SoftInput from "components/SoftInput";

function Invoices() {
  return (
    <Card id="delete-account" sx={{ height: "100%" }}>
      <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <SoftTypography variant="h6" fontWeight="medium">
          Invoices
        </SoftTypography>
        <SoftBox pr={1}>
          <SoftInput
            placeholder="Enter Transaction  ID"
            icon={{ component: "search", direction: "left" }}
          />
        </SoftBox>
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Invoice date="March, 01, 2020" id="#MS-415646" price="" />
          <Invoice date="February, 10, 2021" id="#RV-126749" price="" />
          <Invoice date="April, 05, 2020" id="#QW-103578" price="" />
          <Invoice date="June, 25, 2019" id="#MS-415646" price="" />
          <Invoice date="March, 01, 2019" id="#AR-803481" price="" noGutter />
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default Invoices;
