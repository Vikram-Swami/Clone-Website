// @mui material components
import Grid from "@mui/material/Grid";
// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// Billing page components
import { useSoftUIController } from "context";
import Transactions from "./components/Transactions";
import AccountInfo from "./components/Account";
import Income from "./components/Income";
import { getUser } from "api/users";
import Claims from "./components/Claimed";

function Account() {
  const [_, dispatch] = useSoftUIController();

  return (
    <DashboardLayout>
      <DashboardNavbar call={() => getUser(dispatch)} />
      <div className="mt20">
        <Grid container gap={1} justifyContent={"space-between"}>
          <Grid item xs={12} lg={5.7} mb={2}>
            <AccountInfo />
          </Grid>
          <Grid item xs={12} lg={6} mb={2}>
            <Transactions />
          </Grid>
          <Grid item xs={12} mb={2}>
            <Income />
          </Grid>
          <Grid item xs={12} mb={2}>
            <Claims />
          </Grid>
        </Grid>
      </div>
    </DashboardLayout>
  );
}

export default Account;
