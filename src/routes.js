import React, { lazy, Suspense } from "react";
import RecipeReviewCard from "layouts/verifyAccount";
// NextWork Dashboard React layouts
// const Dashboard = lazy(() => import("layouts/dashboard"));
import Dashboard from "layouts/dashboard";
import ForgetPassword from "layouts/authentication/forget-password";
import Notifications from "layouts/Notification";
import RentOnRent from "layouts/Incomes";
import {
  AccountBalance,
  AccountCircle,
  AddCard,
  AddShoppingCart,
  Groups2,
  SpaceDashboard,
} from "@mui/icons-material";
import CompleteKYC from "layouts/authentication/KYC";
import CircularWithValueLabel from "components/Progress";
const Team = lazy(() => import("layouts/Team"));
const Account = lazy(() => import("layouts/Account"));
const Connections = lazy(() => import("layouts/connections"));
const Profile = lazy(() => import("layouts/profile"));

// Lazy-loaded icons

const Shop = lazy(() => import("examples/Icons/Shop"));
const Office = lazy(() => import("examples/Icons/Office"));
const CustomerSupport = lazy(() => import("examples/Icons/CustomerSupport"));
const CreditCard = lazy(() => import("examples/Icons/CreditCard"));
const Products = lazy(() => import("layouts/Products"));
const SignUp = lazy(() => import("layouts/authentication/sign-up"));
const SignIn = lazy(() => import("layouts/authentication/sign-in"));

const routes = [
  {
    type: "route",
    name: "Home",
    key: "home",
    auth: "user",
    route: "/home",
    icon: <SpaceDashboard size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "route",
    name: "VerifyAccount",
    key: "VerifyAccount",
    auth: null,
    route: "/verify-account/:id",
    icon: <Shop size="12px" />,
    component: <RecipeReviewCard />,
    noCollapse: true,
  },

  {
    type: "menubar",
    name: "Profile",
    auth: "user",
    key: "profile",
    route: "/profile",
    component: <Profile />,
    icon: <AccountCircle fontSize="2rem" />,
    noCollapse: true,
  },
  {
    type: "route",
    name: "SignUp",
    Key: "signup",
    auth: null,
    route: "/sign-up",

    component: <SignUp />,
    noCollapse: false,
  },
  {
    type: "route",
    name: "SignIn",
    Key: "signin",
    auth: null,
    route: "/",
    component: <SignIn />,
    noCollapse: false,
  },
  {
    type: "route",
    name: "ForgetPass",
    Key: "reset-password",
    auth: null,
    route: "/reset-password",
    component: <ForgetPassword />,
    noCollapse: false,
  },
  {
    type: "route",
    name: "Notifications",
    key: "notifictions",
    auth: "user",
    route: "/notifications",
    icon: <Office size="12px" />,
    component: <Notifications />,
    noCollapse: true,
  },
  {
    type: "route",
    name: "KYC",
    key: "kyc",
    auth: "user",
    route: "/complete-KYC",
    icon: <Office size="12px" />,
    component: <CompleteKYC />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Inventory",
    key: "inventory",
    auth: "any",
    route: "/inventory",
    icon: <AddShoppingCart size="12px" />,
    component: <Products />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Portfolio",
    key: "portfolio",
    route: "/portfolio",
    icon: <AddCard size="12px" />,
    component: <Connections />,
    auth: "any",
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Team",
    auth: "user",
    key: "team",
    route: "/team",
    icon: <Groups2 size="12px" />,
    component: <Team />,
    noCollapse: true,
  },

  // {
  //   type: "route",
  //   name: "My Incomes",
  //   key: "my-incomes",
  //   auth: "any",
  //   route: "/my-incomes",
  //   icon: <Office size="12px" />,
  //   component: <Income />,
  //   noCollapse: true,
  // },

  {
    type: "collapse",
    name: "Incomes",
    key: "incomes",
    auth: "any",
    route: "/incomes",
    icon: <Office size="12px" />,
    component: <RentOnRent />,
    noCollapse: true,
  },
  { type: "title", title: "WALLET & TRANSACTIONS" },
  {
    type: "collapse",
    name: "Account Info",
    key: "account",
    route: "/account",
    auth: "any",
    icon: <AccountBalance fontSize="1rem" />,
    component: <Account />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Rewards",
  //   auth: "any",
  //   key: "claim-new-reward",
  //   route: "/claim-new-reward",
  //   component: <Rewards />,
  //   icon: <EmojiEvents size="12px" />,
  //   noCollapse: true,
  // },
];
export default routes;

export const components = {
  dashboard: (
    <Suspense fallback={<CircularWithValueLabel condition={true} />}>
      <Dashboard />
    </Suspense>
  ),
  VerifyAccount: (
    <Suspense fallback={<CircularWithValueLabel condition={true} />}>
      <RecipeReviewCard />
    </Suspense>
  ),
  myTeam: (
    <Suspense fallback={<CircularWithValueLabel condition={true} />}>
      <Team />
    </Suspense>
  ),
  connections: (
    <Suspense fallback={<CircularWithValueLabel condition={true} />}>
      <Connections />
    </Suspense>
  ),
  rents: (
    <Suspense fallback={<CircularWithValueLabel condition={true} />}>
      {" "}
      <RentOnRent />
    </Suspense>
  ),
  products: (
    <Suspense fallback={<CircularWithValueLabel condition={true} />}>
      <Products />
    </Suspense>
  ),
  account: (
    <Suspense fallback={<CircularWithValueLabel condition={true} />}>
      {" "}
      <Account />
    </Suspense>
  ),
  profile: (
    <Suspense fallback={<CircularWithValueLabel condition={true} />}>
      <Profile />
    </Suspense>
  ),
};

export const icons = {
  dashboard: <Shop size="12px" />,
  myTeam: <Office size="12px" />,
  connections: <Office size="12px" />,
  income: <Office size="12px" />,
  rents: <Office size="12px" />,
  products: <CreditCard size="12px" />,
  account: <CreditCard size="12px" />,
  profile: <CustomerSupport size="12px" />,
};
