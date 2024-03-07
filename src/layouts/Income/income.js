// @mui material components
import Card from "@mui/material/Card";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import { Grid } from "@mui/material";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

import { useEffect, useMemo } from "react";
import { useSoftUIController, setConnection, setLoading } from "context";
import Table from "examples/Tables/Table";
import connectionView from "layouts/connections/data/connections";
import ApiClient from "Services/ApiClient";
import { toast } from "react-toastify";
import { setDialog } from "context";
import { getConnectionByUserID } from "Services/endpointes";
import { startLoading } from "context";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";




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
        console.log(response);
      } else {
        setDialog(dispatch, [userData]);
      }
    } catch (error) {
      setLoading(dispatch, false);
      toast.error(error.response?.data?.message ?? "Oops! Network error occured!");
    }
  };
  const memoizedRows = useMemo(
    () => connectionView.rows(connection, user.fullName),
    [connection, user.fullName]
  );

  useEffect(() => {
    connection.length < 1 && getConnection();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Income Table</SoftTypography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker label="Date Range" />
                </DemoContainer>
              </LocalizationProvider>
              <SoftTypography></SoftTypography>
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
