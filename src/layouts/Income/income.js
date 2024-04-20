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

function Income() {
  const [controller, dispatch] = useSoftUIController();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { income, user } = controller;

  const getIncomes = async () => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.getData(getIncomeByUserId, 0, 100);
      if (response.status == 200) {
        setIncome(dispatch, response.data);
      } else {
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

  const [menu, setMenu] = useState(null);
  const openMenu = ({ currentTarget }) => {
    if (menu === currentTarget) {
      closeMenu();
    } else {
      setMenu(currentTarget);
    }
  };
  const closeMenu = () => setMenu(null);
  const setSelector = (selector) => {
    setSelector(selector);
    setUsers(dispatch, []);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar call={getIncomes} />
      <SoftBox py={3} mb={3}>
        {income?.length > 0 ? (
          <Box>
            <Table columns={usersView.columns} rows={memoizedRows} />
            <SoftBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="3.5rem"
              height="3.5rem"
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
                settings
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
                  horizontal: "right",
                }}
                open={Boolean(menu)}
                onClose={closeMenu}
              >
                <MenuItem
                  onClick={() => {
                    closeMenu();
                    setSelector("incentive");
                  }}
                >
                  Incentive
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setSelector("regular");
                    closeMenu();
                  }}
                >
                  Regular
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setSelector("royality");
                    closeMenu();
                  }}
                >
                  Royality
                </MenuItem>
              </Menu>
            </SoftBox>
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
