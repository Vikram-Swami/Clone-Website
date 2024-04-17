// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";
// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
// Next Work Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import { useSoftUIController } from "context";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import WorkWithTheRockets from "./components/WorkWithTheRockets";
import OrdersOverview from "./components/OrderOverview";
import Table from "examples/Tables/Table";
import MyTeamView from "./data/team";
import { NavLink } from "react-router-dom";
import SoftButton from "components/SoftButton";
// import Countdown from "components/Countdown";

function Dashboard() {
  const [controller, dispatch] = useSoftUIController();
  const { user, member } = controller;
  const { size } = typography;
  const { chart } = reportsBarChartData;
  // const targetDate = new Date("2024-12-31T23:59:59");
  const miniStatisticsData = [
    {
      title: { text: "My Storage" },
      count: user?.ownStr ?? 0,
      percentage: { color: "success" },
      icon: { color: "info", component: "storage" },
    },
    {
      title: { text: "My Team size" },
      count: member.length ?? 0,
      percentage: { color: "success" },
      icon: { color: "info", component: "groups" },
    },
    {
      title: { text: "My Earnings" },
      count: user?.earning ?? 0,
      percentage: { color: "error" },
      icon: { color: "info", component: "currency_rupee" },
    },
    {
      title: { text: "My Earnings" },
      count: user?.earning ?? 0,
      percentage: { color: "error" },
      icon: { color: "info", component: "currency_rupee" },
    },
  ];

  let memoizedRows = MyTeamView.rows(member, dispatch, user);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={2}>
            {miniStatisticsData.map((data, index) => (
              <Grid key={index} item xs={12} sm={6} lg={3}>
                <MiniStatisticsCard {...data} />
              </Grid>
            ))}
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}></Grid>
        </SoftBox>

        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={7}>
            <Card>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SoftBox>
                  <SoftTypography variant="h6" gutterBottom>
                    My Direct Team
                  </SoftTypography>
                  <SoftBox display="flex" alignItems="center" lineHeight={0}>
                    <Icon
                      sx={{
                        fontWeight: "bold",
                        color: ({ palette: { info } }) => info.main,
                        mt: -0.5,
                      }}
                    >
                      done
                    </Icon>
                    <SoftTypography variant="button" fontWeight="regular" color="text">
                      &nbsp;<strong> {member.length ?? 0} Direct Team</strong>
                    </SoftTypography>
                  </SoftBox>
                </SoftBox>
                <NavLink to="/my-team">
                  {" "}
                  <SoftButton variant="gradient" color="dark" ml={2}>
                    &nbsp;View More
                  </SoftButton>
                </NavLink>
              </SoftBox>
              <Table rows={memoizedRows} columns={MyTeamView.columns} />
            </Card>
          </Grid>
          <Grid item xs={12} lg={5}>
            <Grid item xs={12} lg={12} mb={3}>
              <WorkWithTheRockets />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Dashboard;
