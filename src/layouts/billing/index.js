// @mui material components
import Grid from "@mui/material/Grid";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";

// Next Work Dashboard React components
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Billing page components
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";
import { useSoftUIController } from "context";

function Billing() {
  const [controller] = useSoftUIController();
  const { user } = controller;
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4}>
        <SoftBox mb={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard icon="account_balance_wallet" title="Wallet" value={user?.wallet} />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="currency_rupee
"
                    title="Withdrawal"
                    value={user?.earning}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard icon="People" title="Members" value={user?.member} />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard icon="storage" title="Own Storage" value={user?.ownStr} />
                </Grid>
                <Grid item xs={12}>
                  <PaymentMethod />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Invoices />
            </Grid>
          </Grid>
        </SoftBox>
        {/* <SoftBox my={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <BillingInformation />
            </Grid>
            <Grid item xs={12} md={5}>
              <Transactions />
            </Grid>
          </Grid>
        </SoftBox> */}
      </SoftBox>

    </DashboardLayout>
  );
}

export default Billing;
