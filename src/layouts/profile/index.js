// @mui material components
import Grid from "@mui/material/Grid";
// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import ProfilesList from "examples/Lists/ProfilesList";
// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// Overview page components
import { useSoftUIController } from "context";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

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
        </Grid>
      </SoftBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Overview;
