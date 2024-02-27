import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation, redirect } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// NextWork  Dashboard React components
import SoftBox from "components/SoftBox";

// NextWork  Dashboard React examples
import Sidenav from "examples/Sidenav";

// NextWork  Dashboard React themes
import themeRTL from "assets/theme/theme-rtl";

// NextWork  Dashboard React routes
import routes from "routes";

// NextWork  Dashboard React contexts
import { useSoftUIController, setUser, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brand from "assets/images/logo-ct.png";
import UserModel from "Models/User";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Dashboard from "layouts/dashboard";

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor, user } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Api
  async function getUserById() {
    let data = new UserModel(response.data);
    setUser(dispatch, data);
  }
  // getUserById();

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting page scroll to 0 when changing the route
  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {

      if (route.collapse) {
        getRoutes();
      }

      if (!user || user.userId === undefined || user.userId === null) {
        if (route.auth === user.type || route.auth === "any") {
          return <Route exact path={route.route} element={route.component} key={route.key} />;
        }

      }

      return null;
    });
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);


  const configsButton = (
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
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </SoftBox>
  );
  console.log(user);
  return (
    <ThemeProvider theme={themeRTL}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brand}
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          {/* <Configurator /> */}
          {configsButton}
        </>
      )}
      <Routes>
        {<Route exact path="/" element={!user.id ? <SignIn /> : <Dashboard />} />}
        {getRoutes(routes)}
        {!user.id ? <Route path="/sign-up" element={<SignUp />} /> : null}

      </Routes>
    </ThemeProvider>
  );
}
