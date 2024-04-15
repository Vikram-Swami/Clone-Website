// @mui material components
import Grid from "@mui/material/Grid";
// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import ProfilesList from "examples/Lists/ProfilesList";
// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Card from "@mui/material/Card";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
// Overview page components
import { useSoftUIController } from "context";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { NavLink } from "react-router-dom";
import SoftButton from "components/SoftButton";

function Overview() {
  const [controller] = useSoftUIController();
  const { user } = controller;
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={5} mb={3}>
        <Grid container spacing={3} display={"flex"} justifyContent={"center"}>
          <Grid item xs={12} xl={12}>
            <ProfilesList title="conversations" />
          </Grid>
          {/* <Grid item xs={12} md={6} xl={8}>
            <ProfileInfoCard
              title="Address information"
              info={{
                street1: user?.street1,
                street2: user?.street2,
                city: user?.city,
                state: user?.state,
                country: user?.country,
              }}
              action={{ route: "/dashboard", tooltip: "Edit Profile" }}
            />
          </Grid> */}
        </Grid>
      </SoftBox>

      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Overview;
