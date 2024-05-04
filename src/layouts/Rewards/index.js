// @mui material components

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import { Box, Checkbox, FormControlLabel, Grid, TablePagination } from "@mui/material";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

import { useEffect, useMemo } from "react";
import { startLoading, useSoftUIController, setLoading } from "context";
import Table from "examples/Tables/Table";
import ApiClient from "Services/ApiClient";
import { toast } from "react-toastify";
import React from "react";
import { setIncome } from "context";

import { getIncomeByUserId } from "Services/endpointes";
import usersView from "layouts/Rewards/data/reward";

function Rewards() {
  const [controller, dispatch] = useSoftUIController();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { income, user } = controller;
  const getAllusers = async () => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.getData(getIncomeByUserId, 0, 100);
      if (response.status == 200) {
        setIncome(dispatch, response.data);
        toast.success(response?.message);
      }
      setLoading(dispatch, false);
    } catch (error) {
      setLoading(dispatch, false);
      toast.info(error.response?.data?.message ?? "Oops! Network error occured!");
    }
  };
  useEffect(() => {
    income.length < 1 && getAllusers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let memoizedRows = usersView.rows(income, user.fullName, dispatch);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3} mb={3}>
        {income?.length > 0 ? (
          <Box>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h5">Time Limit Rewards</SoftTypography>
            </SoftBox>
            <Table columns={usersView.columns} rows={memoizedRows} />

            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h5">Regular Rewards</SoftTypography>
            </SoftBox>
            <Table columns={usersView.columns} rows={memoizedRows} />

            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h5">Rewards & Salary</SoftTypography>
            </SoftBox>
            <Table columns={usersView.columns} rows={memoizedRows} />
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
                        title={`You Don't have an active Reward yet. Add connection to your portfolio and start earning.`}
                      />
                    </Grid>
                  </Grid>
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
