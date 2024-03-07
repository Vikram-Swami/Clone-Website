import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link, Navigate, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";

// Next Work Dashboard React examples
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Next Work Dashboard React context
import {
  useSoftUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

// Images
import team2 from "assets/images/team-2.jpg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import SoftButton from "components/SoftButton";
import { Height } from "@mui/icons-material";
import { setLoading } from "context";
import { setDialog } from "context";
import { Avatar, Box, Divider, Stack } from "@mui/material";

function DashboardNavbar({ absolute, light, isMini }) {
  const navigate = useNavigate();
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const { user } = controller;
  const logoutHandler = () => {
    setDialog(dispatch, [
      {
        message: "Are you sure you want to Log out?",
        status: "Logout",
      },
    ]);
  };
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

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  const generateReferLink = (id) => {
    const referLink = '';

    return `${referLink} & sponsorId=${id} & userId=${id}`;
  };

  const handleCopyLink = (user) => {
    const referLink = generateReferLink(user.id);
    console.log(user);
    navigator.clipboard.writeText(referLink)
      .then(() => {
        console.log('Link copied to clipboard:', referLink);
      })
      .catch((err) => {
        console.error('Unable to copy link to clipboard', err);
      });
  };

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <Box>
        <SoftTypography
          variant="gradient"
          color="dark"
          ml={2}
          p={1}
          onClick={() => navigate("/profile")}
          cursor="pointer"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Divider />
          <Icon sx={{ fontWeight: "bold", fontSize: "2rem !important" }}>account_circle</Icon>
          <span>&nbsp;&nbsp;&nbsp;Profile</span>
        </SoftTypography>

        <SoftTypography
          variant="gradient"
          color="dark"
          ml={2}
          p={1}
          onClick={() => logoutHandler()}
          cursor="pointer"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Divider />
          <Icon sx={{ fontWeight: "bold", fontSize: "2rem !important" }}>logout_icon</Icon>
          <span>&nbsp;&nbsp;&nbsp;Logout</span>
        </SoftTypography>

        <SoftTypography
          variant="gradient"
          color="dark"
          ml={2}
          p={1}
          onClick={() => handleCopyLink(user)}
          cursor="pointer"

          sx={{ display: "flex", alignItems: "center" }}
        >
          <Divider />
          <Icon sx={{ fontWeight: "bold", fontSize: "2rem !important" }}>share_icon</Icon>
          <span>&nbsp;Refer Link</span>
        </SoftTypography>
      </Box>
    </Menu>
  );

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </SoftBox>
        <SoftBox color={light ? "white" : "inherit"}>
          <SoftButton variant="gradient" color="dark" ml={2} onClick={() => navigate("/account")}>
            <Icon sx={{ fontWeight: "bold", fontSize: "3rem !important" }}>
              account_balance_wallet
            </Icon>
            &nbsp;{user.wallet}
          </SoftButton>
          <IconButton
            size="small"
            color="inherit"
            sx={navbarMobileMenu}
            onClick={handleMiniSidenav}
          >
            <Icon className={light ? "text-white" : "text-dark"}>
              {miniSidenav ? "menu_open" : "menu"}
            </Icon>
          </IconButton>

          {renderMenu()}
        </SoftBox>
        {isMini ? null : (
          <SoftBox sx={(theme) => navbarRow(theme, { isMini })}>
            <SoftBox pr={1}>
              <SoftInput
                placeholder="Type here..."
                icon={{ component: "search", direction: "left" }}
              />
            </SoftBox>

            <SoftBox color={light ? "white" : "inherit"}>
              <IconButton
                size="small"
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon className={light ? "text-white" : "text-dark"}>
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Stack direction="row" spacing={2}>
                  <Avatar alt="Remy Sharp" src="51365.jpg" />
                </Stack>
              </IconButton>
              {renderMenu()}
            </SoftBox>
          </SoftBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
