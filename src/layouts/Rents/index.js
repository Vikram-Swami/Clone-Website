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
import ApiClient from "Services/ApiClient";
import { toast } from "react-toastify";
import { useSoftUIController, startLoading, setLoading } from "context";
import SoftInput from "components/SoftInput";
import React from "react";
import { getRents } from "Services/endpointes";
import RentForm from "./form";
import RentView from "./data/rents";
import { setRent } from "context";
import { setDialog } from "context";
import { createRent } from "Services/endpointes";

function Users() {
  const [controller, dispatch] = useSoftUIController();
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { rent } = controller;
  const getAllRents = async () => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.getDataWithPagination(getRents, 0, 100);
      setRent(dispatch, response.data);
      toast.success(response?.message);
    } catch (error) {
      setLoading(dispatch, false);
      toast.error(error.response?.data?.message ?? "Oops! Something went wrong, please try later");
    }
  };
  useEffect(() => {
    rent.length < 1 && getAllRents();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const addRent = async (formData) => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.createData(createRent, formData);
      if (response.status === 200) {
        getAllRents();
        setDialog(dispatch, [response]);
      } else {
        setDialog(dispatch, [response]);
      }
    } catch (error) {
      setDialog(dispatch, [error?.response?.data]);
      // toast.error(error?."Failed to add source. Please try again later.");
    }
  };
  let memoizedRows = RentView.rows(rent, dispatch, getAllRents);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">All Users</SoftTypography>

              <SoftBox pr={1}>
                <SoftInput
                  placeholder="Enter Connection ID"
                  icon={{ component: "search", direction: "left" }}
                />
              </SoftBox>
            </SoftBox>

            {rent?.length > 0 ? (
              <>
                <Table columns={RentView.columns} rows={memoizedRows} />
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
                            title={`You Don't have an active Rent yet. Add connection to your portfolio and start getting rent every month.`}
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

export default Users;
