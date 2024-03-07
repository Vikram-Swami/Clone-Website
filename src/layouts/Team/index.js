// @mui material components
import Card from "@mui/material/Card";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import SoftButton from "components/SoftButton";
import { Checkbox, FormControlLabel, Grid, Icon, TablePagination } from "@mui/material";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import Table from "examples/Tables/Table";
import { useSoftUIController, startLoading, setLoading, setTeam } from "context";
import SoftInput from "components/SoftInput";
import React from "react";
import TeamView from "./data/team";

function Team() {
  const [controller, dispatch] = useSoftUIController();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { users } = controller;

  useEffect(() => {
    users?.length < 1 && getAllTeam();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let memoizedRows = TeamView.rows(users, dispatch);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">My Team</SoftTypography>

              <FormControlLabel control={<Checkbox />} label="List" />
              <FormControlLabel control={<Checkbox />} label="Tree" />

              <SoftBox pr={1}>
                <SoftInput
                  placeholder="Enter Connection Id"
                  icon={{ component: "search", direction: "left" }}
                />
              </SoftBox>
            </SoftBox>

            {users?.length > 0 ? (
              <>
                <Table columns={TeamView.columns} rows={memoizedRows} />
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
                <SoftBox mb={1.5} sx={{ display: "flex", justifyContent: "center" }}>
                  <Grid container spacing={3}>
                    <Grid item lg={12}>
                      <Grid item container spacing={3}>
                        <Grid
                          item
                          xs={12}
                          xl={12}
                          sx={{
                            display: "flex",
                            gap: "20px",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <DefaultInfoCard
                            sx={{ height: "400px" }}
                            icon="cloud"
                            title={`You Don't have a member in you team yet. Increase team size to earn more.`}
                          />

                          <NavLink to="/new_connections">
                            <SoftButton variant="gradient" color="dark" ml={2}>
                              <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                              &nbsp;Start Earning
                            </SoftButton>
                          </NavLink>
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

export default Team;
