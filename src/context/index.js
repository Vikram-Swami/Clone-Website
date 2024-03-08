// context.js

import { createContext, useContext, useReducer, useMemo } from "react";
import PropTypes from "prop-types";
import UserModel from "Models/User";
import ConnectionsModel from "Models/Connection";
import { CircularProgress, Stack } from "@mui/material";
import FormDialog from "components/Pop";
import LoginDialog from "components/Pop/login";
import NewFormDialog from "components/NewDialog";
import RentModel from "Models/Rents";
import IncomeLog from "Models/Income";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";
import Notification from "Models/Notification";

const SoftUI = createContext(null);

SoftUI.displayName = "SoftUIContext";

// Next Work Dashboard React reducer
function reducer(state, action) {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    case "USER": {
      return { ...state, loading: false, user: new UserModel().toJson(action.value) };
    }
    case "RENT": {
      return { ...state, loading: false, rent: new RentModel().fromArray(action.value) };
    }
    case "MEMBER": {
      return { ...state, loading: false, member: new UserModel().memberToArray(action.value) };
    }
    case "INCOME": {
      return { ...state, loading: false, income: new IncomeLog().fromArray(action.value) };
    }
    case "LOADING": {
      return { ...state, loading: action.value };
    }
    case "CONNECTION": {
      return { ...state, loading: false, connection: new ConnectionsModel().fromArray(action.value) };
    }
    case "NOTIFICATION": {
      return { ...state, notifications: new Notification().fromArray(action.value) };
    }
    case "DIALOG": {
      return { ...state, dialog: action.value, loading: false, accept: false };
    }
    case "PRODUCTS": {
      return { ...state, products: action.value, loading: false };
    }
    case "ACCEPT": {
      return { ...state, accept: action.value };
    }
    case "START_LOAD": {
      return { ...state, dialog: [], loading: action.value };
    }
    default: {
      console.log(`Unhandled action type: ${action.type}`);
    }
  }
}

// Next Work Dashboard React context provider
function NextworkControllerProvider({ children }) {
  const initialState = {
    miniSidenav: false,
    transparentSidenav: true,
    sidenavColor: "info",
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
    direction: "ltr",
    layout: "dashboard",
    user: new UserModel(),
    connection: [],
    products: [],
    rent: [],
    notifications: [],
    dialog: [],
    member: [],
    income: [],
    accept: false,
    loading: false,
  };
  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return (
    <SoftUI.Provider value={value}>
      {/* Conditionally render loader */}

      <FormDialog
        open={
          controller.dialog?.length > 0 &&
          controller.dialog?.[0]?.status !== "otp" &&
          controller.dialog?.[0]?.status !== "form"
        }
        setOpen={(v) => {
          setDialog(dispatch, []);
        }}
        data={controller.dialog[0]}
      />

      <LoginDialog
        open={controller.dialog.length > 0 && controller.dialog[0]?.status === "otp"}
        setOpen={(v) => {
          setDialog(dispatch, []);
        }}
        data={controller.dialog[0]}
      />
      <NewFormDialog
        open={controller.dialog.length > 0 && controller.dialog[0]?.status === "form"}
        setOpen={(v) => {
          setDialog(dispatch, []);
        }}
        data={controller.dialog[0]}
      />

      {children}
    </SoftUI.Provider>
  );
}

// Next Work Dashboard React custom hook for using context
function useSoftUIController() {
  const context = useContext(SoftUI);

  if (!context) {
    throw new Error("useSoftUIController should be used inside the NextworkControllerProvider.");
  }

  return context;
}

NextworkControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setMiniSidenav = (dispatch, value) => dispatch({ type: "MINI_SIDENAV", value });
const setTransparentSidenav = (dispatch, value) => dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setDirection = (dispatch, value) => dispatch({ type: "DIRECTION", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
const setUser = (dispatch, value) => dispatch({ type: "USER", value });
const setProducts = (dispatch, value) => dispatch({ type: "PRODUCTS", value });
const setConnection = (dispatch, value) => dispatch({ type: "CONNECTION", value });
const setLoading = (dispatch, value) => dispatch({ type: "LOADING", value });
const setRent = (dispatch, value) => dispatch({ type: "RENT", value });
const setNotification = (dispatch, value) => dispatch({ type: "NOTIFICATION", value });
const setIncome = (dispatch, value) => dispatch({ type: "INCOME", value });
const setMembers = (dispatch, value) => dispatch({ type: "MEMBER", value });
const setDialog = (dispatch, value) => dispatch({ type: "DIALOG", value });
const startLoading = (dispatch, value) => dispatch({ type: "START_LOAD", value });
const setAccept = (dispatch, value) => dispatch({ type: "ACCEPT", value });

export {
  NextworkControllerProvider,
  useSoftUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setDirection,
  setLayout,
  setUser,
  setIncome,
  setRent,
  setConnection,
  setNotification,
  setLoading,
  setDialog,
  startLoading,
  setAccept,
  setProducts,
  setMembers,
};
