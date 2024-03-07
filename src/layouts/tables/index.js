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
import ApiClient from "Services/ApiClient";
import { getMembers } from "Services/endpointes";
import { setDialog } from "context";
import { toast } from "react-toastify";
import { setMembers } from "context";

function Team() {
  const [controller, dispatch] = useSoftUIController();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { member } = controller;

  const getMember = () => {
    startLoading(dispatch, true);
    try {
      const response = ApiClient.getData(getMembers);
      setMembers(dispatch, response.data);
      toast.success(response.message);
    } catch (error) {
      setLoading(dispatch, false);

      toast.info(error.message);
    }
  };

  useEffect(() => {
    member?.length < 1 && getMember();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let memoizedRows = TeamView.rows(member, dispatch);

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

            {member?.length > 0 ? (
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
                            title={`You Don't have an active connection yet. Add connection to your portfolio and start earning.`}
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
