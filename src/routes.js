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

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Create Members",
    key: "team",
    route: "/sign-up",
    icon: <Office size="12px" />,
    component: <SignUp />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Team",
    key: "team",
    route: "/my-team",
    icon: <Office size="12px" />,
    component: <Tables />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "My Connections",
    key: "team",
    route: "/connections",
    icon: <Office size="12px" />,
    component: <Connections />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Income",
    key: "team",
    route: "/income",
    icon: <Office size="12px" />,
    component: <Income />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Rents",
    key: "team",
    route: "/rents",
    icon: <Office size="12px" />,
    component: <Rents />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Account",
    key: "connection",
    route: "/billings",
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
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Refer Link",
    key: "profile",
    // route: "/profile",
    icon: <CustomerSupport size="12px" />,
    // component: <Profile />,
    noCollapse: true,
  },
];

export default routes;
