// @mui material components
import Grid from "@mui/material/Grid";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";

import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Billing page components
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import { useSoftUIController } from "context";
import { Card, Checkbox, FormControlLabel, Icon, Table, TablePagination } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";

function Billing() {
  const [controller] = useSoftUIController();
  const { user } = controller;
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4}>
        <SoftBox mb={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                {/* <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="account_balance_wallet"
                    title="Wallet"
                    value={user?.wallet}
                  />
                </Grid> */}
                {/* <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="currency_rupee"
                    title="Withdraw"
                    value={user?.earning}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard icon=" groups_icon ;" title="Members" value={user?.member} />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard icon="storage" title="Own Storage" value={user?.ownStr} />
                </Grid> */}
                <Grid item xs={6}>
                  <PaymentMethod />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox py={3}>
          <SoftBox mb={3}>
            <Card>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SoftTypography variant="h6">All Transactions</SoftTypography>

                <FormControlLabel control={<Checkbox />} label="Withdraw" />
                <FormControlLabel control={<Checkbox />} label="Add" />
                <FormControlLabel control={<Checkbox />} label="Purchase" />

                <SoftBox pr={1}>
                  <SoftInput
                    placeholder="Enter ID"
                    icon={{ component: "search", direction: "left" }}
                  />
                </SoftBox>
              </SoftBox>

              {Billing?.length > 0 ? (
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
      </SoftBox>
    </DashboardLayout>
  );
}

export default Billing;
