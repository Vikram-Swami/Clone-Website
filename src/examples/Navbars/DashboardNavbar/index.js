import { useState, useEffect, useRef } from "react";

// react-router components
import { Link, useLocation, useNavigate } from "react-router-dom";

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
import { setDialog } from "context";
import { Avatar, Box, Divider, Grid, Stack, Typography } from "@mui/material";
import NotificationItem from "examples/Items/NotificationItem";
import SoftBadge from "components/SoftBadge";
import routes from "routes";

function DashboardNavbar({ absolute, light, isMini, call }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const { user, notifications } = controller;

  const handleLogout = () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };
  const logoutHandler = () => {
    setDialog(dispatch, [
      {
        status: "form",
        action: "Logout",
        title: "Are you sure to Logout.",
        call: handleLogout,
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
  const handleOpenNotif = (event) => setOpenNotif(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const handleCloseNotif = () => setOpenNotif(false);

  const generateReferLink = (id) => {
    const referLink = window.location.origin;

    return `${referLink}/sign-up/1?sponsorId=${id}&placementId=${id}`;
  };

  function generateWhatsAppMessage(referralLink) {
    const companyName = "Kno-one India Limited";
    const message = `👋 Hey there!\n\nLooking to start earning?💰\nClick on this link to get started with ${companyName}.\n\nLink: ${referralLink}\n\nJoin us at ${companyName} and explore exciting opportunities to earn from the comfort of your home.\n\nHappy earning! 🚀\n\nRegards\n Kno-one Team`;
    return message;
  }

  const handleSend = (message) => {
    // Construct the WhatsApp URL with only the prewritten message
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in a new window or tab
    window.open(whatsappUrl, "_blank");
  };
  const handleCopyLink = (user) => {
    const referLink = generateReferLink(user.id);

    let message = generateWhatsAppMessage(referLink);
    setDialog(dispatch, [
      {
        status: "form",
        title: "Please copy the link below or click on share.",
        children: (
          <Grid container spacing={1}>
            <Grid item xs={1}>
              <Icon small>link</Icon>
            </Grid>
            <Grid item xs={11}>
              <Typography fontSize={13} whiteSpace={"nowrap"}>
                {" "}
                {referLink}
              </Typography>
            </Grid>
          </Grid>
        ),
        action: "Share",
        call: () => handleSend(message),
      },
    ]);
  };

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
    >
      <Box>

        {routes.filter(e => e.type == "menubar").map((route, i) => {
          return <SoftBox
            key={i + 1}
            variant="gradient"
            px={1}
            my={0.5}
            component={Link}
            to={route.route}
            display="flex"
            sx={{ cursor: "pointer" }}
            alignItems="center"
            color="warning" >
            {route.icon}
            <SoftTypography cursor="pointer" fontSize="1rem" pl={1} component="span">
              {route.name}
            </SoftTypography>
          </SoftBox>
        })}

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
          <Icon >share_icon</Icon>
          <SoftTypography cursor="pointer" fontSize="1rem" pl={1} component="span">
            Refer Link
          </SoftTypography>
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
          <Icon>logout_icon</Icon>
          <SoftTypography cursor="pointer" fontSize="1rem" pl={1} component="span">
            Log Out
          </SoftTypography>
        </SoftBox>
      </Box>
    </Menu>
  );
  const renderNotification = () => (
    <Menu
      anchorEl={openNotif}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={Boolean(openNotif)}
      onClose={handleCloseNotif}
    >
      <Box>
        {notifications?.length > 0 ?
          notifications
            ?.slice(0, 3)
            ?.map((e) => (
              <NotificationItem
                key={e._id}
                image={<Icon size="small">{e.icon}</Icon>}
                title={e.title}
              />
            )) : "No Notifications Found."}
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

          <SoftBox color={light ? "white" : "inherit"}>
            <IconButton
              color="inherit"
              size="large"
              sx={navbarIconButton}
              aria-controls="notification-menu"
              aria-haspopup="true"
              variant="contained"
              onClick={handleOpenNotif}
            >
              <Icon className={light ? "text-white" : "text-dark"} fontSize="14px">
                notifications
              </Icon>
              <SoftBadge
                sx={{ position: "absolute", top: 0, left: 10 }}
                variant="gradient"
                color={"error"}
                size="8px"
                badgeContent={user.unread}
                circular
              />
            </IconButton>
            {renderNotification()}
          </SoftBox>

          <SoftBox color={light ? "white" : "inherit"}>
            <IconButton
              size="small"
              color="inherit"
              sx={navbarIconButton}
              aria-controls="Profile-menu"
              aria-haspopup="true"
              variant="contained"
              onClick={handleOpenMenu}
            >
              <Stack direction="row" spacing={2}>
                <Avatar alt="Remy Sharp" width="100%" src="51365.jpg" />
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
