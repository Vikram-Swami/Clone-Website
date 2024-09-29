import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route, Navigate, useLocation, redirect } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import themeRTL from "assets/theme/theme-rtl";
import routes from "routes";
import brand from "assets/images/logo-ct.png";
import { useSoftUIController, setMiniSidenav } from "context";
import Sidenav from "examples/Sidenav";
import { getUser } from "api/users";
import { ToastContainer } from "react-toastify";
import CircularWithValueLabel from "components/Progress";

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
    if (userId && authToken && userId !== "") {
      return true;
    } else {
      return false;
    }
  }





  useEffect(() => {
    if (getCookie() && !user.id) {
      getUser(dispatch);
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  return (
    <ThemeProvider theme={themeRTL}>
      <ToastContainer />
      <CssBaseline />
      <CircularWithValueLabel condition={loading} />
      {getCookie() && user.id ? (
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
      ) : (
        ""
      )}
      <Routes>
        {routes?.map((route) => {
          if (getCookie() && user.id) {
            if (route.auth !== null) {
              return (
                <Route
                  exact
                  path={route.route}
                  element={
                    <Suspense fallback={<CircularWithValueLabel condition={true} />}>{route.component} </Suspense>
                  }
                  key={`${route.key}-${route.route}`}
                />
              );
            }
          } else if (route.auth === null) {
            return (
              <Route
                exact
                path={route.route}
                element={
                  <Suspense fallback={<CircularWithValueLabel condition={true} />}>{route.component} </Suspense>
                }
                key={`${route.key}-${route.route}`}
              />
            );
          }
        })}

        {getCookie() && user.id ? (
          <Route path="/*" element={<Navigate to="/home" />} />
        ) : (
          <Route path="/*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </ThemeProvider>
  );
}
