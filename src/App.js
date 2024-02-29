import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import themeRTL from "assets/theme/theme-rtl";
import routes from "routes";
import brand from "assets/images/logo-ct.png";
import UserModel from "Models/User";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Dashboard from "layouts/dashboard";
import UserController from "Services/UserServices";
import Loading from "react-loading";
import {
  useSoftUIController,
  setUser,
  setMiniSidenav,
  setOpenConfigurator,
  setLoading
} from "context";
import Sidenav from "examples/Sidenav";

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor, user, loading } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  function getCookie(name) {
    const cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  async function getUserById() {
    setLoading(dispatch, true);
    try {
      const userId = getCookie('userId');
      let userController = new UserController();
      let data = await userController.getUserByIdFromAPI(userId);
      if (data.status === 200) {
        const user = new UserModel().toJson(data?.data);
        setUser(dispatch, user);
        setLoading(dispatch, false);

      } else {
        setLoading(dispatch, false);

      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setLoading(dispatch, false);

    } finally {
    }
  }
  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {

      if (user && user.id !== undefined) {
        if (route.auth === user.type || route.auth === "any") {
          return <Route exact path={route.route} element={route.component} key={route.key} />;
        }
      }

      return null;
    });
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  useEffect(() => {
    getUserById();
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

  return (
    <ThemeProvider theme={themeRTL}>
      <CssBaseline />
      {loading && <Loading width={40} />}
      {layout === "dashboard" && user.id && (
        <>
          {/* Render Sidenav and Configurator */}
          <Sidenav
            color={sidenavColor}
            brand={brand}
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          {configsButton}
        </>
      )}
      <Routes>
        {/* Render routes based on user authentication */}
        <Route path="/" element={!user.id ? <SignIn /> : <Dashboard />} />
        {!loading && user.id && getRoutes(routes)}
        {!user.id && <Route path="/sign-up" element={<SignUp />} />}
        {!user.id && <Route path="/*" element={<Navigate to="/" />} />}
      </Routes>
    </ThemeProvider>
  );
}
