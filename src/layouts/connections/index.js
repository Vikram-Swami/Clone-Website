// @mui material components
import Card from "@mui/material/Card";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import SoftButton from "components/SoftButton";
import { Grid, Icon } from "@mui/material";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

import { NavLink, useNavigate } from "react-router-dom";

function Connections() {
  const navigate = useNavigate();
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Connection table</SoftTypography>
              <NavLink to="/products"> <SoftButton variant="gradient" color="dark" ml={2} >
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp;Create Connections
              </SoftButton>
              </NavLink>
            </SoftBox>
            <SoftBox mt={4}>
              <SoftBox mb={1.5}>
                <Grid container spacing={3} >
                  <Grid item lg={12}>
                    <Grid container spacing={3}>

                      <Grid xs={12} xl={12}>
                        <DefaultInfoCard icon="cloud" title={`You Don't have an active connection yet. Add connection to your portfolio and start earning.`} />
                      </Grid>

                    </Grid>
                  </Grid>
                </Grid>
              </SoftBox>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Connections;
