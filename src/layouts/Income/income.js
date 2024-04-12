
// Next Work Dashboard React components
import SoftBox from "components/SoftBox";

// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import { Box, Grid } from "@mui/material";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

import { useEffect } from "react";
import { startLoading, useSoftUIController, setLoading } from "context";
import Table from "examples/Tables/Table";
import ApiClient from "Services/ApiClient";
import { toast } from "react-toastify";

import React from "react";
import { setIncome } from "context";
import usersView from "./data/income";
import { getIncomeByUserId } from "Services/endpointes";
import { setDialog } from "context";

function Income() {
  const [controller, dispatch] = useSoftUIController();

  const { income, user } = controller;
  
  const getIncomes = async () => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.getData(getIncomeByUserId, 0, 100);
      if(response.status == 200){
        setIncome(dispatch, response.data);
      }else{
        setDialog(dispatch, [response]);
      }
    } catch (error) {
      toast.info(error.toString());
      setLoading(dispatch, false);
    }
  };

  useEffect(() => {
    income.length < 1 && getIncomes();
  }, []);

  let memoizedRows = usersView.rows(income, user.fullName, dispatch);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3} mb={3}>


        {income?.length > 0 ? (
          <Box>
            <Table columns={usersView.columns} rows={memoizedRows} />

            {/* <SoftBox color="white" variant="gradient" py={2} width="100%">
              <Grid item alignItems="flex-end">
                <SoftTypography>1</SoftTypography>
              </Grid>
            </SoftBox> */}

          </Box>
        ) : (
          <SoftBox mt={4}>
            <SoftBox mb={1.5}>
              <Grid container spacing={3}>
                <Grid item lg={12}>
                  <Grid item container spacing={3}>
                    <Grid item xs={12} xl={12}>
                      <DefaultInfoCard
                        icon="cloud"
                        title={`You Don't have an active Income yet. Add connection to your portfolio and start earning.`}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </SoftBox>
          </SoftBox>
        )}
      </SoftBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Income;