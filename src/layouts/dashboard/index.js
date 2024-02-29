// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
// Next Work Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import { useSoftUIController } from "context";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import UserModel from "Models/User";
function Dashboard() {
  const [controller] = useSoftUIController();
  const { user } = controller;
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const newUser = new UserModel().toJson(user);

  const miniStatisticsData = [
    {
      title: { text: "Storage" },
      count: newUser?.ownStr ?? 0,
      percentage: { color: "success" },
      icon: { color: "info", component: "wallet" }
    },
    {
      title: { text: "Team size" },
      count: newUser?.members ?? 0,
      percentage: { color: "success" },
      icon: { color: "info", component: "groups" }
    },
    {
      title: { text: "Today earning" },
      count: newUser?.earning ?? 0,
      percentage: { color: "error" },
      icon: { color: "info", component: "currency_rupee" }
    }
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={2} justifyContent="center">
            {miniStatisticsData.map((data, index) => (
              <Grid key={index} item xs={12} sm={6} xl={3}>
                <MiniStatisticsCard {...data} />
              </Grid>
            ))}
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>

            <Grid item xs={12} lg={8} title="" >
              <ReportsBarChart

                chart={chart}
                items=""
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrderOverview />
            </Grid>
            <Grid item xs={12} lg={8}>
              <GradientLineChart
                title="Sales Overview"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      4% more{" "}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid>
        </SoftBox>
        {/* <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
        </Grid> */}
      </SoftBox >
    </DashboardLayout >
  );
}

export default Dashboard;
