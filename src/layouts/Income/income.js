// Next Work Dashboard React components
import SoftBox from "components/SoftBox";

// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import { Box, Grid, Icon, Menu, MenuItem } from "@mui/material";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

import { useEffect, useState } from "react";
import { startLoading, useSoftUIController, setLoading } from "context";
import Table from "examples/Tables/Table";
import ApiClient from "Services/ApiClient";
import { toast } from "react-toastify";

import React from "react";
import { setIncome } from "context";
import usersView from "./data/income";
import { getIncomeByUserId } from "Services/endpointes";
import { setDialog } from "context";
import { Link, useLocation, useParams } from "react-router-dom";

function Income() {
  const [controller, dispatch] = useSoftUIController();

  const { income, user } = controller;
  const pathname = useParams();
  const location = useLocation();
  console.log(pathname, location);

  const getIncomes = async () => {
    startLoading(dispatch, true);
    try {
      let query = new URLSearchParams(location.search);
      let type = query?.get("type") ?? "incentive";
      const response = await ApiClient.getData(getIncomeByUserId + `/${type}`, 0, 1000);
      if (response.status == 200) {
        setIncome(dispatch, response.data);
      } else {
        setDialog(dispatch, [response]);
        setIncome(dispatch, []);
      }
    } catch (error) {
      toast.info(error.toString());
      setLoading(dispatch, false);
    }
  };
  useEffect(() => {
    income.length < 1 && getIncomes();
  }, []);

  useEffect(() => {
    getIncomes();
  }, [location]);

  let memoizedRows = usersView.rows(income, user.fullName, dispatch);

  const [menu, setMenu] = useState(null);
  const openMenu = ({ currentTarget }) => {
    if (menu === currentTarget) {
      closeMenu();
    } else {
      setMenu(currentTarget);
    }
  };
  const closeMenu = () => setMenu(null);

  return (
    <DashboardLayout>
      <DashboardNavbar call={getIncomes} />
      <SoftBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="2.5rem"
        height="2.5rem"
        bgColor="white"
        shadow="sm"
        borderRadius="50%"
        position="fixed"
        right="2rem"
        bottom="2rem"
        zIndex={99}
        color="dark"
        sx={{ cursor: "pointer" }}
        onClick={openMenu}
      >
        <Icon fontSize="default" color="inherit">
          tune
        </Icon>
        <Menu
          id="simple-menu"
          anchorEl={menu}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
          }}
          open={Boolean(menu)}
          onClose={closeMenu}
        >
          <SoftBox component={Link} to="/incomes?type=incentive">
            <MenuItem>Incentive</MenuItem>
          </SoftBox>
          <SoftBox component={Link} to="/incomes?type=regular">
            <MenuItem>Regular</MenuItem>
          </SoftBox>
          <SoftBox component={Link} to="/incomes?type=royality">
            <MenuItem>royality</MenuItem>
          </SoftBox>
          <SoftBox component={Link} to="/incomes?type=reward">
            <MenuItem>reward</MenuItem>
          </SoftBox>
        </Menu>
      </SoftBox>
      <SoftBox py={3} mb={3}>
        {income?.length > 0 ? (
          <Box>
            <Table columns={usersView.columns} rows={memoizedRows} />
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
