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
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { BeachAccess, Diversity3, Image, Work } from "@mui/icons-material";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// import Countdown from "components/Countdown";

function Dashboard() {
  const [controller, dispatch] = useSoftUIController();
  const { user, member, directMember } = controller;
  // const targetDate = new Date("2024-12-31T23:59:59");

  const miniStatisticsData = [
    {
      title: { text: "My Storage" },
      count: user?.ownStr ?? 0,
      percentage: { color: "success" },
      icon: { color: "info", component: "storage" },
    },

    {
      title: { text: "My Earnings" },
      count: user?.earning ?? 0,
      percentage: { color: "error" },
      icon: { color: "info", component: "currency_rupee" },
    },
    {
      title: { text: "My Team size" },
      count: member.length ?? 0,
      percentage: { color: "success" },
      icon: { color: "info", component: "groups" },
    },
    {
      title: { text: "Team Storage" },
      count: user.memStr ?? 0,
      percentage: { color: "error" },
      icon: { color: "info", component: "storage" },
    },
  ];

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

        <Grid container spacing={3} style={{ height: "400px !important", overflow: "hidden" }}>
          <Grid item xs={12} md={12} lg={7} style={{ height: "100%", overflow: "scroll" }}>
            {directMember && directMember.length > 0 ? <Card>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SoftBox>
                  <SoftTypography variant="h6" gutterBottom textTransform="uppercase">
                    My Power Legs
                  </SoftTypography>
                  <SoftBox display="flex" alignItems="center" lineHeight={0}>
                    <Diversity3 />
                    <SoftTypography variant="button" fontWeight="regular" color="text" textTransform="uppercase">
                      &nbsp;<strong> {directMember.length ?? 0} Power Legs</strong>
                    </SoftTypography>
                  </SoftBox>
                </SoftBox>
                <NavLink to="/my-team">
                  {" "}
                  <SoftButton
                    bgColor="white"
                    shadow="sm"
                    fontSize="1rem"
                    zIndex={99}
                    color="dark"
                    sx={{ cursor: "pointer" }}>
                    <Icon fontSize="1rem">
                      visibility
                    </Icon>
                    &nbsp;
                    Team
                  </SoftButton>
                </NavLink>
              </SoftBox>
              <List sx={{ width: '100%', padding: "0 20px 20px", color: "white" }}>
                {
                  directMember.map((e) =>
                    <><ListItem >
                      <ListItemAvatar>
                        <Avatar>
                          <Image />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText color="white" fontSize="0.9rem" primary={e.name} secondary={<>
                        <Typography
                          component="p"
                          variant="body3"
                          color="text.primary"
                        >
                          <strong>Own Storage:</strong> {e.storage} TB
                        </Typography>
                        <strong>Joined At:</strong>{e.createdAt}
                      </>} />
                    </ListItem>
                      <Divider sx={{ height: "3px", color: "white", background: "white" }} orientation="horizontal" /></>
                  )
                }
              </List>
            </Card> :
              <Grid item xs={12} md={12} lg={7} style={{ height: "100%", overflow: "scroll" }}><DefaultInfoCard
                icon="cloud"
                title={`It's seems you didn't refer any member yet. You know you can earn more by refering someone.`}
              /></Grid>

            }
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
