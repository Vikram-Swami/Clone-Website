// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Next Work Dashboard React base styles
import borders from "assets/theme/base/borders";

// Images
import masterCardLogo from "assets/images/logos/mastercard.png";
import visaLogo from "assets/images/logos/visa.png";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import { Divider } from "@mui/material";

function PaymentMethod() {
  const { borderWidth, borderColor } = borders;

  return (
    <Card id="delete-account">
      <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <SoftTypography variant="h4" fontWeight="medium">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Bank
        </SoftTypography>
        <SoftBox>
          <SoftButton variant="gradient" color="dark" style={{ marginRight: "20px" }}>
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
            &nbsp;add Money
          </SoftButton>

          <SoftButton variant="gradient" color="dark" ml={2}>
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
            &nbsp;Withdrawal
          </SoftButton>
        </SoftBox>
      </SoftBox>
      <SoftBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={8} ml={4}>
            <Card sx={{ height: "100%", boxShadow: "none" }}>
              <SoftBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                pt={2}
                px={2}
              >
                <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                  {"Holder Name :  Suraj Jha"}
                  <br></br>
                  {"Account No :  33210245564"}
                  <br></br>
                  {"IFSC :  SBINN45564"}
                </SoftTypography>
              </SoftBox>
              <SoftBox p={2}>
                <SoftBox opacity={0.3}></SoftBox>
                <SoftBox>{"Bank Name : SBI INDIA"}</SoftBox>
              </SoftBox>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
    </Card>
  );
}

export default PaymentMethod;
