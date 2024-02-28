// @mui material components
import { Icon } from "@mui/material";
import Grid from "@mui/material/Grid";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import DefaultProductCard from "examples/Cards/InfoCards/DefaultProductCard";

// Next Work Dashboard React components
import DefaultProdcutCard from "examples/Cards/InfoCards/DefaultProductCard";

// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Billing page components

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
                  <DefaultProductCard
                    icon="cloud"
                    basicAmt="Unit Price (TB) : 32500"
                    tax="Tax : 18%"
                    totalprice="Total Price : 450012"
                  />
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
