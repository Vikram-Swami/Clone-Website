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
import { Grid, Icon } from "@mui/material";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useSoftUIController, setConnection, setLoading } from "context";
import Table from "examples/Tables/Table";
import connectionView from "layouts/tables/data/connections";
import ApiClient from "Services/ApiClient";
import { toast } from "react-toastify";
import { setDialog } from "context";
import { getConnectionByUserID } from "Services/endpointes";
import { startLoading } from "context";

function Connections() {
  const [controller, dispatch] = useSoftUIController();
  const { connection, user } = controller;

  const getConnection = async () => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.getData(getConnectionByUserID);
      if (response?.status === 200) {
        setConnection(dispatch, response.data);
        toast.success(response?.message);
        setLoading(dispatch, false);
      } else {
        setDialog(dispatch, [userData])
      }
    } catch (error) {
      setLoading(dispatch, false);
      toast.error(error.response?.data?.message ?? "Oops! Something went wrong, please try later");
    }
  };
  const memoizedRows = useMemo(
    () => connectionView.rows(connection, user.fullName),
    [connection, user.fullName]
  );

  useEffect(() => {
    getConnection();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">My Connections</SoftTypography>
              <NavLink to="/products">
                {" "}
                <SoftButton variant="gradient" color="dark" ml={2}>
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;Create Connections
                </SoftButton>
              </NavLink>
            </SoftBox>

            {connection.length > 0 ? (
              <Table columns={connectionView.columns} rows={memoizedRows} />
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

export default Connections;
