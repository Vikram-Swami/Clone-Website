import { useState, useEffect } from "react";

// react router components
import { NavLink, useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";

// Next Work Dashboard React examples
import Breadcrumbs from "examples/Breadcrumbs";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Next Work Dashboard React context
import { useSoftUIController, setTransparentNavbar, setMiniSidenav } from "context";
import { Avatar, Badge } from "@mui/material";
function DashboardNavbar({ absolute, light, isMini, call }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar } = controller;
  const route = useLocation().pathname.split("/").slice(1);
  const { user } = controller;




  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <SoftBox sx={(theme) => navbarRow(theme, { isMini })}>
          <SoftBox
            color="inherit"
            mb={{ xs: 1, md: 0 }}
            sx={(theme) => navbarRow(theme, { isMini })}
          >
            <Breadcrumbs
              icon="home"
              call={call}
              title={route[route.length - 1]}
              route={route}
              light={light}
            />
          </SoftBox>
          <div style={{ color: light ? "white" : "inherit" }}>
            <NavLink to={"/notifications"}>
              <IconButton
                sx={navbarIconButton}
                variant="contained"
              >
                <Icon className={light ? "text-white" : "text-dark"} fontSize="100px">
                  notifications
                </Icon>
                <Badge
                  sx={{ position: "absolute", top: -1, left: 10 }}
                  variant="gradient"
                  color={user.unread > 0 ? "error" : "info"}
                  size="10px"
                  badgeContent={user.unread}
                  circular
                />
              </IconButton>
            </NavLink>
          </div>

          <div className="mx5 c-point" style={{ color: light ? "white" : "inherit" }}>
            <NavLink to={"/profile"}>
              <Avatar sx={{ width: 35, height: 35 }} alt={user.fullName} src={user?.image ? user.image : "51365.jpg"} />
            </NavLink>
          </div>

          <IconButton
            size="small"
            color="inherit"
            sx={navbarMobileMenu}
            onClick={handleMiniSidenav}
          >
            <Icon fontSize="medium" className={light ? "text-white" : "text-dark"}>
              {!miniSidenav ? "menu_open" : "menu"}
            </Icon>
          </IconButton>
        </SoftBox>
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
  call: () => { },
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
  call: PropTypes.func,
};

export default DashboardNavbar;
