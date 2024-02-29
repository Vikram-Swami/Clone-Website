// NextWork Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Connections from "layouts/connections";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignUp from "layouts/authentication/sign-up";

// NextWork Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Income from "layouts/Income/income";
import Rents from "layouts/Rents";
import Products from "layouts/Products";
import CreateMember from "components/CreateMember";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    auth: "user",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Create Members",
    key: "create-members",
    auth: "user",
    route: "/create-members",
    icon: <Office size="12px" />,
    component: <CreateMember />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Team",
    auth: "user",
    key: "my-team",
    route: "/my-team",
    icon: <Office size="12px" />,
    component: <Tables />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "My Connections",
    key: "connections",
    route: "/connections",
    icon: <Office size="12px" />,
    component: <Connections />,
    auth: "any",
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Income",
    key: "income",
    auth: "any",
    route: "/income",
    icon: <Office size="12px" />,
    component: <Income />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Rents",
    key: "rents",
    auth: "any",
    route: "/rents",
    icon: <Office size="12px" />,
    component: <Rents />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Products",
    key: "products",
    auth: "any",
    route: "/products",
    icon: <CreditCard size="12px" />,
    component: <Products />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Account",
    key: "account",
    route: "/account",
    auth: "any",
    icon: <CreditCard size="12px" />,
    component: <Billing />,
    noCollapse: true,
  },

  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    auth: "any",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Refer Link",
    auth: "user",
    key: "referLink",
    // route: "/profile",
    icon: <CustomerSupport size="12px" />,
    // component: <Profile />,
    noCollapse: true,
  },
];

export default routes;
