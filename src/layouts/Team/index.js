
// Next Work Dashboard React components
import SoftBox from "components/SoftBox";

// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import SoftButton from "components/SoftButton";
import { Grid, Icon, Menu, MenuItem, Table } from "@mui/material";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

import { useSoftUIController, startLoading, setLoading } from "context";
import React from "react";
import ApiClient from "Services/ApiClient";
import { getMembers } from "Services/endpointes";
import { toast } from "react-toastify";
import { setMembers } from "context";
import { setDialog } from "context";

import 'reactflow/dist/style.css';
import TeamView from "./data/team";


function Team() {
  const [controller, dispatch] = useSoftUIController();

  const typeRef = useRef();

  const { member, user } = controller;
  const location = useLocation();


  const getMember = async () => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.getData(getMembers);
      if (response.status == 200) {
        // let self = JSON.parse(JSON.stringify(user));

        // response.data.unshift(self)
        setMembers(dispatch, response.data);
      } else {
        toast.success(response?.message);
      }
    } catch (error) {
      toast.info(error?.message);
      setLoading(dispatch, false);
    }
  };


  const [menu, setMenu] = useState(null);
  const openMenu = ({ currentTarget }) => {

    if (menu === currentTarget) {
      closeMenu();
    } else {
      setMenu(currentTarget);
    }
  };
  const closeMenu = () => setMenu(null);
  const memoizedRows = useMemo(
    () => TeamView.rows(member, dispatch, user),
    [member, user]
  );

  useEffect(() => {
    member?.length < 1 && getMember();
  }, []);

  useEffect(() => {
    if (member.length > 0) {
      // member.forEach(e => {
      //   let chain = member.filter((ne, i) => ne.sponsorId == e.id);
      //   if (chain.length > 0) {
      //     chain.forEach(n => { edges.push({ id: i, source: e.id, target: n.id }) });
      //   }
      // })
    }
    let query = new URLSearchParams(location.search);
    let type = query.get("view");
    if (type == "placement") {
      typeRef.current.innerHTML = "Placement View";
    } else {
      typeRef.current.innerHTML = "Sponsor View";
    }
  }, [typeRef, location]);

  return (
    <DashboardLayout>
      <DashboardNavbar call={getMember} />
      <SoftBox
        component="div"
        position="relative"
        display="block"
      >
        <SoftBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          // width="2.5rem"
          // height="2.5rem"
          bgColor="white"
          borderRadius="20px"
          shadow="sm"
          position="absolute"
          right="0"
          top="0.5rem"
          fontSize="0.8rem"
          padding="5px 10px"
          zIndex={99}
          color="dark"
          sx={{ cursor: "pointer" }}
          onClick={openMenu}
        >
          <Icon fontSize="1px">
            tune
          </Icon>
          <p ref={typeRef}></p>

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
            <SoftBox component={Link} to="/my-team?view=sponsor">
              <MenuItem>Sponsor View</MenuItem>
            </SoftBox>
            <SoftBox component={Link} to="/my-team?view=placement">
              <MenuItem>Placement View</MenuItem>
            </SoftBox>
          </Menu>
        </SoftBox>
      </SoftBox>

      <SoftBox py={3} mb={3} width="100%" height="85dvh">

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
                          Create Team
                        </SoftButton>
                      </NavLink>
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

export default Team;
