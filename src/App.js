import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route, Navigate, useLocation, redirect } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import themeRTL from "assets/theme/theme-rtl";
import routes from "routes";
import brand from "assets/images/logo-ct.png";
import { useSoftUIController, setUser, setMiniSidenav, startLoading, setDialog } from "context";
import Sidenav from "examples/Sidenav";
import Loading from "layouts/loading";
import ApiClient from "Services/ApiClient";
import { ToastContainer, toast } from "react-toastify";
import { getUserById } from "Services/endpointes";
import { setLoading } from "context";

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, sidenavColor, user, loading } = controller;
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

  function getCookie() {
    const cookieArray = document.cookie.split(";");
    let userId, authToken;
    for (let i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i].trim();
      if (cookie.startsWith("userId" + "=")) {
        userId = cookie.substring(String("userId").length + 1);
      } else if (cookie.startsWith("authToken" + "=")) {
        authToken = cookie.substring(String("authToken").length + 1);
      }
    }
    if (userId && authToken && userId !== undefined && authToken !== undefined && userId !== "") {
      return true;
    } else {
      return false;
    }
  }

  async function getUser() {
    try {
      startLoading(dispatch, true);
      const data = await ApiClient.getData(getUserById);
      if (data.status == 200) {
        setUser(dispatch, data?.data);
        setDialog(dispatch, [data]);
      } else {
        toast.success(data.message);
        setLoading(dispatch, false);
      }
    } catch (error) {
      setLoading(dispatch, false);
      toast.info(error.response?.data?.message ?? "Welcome Back!");
    }
  }


  useEffect(() => {
    if ((getCookie() && user.id == null) || (getCookie() && user.id == undefined)) {
      getUser();
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);
  return (
    <ThemeProvider theme={themeRTL}>
      <ToastContainer />
      <CssBaseline />
      <Loading condition={loading} />
      {getCookie() && (
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
        {routes?.map((route) => {
          if (user && user.id !== undefined && route.auth !== null) {
            if (getCookie() && route.auth !== null) {
              return (
                <Route
                  exact
                  path={route.route}
                  element={
                    <Suspense fallback={<Loading condition={true} />}>{route.component} </Suspense>
                  }
                  key={`${route.key}-${route.route}`}
                />
              );
            }
          } else if (!getCookie() && route.auth === null) {
            return (
              <Route
                exact
                path={route.route}
                element={
                  <Suspense fallback={<Loading condition={true} />}>{route.component} </Suspense>
                }
                key={`${route.key}-${route.route}`}
              />
            );
          }
        })}
        {!getCookie() ? (
          <Route path="/*" element={<Navigate to="/" />} />
        ) : (
          <Route path="/*" element={<Navigate to="/dashboard" />} />
        )}
      </Routes>
    </ThemeProvider>
  );
}
