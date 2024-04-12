// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
// Next Work Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import { useSoftUIController } from "context";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import BuildByDevelopers from "./components/BuildByDevelopers";
import WorkWithTheRockets from "./components/WorkWithTheRockets";
import Projects from "./components/Projects";
import OrdersOverview from "./components/OrderOverview";
// import Countdown from "components/Countdown";

function Dashboard() {
  const [controller] = useSoftUIController();
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <Countdown targetDate={targetDate} /> */}
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
          <Grid container spacing={3}>
            {/* <Grid item xs={12} lg={7}>
              <BuildByDevelopers />
            </Grid> */}
            {/* <Grid item xs={12} md={6} lg={7}>
              <Projects />
            </Grid> */}
          </Grid>
        </SoftBox>
        {/* <SoftBox mb={3}>
          <Grid container spacing={3} style={{ display: "flex" }}>
            <Grid item xs={12} lg={6}>
              <ReportsBarChart chart={chart} items={[]} title="title" />
            </Grid>

            <Grid item xs={12} lg={6}>
              <GradientLineChart
                title="Team Expansion"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      4% more{" "}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                        in {new Date().getFullYear()}
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid>
        </SoftBox> */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={7}>
            <Projects />
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
