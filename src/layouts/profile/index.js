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
import { useEffect } from "react";
import { setDialog } from "context";
import { completeProfile } from "api/users";
import { useNavigate } from "react-router-dom";

function Overview() {
  const [controller, dispatch] = useSoftUIController();
  const { user } = controller;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isVerified) {
      setDialog(dispatch, [{
        status: "form",
        title: "KYC Required!",
        message: "Kindly complete your KYC to access more features!",
        action: "Complete KYC",
        call: () => { completeProfile(dispatch, navigate) }
      }])
    }
  }, [user])
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
