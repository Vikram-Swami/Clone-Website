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
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import Table from "examples/Tables/Table";
import { useSoftUIController, startLoading, setLoading } from "context";
import SoftInput from "components/SoftInput";
import React from "react";
import TeamView from "./data/team";
import ApiClient from "Services/ApiClient";
import { getMembers } from "Services/endpointes";
import { toast } from "react-toastify";
import { setMembers } from "context";
import { setDialog } from "context";

function Team() {
  const [controller, dispatch] = useSoftUIController();

  const { member, user } = controller;

  const getMember = async () => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.getData(getMembers);
      if(response.status == 200){setMembers(dispatch, response.data);}
      else{setDialog(dispatch, [response])}
    } catch (error) {
      toast.info(error.message);
      setLoading(dispatch, false);
    }
  };

  useEffect(() => {
    member?.length < 1 && getMember();
  }, []);

  let memoizedRows = TeamView.rows(member, dispatch, user);

  return (
    <DashboardLayout>
      <DashboardNavbar call={getMember}/>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card mb={2}>

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
                  </Card>
          <Card mt={2}>
            {/*  */}

            {member?.length > 0 ? (
              <Table columns={TeamView.columns} rows={memoizedRows} />
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

                          <NavLink to="/create-member">
                            <SoftButton variant="gradient" color="dark" ml={2}>
                              &nbsp;Add member
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
