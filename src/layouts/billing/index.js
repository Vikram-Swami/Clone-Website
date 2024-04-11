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
import { Card, Checkbox, FormControlLabel, Icon, Table, TablePagination } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import usersView from "layouts/Income/data/income";
import BillingInformation from "./components/BillingInformation";
import Transactions from "./components/Transactions";

function Billing() {
  const [controller] = useSoftUIController();
  const { user } = controller;
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
              {/* <SoftBox py={3} pt={0}>
              <SoftBox mb={3}>
                <Card>
                  <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                    <SoftTypography variant="h6">All Transactions</SoftTypography> 
                  </SoftBox>
  
                  {Billing?.length > 0 ? (
                    <>
                      <Table columns={usersView.columns} rows={memoizedRows} />
                      <SoftBox mt={2} display="block" width={40}>
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
            </SoftBox> */}
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

              {Billing?.length > 0 ? (
                <>
                  <Table columns={usersView.columns} rows={memoizedRows} />
                  <SoftBox mt={2} display="block" width={40}>
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
      </SoftBox>
    </DashboardLayout>
  );
}

export default Billing;
