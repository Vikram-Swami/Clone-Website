import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import SoftBox from "components/SoftBox";
import themeRTL from "assets/theme/theme-rtl";
import routes from "routes";
import brand from "assets/images/logo-ct.png";
import UserModel from "Models/User";
import UserController from "Services/UserServices";
import {
  useSoftUIController,
  setUser,
  setMiniSidenav,
  setOpenConfigurator,
  setLoading,
} from "context";
import Sidenav from "examples/Sidenav";
import { components } from "routes";

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor, user, loading } =
    controller;
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
    const cookieArray = document.cookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i].trim();
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (user && user.id !== undefined && route.auth !== null) {
        if (route.auth === "user" || route.auth === "any") {
          let Component = components[route.key];
          return (
            <Route
              exact
              path={route.route}
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  {components[route.key]}
                </Suspense>
              }
              key={route.key}
            />
          );
        }
      } else if (user.id === undefined && route.auth === null) {
        return (
          <Route
            exact
            path={route.route}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                {route.component}
              </Suspense>
            }
            key={route.key}
          />
        );
      }

      return null;
    });

  async function getUserById() {
    try {
      setLoading(dispatch, true);
      const userId = getCookie("userId");
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
      setLoading(dispatch, false);
    }
  }

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  useEffect(() => {
    !user.id && getUserById();

    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const configsButton = (
    <SoftBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="0"
      height="0"
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
    ></SoftBox>
  );

  return (
    <ThemeProvider theme={themeRTL}>
      <CssBaseline />
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
        {getRoutes(routes)}
        {!user.id ? (
          <Route path="/*" element={<Navigate to="/" />} />
        ) : (
          <Route path="/*" element={<Navigate to="/dashboard" />} />
        )}
      </Routes>
    </ThemeProvider>
  );
}
