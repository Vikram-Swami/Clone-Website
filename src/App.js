import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import themeRTL from "assets/theme/theme-rtl";
import routes from "routes";
import brand from "assets/images/logo-ct.png";
import UserModel from "Models/User";
import { useSoftUIController, setUser, setMiniSidenav, setLoading } from "context";
import Sidenav from "examples/Sidenav";
import Loading from "layouts/loading";
import ApiClient from "Services/ApiClient";
import { getUserByUserId } from "Services/endpointes";

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, sidenavColor, user } = controller;
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

  const getRoutes = () =>
    routes.map((route) => {
      if (user && user.id !== undefined && route.auth !== null) {
        if (route.auth === user.type || route.auth === "any") {
          return (
            <Route
              exact
              path={route.route}
              element={<Suspense fallback={<Loading />}>{route.component} </Suspense>}
              key={route.key}
            />
          );
        }
      } else if (user.id === undefined && route.auth === null) {
        return (
          <Route
            exact
            path={route.route}
            element={<Suspense fallback={<Loading />}>{route.component} </Suspense>}
            key={route.key}
          />
        );
      }

      return null;
    });

  async function getUserById() {
    try {
      setLoading(dispatch, true);
      const data = await ApiClient.getData(getUserByUserId);
      if (data.status === 200) {
        setUser(dispatch, data?.data);
        setLoading(dispatch, false);
      } else {
        setLoading(dispatch, false);
      }
    } catch (error) {
      setLoading(dispatch, false);
    }
  }

  useEffect(() => {
    !user.id && getUserById();

    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  return (
    <ThemeProvider theme={themeRTL}>
      <CssBaseline />
      {user.id && (
        <>
          {/* Render Sidenav and Configurator */}
          <Sidenav
            color={sidenavColor}
            brand={brand}
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        </>
      )}
      <Routes>
        {getRoutes()}
        {!user.id ? (
          <Route path="/*" element={<Navigate to="/" />} />
        ) : (
          <Route path="/*" element={<Navigate to="/dashboard" />} />
        )}
      </Routes>
    </ThemeProvider>
  );
}
