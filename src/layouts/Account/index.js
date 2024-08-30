// @mui material components
import Grid from "@mui/material/Grid";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";

import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// Billing page components
import { useSoftUIController } from "context";
import { Box, Card } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import BillingInformation from "./components/BillingInformation";
import Transactions from "./components/Transactions";
import { getUserClaims } from "Services/endpointes";
import ApiClient from "Services/ApiClient";
import { useEffect } from "react";
import { startLoading } from "context";
import { toast } from "react-toastify";
import { setLoading } from "context";
import { setAchievement } from "context";
import { setDialog } from "context";
import achievementView from "./data/reward";
import Table from "examples/Tables/Table";

function Account() {
  const [controller, dispatch] = useSoftUIController();
  const { achievement } = controller;

  const getAchievements = async () => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.getData(getUserClaims);
      if (response.status == 200) {
        setAchievement(dispatch, response.data);
      } else {
        setDialog(dispatch, [response]);
      }
    } catch (error) {
      toast.info(error.toString());
      setLoading(dispatch, false);
    }
  };
  let memoizedRowsReward = achievementView.rows(achievement, dispatch);

  useEffect(() => {
    getAchievements();
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={5}>
        <SoftBox mb={1.5}>
          <Grid container justifyContent={"space-evenly"}>
            <Grid item xs={12} lg={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <BillingInformation />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={5}>
              <Transactions />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox py={3} pt={0} mt={4}>
          <SoftBox mb={3}>
            <Card>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SoftTypography variant="h6">My Achievement</SoftTypography>
              </SoftBox>

              {achievement?.length > 0 ? (
                <Box>
                  <Table columns={achievementView.columns} rows={memoizedRowsReward} />
                </Box>
              ) : (
                <SoftBox mt={4}>
                  <SoftBox mb={1.5}>
                    <Grid container spacing={3}>
                      <Grid item lg={12}>
                        <Grid item container spacing={3}>
                          <Grid item xs={12} xl={12}>
                            <DefaultInfoCard
                              icon="cloud"
                              title={`You Don't have an active achievement yet. Add connection to your portfolio and start earning.`}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </SoftBox>
                </SoftBox>
              )}
            </Card>
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Account;
