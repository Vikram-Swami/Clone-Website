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

import { useEffect } from "react";
import Table from "examples/Tables/Table";
import ApiClient from "Services/ApiClient";
import { toast } from "react-toastify";
import { useSoftUIController, startLoading, setLoading } from "context";
import SoftInput from "components/SoftInput";
import React from "react";
import { setRent } from "context";
import { getRentByUserId } from "Services/endpointes";
import { setDialog } from "context";
import RewardSalaryView from "./data";
import RentOnRoyalityView from "./data";

function RentOnRoyality() {
  const [controller, dispatch] = useSoftUIController();

  const { rent } = controller;
  const getAllRents = async () => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.getData(getRentByUserId);
      if (response.status == 200) {
        setRent(dispatch, response.data);
      } else {
        setDialog(dispatch, [response]);
      }
    } catch (error) {
      toast.info(error.toString());
      setLoading(dispatch, false);
    }
  };
  useEffect(() => {
    rent.length < 1 && getAllRents();
  }, []);
  let memoizedRows = RentOnRoyalityView.rows(rent);

  return (
    <DashboardLayout>
      <DashboardNavbar call={getAllRents} />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Royality</SoftTypography>

              <SoftBox pr={1}>
                <SoftInput
                  placeholder="Enter Connection ID"
                  icon={{ component: "search", direction: "left" }}
                />
              </SoftBox>
            </SoftBox>

            {rent?.length > 0 ? (
              <Table columns={RentOnRoyalityView.columns} rows={memoizedRows} />
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

export default RentOnRoyality;
