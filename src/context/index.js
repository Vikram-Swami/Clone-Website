// context.js

import { createContext, useContext, useReducer, useMemo } from "react";
import PropTypes from "prop-types";
import UserModel from "Models/User";
import ConnectionsModel from "Models/Connection";

import NewFormDialog from "components/NewDialog";
import RentModel from "Models/Rents";
import IncomeLog from "Models/Income";
import Notification from "Models/Notification";
import Transaction from "Models/Transaction";

import RewardsModel from "Models/Rewards";
import Claims from "Models/Rewards/claims";
import Products from "Models/Products";

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
      return {
        ...state,
        loading: false,
        user: new UserModel().toJson(action.value),
        otp: {}
      };
    }
    case "RENT": {
      return { ...state, loading: false, rent: new RentModel().fromArray(action.value) };
    }
    case "MEMBER": {
      return { ...state, loading: false, member: new UserModel().memberToArray(action.value) };
    }
    case "REWARDS": {
      return { ...state, loading: false, rewards: new RewardsModel().fromArray(action.value) };
    }
    case "CLAIMS": {
      return { ...state, loading: false, claims: new Claims().fromArray(action.value) };
    }
    case "INCOME": {
      return { ...state, loading: false, income: new IncomeLog().fromArray(action.value) };
    }
    case "TRANSACTION": {
      return { ...state, loading: false, transaction: new Transaction().fromArray(action.value) };
    }
    case "LOADING": {
      return { ...state, loading: action.value };
    }
    case "STEP": {
      return { ...state, loading: false, step: action.value };
    }
    case "CONNECTION": {
      return {
        ...state,
        loading: false,
        connection: new ConnectionsModel().fromArray(action.value),
      };
    }
    case "NOTIFICATION": {
      return {
        ...state,
        loading: false,
        notifications: new Notification().fromArray(action.value?.reverse()),
      };
    }
    case "DIALOG": {
      return { ...state, dialog: action.value, loading: false, accept: false };
    }
    case "OTP": {
      return { ...state, otp: action.value, loading: false };
    }
    case "PRODUCTS": {
      return { ...state, products: new Products().fromArray(action.value), loading: false, dialog: [] };
    }
    case "ACCEPT": {
      return { ...state, accept: action.value };
    }
    case "START_LOAD": {
      return { ...state, dialog: [], loading: action.value };
    }
    default: {
      return { ...state, loading: false };
    }
  }
}

// Next Work Dashboard React context provider
function KnooneControllerProvider({ children }) {
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
    rewards: [],
    claims: [],
    member: [],
    directMember: [],
    income: [],
    transaction: [],
    accept: false,
    step: 0,
    otp: {},
    loading: false,
  };
  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return (
    <SoftUI.Provider value={value}>
      {/* Conditionally render loader */}


      <NewFormDialog
        open={controller.dialog.length > 0}
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
    throw new Error("useSoftUIController should be used inside the KnooneControllerProvider.");
  }

  return context;
}

KnooneControllerProvider.propTypes = {
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
const setRewards = (dispatch, value) => dispatch({ type: "REWARDS", value });
const setNotification = (dispatch, value) => dispatch({ type: "NOTIFICATION", value });
const setIncome = (dispatch, value) => dispatch({ type: "INCOME", value });
const setTransaction = (dispatch, value) => dispatch({ type: "TRANSACTION", value });
const setMembers = (dispatch, value) => dispatch({ type: "MEMBER", value });
const setClaims = (dispatch, value) => dispatch({ type: "CLAIMS", value });
const setDialog = (dispatch, value) => dispatch({ type: "DIALOG", value });
const setConfirmDialog = (dispatch, value) => dispatch({ type: "CONFIRMDIALOG", value });
const startLoading = (dispatch, value) => dispatch({ type: "START_LOAD", value });
const setAccept = (dispatch, value) => dispatch({ type: "ACCEPT", value });
const setStep = (dispatch, value) => dispatch({ type: "STEP", value });
const setOtp = (dispatch, value) => dispatch({ type: "OTP", value });

export {
  KnooneControllerProvider,
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
  setRewards,
  setIncome,
  setTransaction,
  setClaims,
  setRent,
  setConnection,
  setNotification,
  setLoading,
  setDialog,
  setConfirmDialog,
  startLoading,
  setAccept,
  setStep,
  setProducts,
  setMembers,
  setOtp
};
