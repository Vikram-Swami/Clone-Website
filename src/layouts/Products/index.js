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

function Products() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4}>
        <SoftBox mb={1.5}>
          <Grid container spacing={3} justifyContent={"space-around"}>
            <Grid item xs={12} lg={10}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} xl={4}>
                  <DefaultInfoCard icon="cloud" title="Storage : 512 GB" value="5581.00" />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DefaultInfoCard icon="cloud" title="Storage : 1 TB" value="455.00" />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DefaultInfoCard icon="cloud" title="Storage : 2 TB" value="5455.00" />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DefaultInfoCard icon="cloud" title="Storage : 5 TB" value="$455.00" />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DefaultInfoCard icon="cloud" title="Storage : 10 TB" value="$455.00" />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DefaultInfoCard icon="cloud" title="Storage : 20 TB" value="$455.00" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Products;
