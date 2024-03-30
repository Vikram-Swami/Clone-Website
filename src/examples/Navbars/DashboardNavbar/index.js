import { useState, useEffect } from "react";

// react-router components
import { useLocation, useNavigate } from "react-router-dom";

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
} from "context";
import SoftButton from "components/SoftButton";
import { setDialog } from "context";
import { Avatar, Box, Divider, Stack } from "@mui/material";

function DashboardNavbar({ absolute, light, isMini }) {
  const navigate = useNavigate();
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const { user } = controller;
  const handleLogout = () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    window.location.reload();
  };
  const logoutHandler = () => {
    setDialog(dispatch, [
      {
        status: "form",
        action: "Logout",
        title: "Are you sure to Logout from your Account.",
        call: handleLogout
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

    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  const generateReferLink = (id) => {
    const referLink = window.location.origin;

    return `${referLink}/sign-up/1?sponsorId=${id}&placementId=${id}`;
  };

  const handleCopyLink = (user) => {
    const referLink = generateReferLink(user.id);

    navigator.clipboard.writeText(referLink)
      .then(() => {
        setDialog(dispatch, [{ status: 201, message: "Link has been coppied to clipboard. Please share the link with your new Member." }])
      })
      .catch((_) => {
        setDialog(dispatch, [{ status: 400, message: "Unable to copy the Link." }])

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

    >
      <Box>
        <SoftBox
          variant="gradient"
          px={1}
          my={0.5}
          onClick={() => navigate("/profile")}
          display="flex"
          sx={{ cursor: "pointer" }}
          alignItems="center"
          color="warning"
        >
          <Divider />
          <Icon fontSize="1rem">account_circle</Icon>
          <SoftTypography cursor="pointer" fontSize="1rem" pl={1} component="span">My Profile</SoftTypography>

        </SoftBox>

        <SoftBox
          variant="gradient"
          px={1}
          my={0.5}
          onClick={() => handleCopyLink(user)}
          display="flex"
          alignItems="center"
          sx={{ cursor: "pointer" }}
          color="info"
        >
          <Divider />
          <Icon fontSize="1rem">share_icon</Icon>
          <SoftTypography cursor="pointer" fontSize="1rem" pl={1} component="span">Sponsor</SoftTypography>

        </SoftBox>
        <SoftBox
          variant="gradient"
          px={1}
          my={0.5}
          onClick={() => logoutHandler()}
          display="flex"
          sx={{ cursor: "pointer" }}
          alignItems="center"
          color="error"
        >
          <Divider />
          <Icon fontSize="1rem">logout_icon</Icon>
          <SoftTypography cursor="pointer" fontSize="1rem" pl={1} component="span">Log Out</SoftTypography>
        </SoftBox>

      </Box>
    </Menu>
  );
  const renderNotification = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}

    >
      <Box>
        <SoftBox
          variant="gradient"
          px={1}
          my={0.5}
          onClick={() => navigate("/profile")}
          display="flex"
          sx={{ cursor: "pointer" }}
          alignItems="center"
          color="warning"
        >
          <Divider />
          <Icon fontSize="1rem">account_circle</Icon>
          <SoftTypography cursor="pointer" fontSize="1rem" pl={1} component="span">My Profile</SoftTypography>

        </SoftBox>

        <SoftBox
          variant="gradient"
          px={1}
          my={0.5}
          onClick={() => handleCopyLink(user)}
          display="flex"
          alignItems="center"
          sx={{ cursor: "pointer" }}
          color="info"
        >
          <Divider />
          <Icon fontSize="1rem">share_icon</Icon>
          <SoftTypography cursor="pointer" fontSize="1rem" pl={1} component="span">Sponsor</SoftTypography>

        </SoftBox>
        <SoftBox
          variant="gradient"
          px={1}
          my={0.5}
          onClick={() => logoutHandler()}
          display="flex"
          sx={{ cursor: "pointer" }}
          alignItems="center"
          color="error"
        >
          <Divider />
          <Icon fontSize="1rem">logout_icon</Icon>
          <SoftTypography cursor="pointer" fontSize="1rem" pl={1} component="span">Log Out</SoftTypography>
        </SoftBox>

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

        <SoftBox color={light ? "white" : "inherit"} sx={{ display: "none" }}>
          <SoftButton variant="gradient" color="dark" ml={2} onClick={() => navigate("/account")}>
            <Icon sx={{ fontWeight: "bold", fontSize: "3rem !important" }}>
              account_balance_wallet
            </Icon>
            &nbsp;{user.wallet}
          </SoftButton>


          {renderMenu()}
        </SoftBox>
        {(
          <SoftBox sx={(theme) => navbarRow(theme, { isMini })}>

            <IconButton
              size="small"
              color="inherit"
              sx={navbarIconButton}
              aria-controls="notification-menu"
              aria-haspopup="true"
              variant="contained"
              onClick={handleOpenMenu}
            >
              <Icon className={light ? "text-white" : "text-dark"}>notifications</Icon>
              {renderNotification()}

            </IconButton>



            <SoftBox color={light ? "white" : "inherit"}>
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

            <IconButton
              size="small"
              color="inherit"
              sx={navbarMobileMenu}
              onClick={handleMiniSidenav}
            >
              <Icon className={light ? "text-white" : "text-dark"}>
                {!miniSidenav ? "menu_open" : "menu"}
              </Icon>
            </IconButton>
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
