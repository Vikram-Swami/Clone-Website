// @mui material components

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import { Box, Grid } from "@mui/material";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

import { useEffect } from "react";
import { startLoading, useSoftUIController, setLoading } from "context";
import Table from "examples/Tables/Table";
import ApiClient from "Services/ApiClient";
import { toast } from "react-toastify";
import React from "react";
import { getUserRewards } from "Services/endpointes";
import { setRewards } from "context";
import { setDialog } from "context";
import rewardView from "./data/reward";
import limitReward from "./data/limit";
import limitRewardView from "./data/limit";

function Rewards() {
  const [controller, dispatch] = useSoftUIController();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { rewards } = controller;
  const getAllRewards = async () => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.getData(getUserRewards);
      if (response.status == 200) {
        setRewards(dispatch, response.data);

        toast.success(response?.message);
      }
      setDialog(dispatch, [response]);
    } catch (error) {
      setLoading(dispatch, false);
      // toast.info(response.message);
    }
  };
  useEffect(() => {
    getAllRewards();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let memoizedRows = limitRewardView.rows(rewards, dispatch);
  let memoizedRowsReward = rewardView.rows(rewards, dispatch);

  return (
    <DashboardLayout>
      <DashboardNavbar call={getAllRewards} />
      <SoftBox py={3} mb={3}>
        {rewards?.length > 0 ? (
          rewards[0].type == "limit" ? (
            <Box>
              <Table columns={limitRewardView.columns} rows={memoizedRows} />
            </Box>
          ) : (
            <Box>
              <Table columns={rewardView.columns} rows={memoizedRowsReward} />
            </Box>
          )
        ) : (
          <SoftBox mt={4}>
            <SoftBox mb={1.5}>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={12}>
                  <DefaultInfoCard
                    icon="cloud"
                    title={`You Don't have an active Reward yet. Add connection to your portfolio and start earning.`}
                  />
                </Grid>
              </Grid>
            </SoftBox>
          </SoftBox>
        )}
      </SoftBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Rewards;
