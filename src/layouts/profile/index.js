// @mui material components
import Grid from "@mui/material/Grid";
// Next Work Dashboard React components
import SoftBox from "components/SoftBox";

// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import { useSoftUIController } from "context";

function Overview() {
  const [controller] = useSoftUIController();
  const { user } = controller;
  return (
    <DashboardLayout>
      <Header />
      <SoftBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={4}>
            <ProfileInfoCard
              title="profile information"
              info={{
                fullName: user?.fullName,
                description: "",
                mobile: user?.phone,
                email: user?.email,
                location: user?.city + " " + user?.state + " " + user?.country,
              }}
              action={{ route: "", tooltip: "Edit Profile" }}
            />
          </Grid>
        </Grid>
      </SoftBox>

      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Overview;
