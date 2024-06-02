// @mui material components
import Card from "@mui/material/Card";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";

// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import { Grid, Icon, Menu, MenuItem } from "@mui/material";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

import { useEffect, useState } from "react";
import Table from "examples/Tables/Table";
import ApiClient from "Services/ApiClient";
import { toast } from "react-toastify";
import { useSoftUIController, startLoading, setLoading } from "context";
import React from "react";
import { getRentByUserId } from "Services/endpointes";
import { setDialog } from "context";
import RentOnRentView from "./data";
import { setRent } from "context";
import { Link, useLocation } from "react-router-dom";

function RentOnRent() {
  const [controller, dispatch] = useSoftUIController();
  const location = useLocation();


  const { rent } = controller;

  const [menu, setMenu] = useState(null);
  const openMenu = ({ currentTarget }) => {
    if (menu === currentTarget) {
      closeMenu();
    } else {
      setMenu(currentTarget);
    }
  };
  const closeMenu = () => setMenu(null);


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

  let query = new URLSearchParams(location.search);
  let type = query?.get("type") ?? "RoR";
  let memoizedRows = RentOnRentView.rows(rent.filter((e) => e.type == type));

  return (
    <DashboardLayout>
      <DashboardNavbar call={getAllRents} />
      <SoftBox
        component="div"
        position="relative"
        display="block"
      >
        <SoftBox
          width="2.5rem"
          height="2.5rem"
          bgColor="transparent"
          borderRadius="50%"
          position="absolute"
          right="2px"
          top="2rem"
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
            <SoftBox component={Link} to="/my-benefits?type=ror">
              <MenuItem>Consultation Benefit (RoR)</MenuItem>
            </SoftBox>
            <SoftBox component={Link} to="/my-benefits?type=royality">
              <MenuItem>Royality</MenuItem>
            </SoftBox>
            {rent.filter(e => e.type === "rewards").length > 0 && <SoftBox component={Link} to="/my-benefits?type=rewards">
              <MenuItem>Salary</MenuItem>
            </SoftBox>}
          </Menu>
        </SoftBox>
      </SoftBox >
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            {rent?.filter((e) => e.type == type)?.length > 0 ? (
              <Table columns={RentOnRentView.columns} rows={memoizedRows} />
            ) : (
              <SoftBox mt={4}>
                <SoftBox mb={1.5}>
                  <Grid container spacing={3}>
                    <Grid item lg={12}>
                      <Grid item container spacing={3}>
                        <Grid item xs={12} xl={12}>
                          <DefaultInfoCard
                            icon="cloud"
                            title={`Oops! It seems we don't find something you are looking for.`}
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
    </DashboardLayout >
  );
}

export default RentOnRent;
