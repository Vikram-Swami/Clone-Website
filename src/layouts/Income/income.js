// @mui material components
import Card from "@mui/material/Card";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import { Checkbox, FormControlLabel, Grid, TablePagination } from "@mui/material";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

<<<<<<< HEAD
import { NavLink } from "react-router-dom";
import { useEffect, useMemo } from "react";
=======
import { useEffect } from "react";
>>>>>>> c799f7f18dce2144774e8f48c636f971ee9902e5
import Table from "examples/Tables/Table";
import ApiClient from "Services/ApiClient";
import { toast } from "react-toastify";
import { useSoftUIController, startLoading, setLoading } from "context";
import SoftInput from "components/SoftInput";
import React from "react";
import { setIncome } from "context";
import usersView from "./data/income";
import { getIncomeByUserId } from "Services/endpointes";

function Income() {
  const [controller, dispatch] = useSoftUIController();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { income } = controller;
  const getAllusers = async () => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.getData(getIncomeByUserId, 0, 100);
      setIncome(dispatch, response.data);
      toast.success(response?.message);
    } catch (error) {
      setLoading(dispatch, false);
      toast.error(error.response?.data?.message ?? "Oops! Something went wrong, please try later");
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

  let memoizedRows = usersView.rows(income, dispatch, getAllusers);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Income Table</SoftTypography>

              <FormControlLabel control={<Checkbox />} label="Paid" />
              <FormControlLabel control={<Checkbox />} label="Pending" />

              <SoftBox pr={1}>
                <SoftInput
                  placeholder="Enter user ID"
                  icon={{ component: "search", direction: "left" }}
                />
              </SoftBox>
            </SoftBox>

            {income?.length > 0 ? (
              <>
                <Table columns={usersView.columns} rows={memoizedRows} />
                <SoftBox mt={2} display="block" width={90}>
                  <TablePagination
                    component="span"
                    count={100}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </SoftBox>
              </>
            ) : (
              <SoftBox mt={4}>
                <SoftBox mb={1.5}>
                  <Grid container spacing={3}>
                    <Grid item lg={12}>
                      <Grid item container spacing={3}>
                        <Grid item xs={12} xl={12}>
                          <DefaultInfoCard
                            icon="cloud"
                            title={`You Don't have an active connection yet. Add connection to your portfolio and start earning.`}
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
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Income;
