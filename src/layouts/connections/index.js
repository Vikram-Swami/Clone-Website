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
import { NavLink } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useSoftUIController, setConnection, setLoading } from "context";
import Table from "examples/Tables/Table";
import connectionView from "layouts/connections/data/connections";
import ApiClient from "Services/ApiClient";
import { toast } from "react-toastify";
import { getConnectionByUserID } from "Services/endpointes";
import { startLoading } from "context";
import React from "react";
import { setDialog } from "context";

function Connections() {
  const [controller, dispatch] = useSoftUIController();
  const { connection, user } = controller;

  const getConnection = async () => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.getDataByParam(getConnectionByUserID, user.id);
      if (response.status == 200) {
        setConnection(dispatch, response.data);
      } else {
        setDialog(dispatch, [response]);
      }
    } catch (error) {
      toast.error(error.toString());
      setLoading(dispatch, false);
    }
  };
  const memoizedRows = useMemo(
    () => connectionView.rows(connection, user.fullName, dispatch, getConnection),
    [connection, user.fullName]
  );

  useEffect(() => {
    connection.length < 1 && getConnection();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar call={getConnection} />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">My Portfolio</SoftTypography>
              <NavLink to="/buy-cloud-storage">
                <SoftBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="2.5rem"
                  height="2.5rem"
                  bgColor="white"
                  shadow="sm"
                  borderRadius="50%"
                  position="absolute"
                  right="10px"
                  top="1.1rem"
                  zIndex={99}
                  color="dark"
                  sx={{ cursor: "pointer" }}>
                  <Icon fontSize="default" fontWeight="bold" color="inherit">
Buy
                  </Icon>
                </SoftBox>
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
                            title={`You Don't have a connection yet. Add connection to your portfolio and start earning.`}
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
