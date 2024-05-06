import React, { lazy, Suspense } from "react";
import Loading from "layouts/loading";
import RecipeReviewCard from "layouts/verifyAccount";
// NextWork Dashboard React layouts
// const Dashboard = lazy(() => import("layouts/dashboard"));
import Dashboard from "layouts/dashboard";
import ForgetPassword from "layouts/authentication/forget-password";
import Rewards from "layouts/Rewards";
import Notifications from "layouts/Notification";
import RentOnRent from "layouts/ror(rent)";
import RewardSalary from "layouts/ror(reward)";
import RentOnRoyality from "layouts/ror(royality)";
import {
  AccountBalance,
  AddCard,
  AddShoppingCart,
  EmojiEvents,
  Groups2,
  SpaceDashboard,
} from "@mui/icons-material";
const Team = lazy(() => import("layouts/Team"));
const Account = lazy(() => import("layouts/Account"));
const Connections = lazy(() => import("layouts/connections"));
const Profile = lazy(() => import("layouts/profile"));

// Lazy-loaded icons

const Shop = lazy(() => import("examples/Icons/Shop"));
const Office = lazy(() => import("examples/Icons/Office"));
const CustomerSupport = lazy(() => import("examples/Icons/CustomerSupport"));
const CreditCard = lazy(() => import("examples/Icons/CreditCard"));
const Income = lazy(() => import("layouts/Income/income"));
const Rents = lazy(() => import("layouts/Rents"));
const Products = lazy(() => import("layouts/Products"));
const CreateMembers = lazy(() => import("layouts/CreateMember"));
const SignUp = lazy(() => import("layouts/authentication/sign-up"));
const SignIn = lazy(() => import("layouts/authentication/sign-in"));

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    auth: "user",
    route: "/dashboard",
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
    type: "route",
    name: "My Profile",
    auth: "user",
    key: "my-profile",
    route: "/my-profile",
    component: <Profile />,
    noCollapse: true,
  },
  {
    type: "route",
    name: "SignUp",
    Key: "signup",
    auth: null,
    route: "sign-up/:step",

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
    name: "Create Members",
    key: "create-members",
    auth: "user",
    route: "/create-members",
    icon: <Office size="12px" />,
    component: <CreateMembers />,
    noCollapse: true,
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
    type: "collapse",
    name: "New Connection",
    key: "new-connections",
    auth: "any",
    route: "/new-connections",
    icon: <AddShoppingCart size="12px" />,
    component: <Products />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "My Connections",
    key: "connections",
    route: "/connections",
    icon: <AddCard size="12px" />,
    component: <Connections />,
    auth: "any",
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "My Team",
    auth: "user",
    key: "my-team",
    route: "/my-team",
    icon: <Groups2 size="12px" />,
    component: <Team />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Income",
    key: "incomes",
    auth: "any",
    route: "/incomes",
    icon: <Office size="12px" />,
    component: <Income />,
    noCollapse: true,
  },
  { type: "title", title: "My Benefits", key: "rent-title" },
  {
    type: "collapse",
    name: "ROR",
    key: "rents-on-rent",
    auth: "any",
    route: "rents-on-rent",
    icon: <Office size="12px" />,
    component: <RentOnRent />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "My Reawrds",
    key: "reward-salary",
    auth: "any",
    route: "reward-salary",
    icon: <Office size="12px" />,
    component: <RewardSalary />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Royality",
    key: "rent-on-royality",
    auth: "any",
    route: "rent-on-royality",
    icon: <Office size="12px" />,
    component: <RentOnRoyality />,
    noCollapse: true,
  },
  { type: "title", title: "My Account", key: "account-pages" },
  {
    type: "collapse",
    name: "Account",
    key: "account",
    route: "/account",
    auth: "any",
    icon: <AccountBalance size="12px" />,
    component: <Account />,
    noCollapse: true,
  },

  { type: "title", title: "Benefits", key: "benefits_page" },

  {
    type: "collapse",
    name: " Rewards",
    auth: "any",
    key: "rewards",
    route: "/rewards",
    component: <Rewards />,
    icon: <EmojiEvents size="12px" />,
    noCollapse: true,
  },
];
export default routes;

export const components = {
  dashboard: (
    <Suspense fallback={<Loading condition={true} />}>
      <Dashboard />
    </Suspense>
  ),
  VerifyAccount: (
    <Suspense fallback={<Loading condition={true} />}>
      <RecipeReviewCard />
    </Suspense>
  ),
  createMembers: (
    <Suspense fallback={<Loading condition={true} />}>
      <CreateMembers />
    </Suspense>
  ),
  myTeam: (
    <Suspense fallback={<Loading condition={true} />}>
      <Team />
    </Suspense>
  ),
  connections: (
    <Suspense fallback={<Loading condition={true} />}>
      <Connections />
    </Suspense>
  ),
  income: (
    <Suspense fallback={<Loading condition={true} />}>
      <Income />
    </Suspense>
  ),
  rents: (
    <Suspense fallback={<Loading condition={true} />}>
      {" "}
      <Rents />
    </Suspense>
  ),
  products: (
    <Suspense fallback={<Loading condition={true} />}>
      <Products />
    </Suspense>
  ),
  account: (
    <Suspense fallback={<Loading condition={true} />}>
      {" "}
      <Account />
    </Suspense>
  ),
  profile: (
    <Suspense fallback={<Loading condition={true} />}>
      <Profile />
    </Suspense>
  ),
};

export const icons = {
  dashboard: <Shop size="12px" />,
  createMembers: <Office size="12px" />,
  myTeam: <Office size="12px" />,
  connections: <Office size="12px" />,
  income: <Office size="12px" />,
  rents: <Office size="12px" />,
  products: <CreditCard size="12px" />,
  account: <CreditCard size="12px" />,
  profile: <CustomerSupport size="12px" />,
};
