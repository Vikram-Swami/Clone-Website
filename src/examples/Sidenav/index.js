import { useEffect } from "react";

// react-router-dom components
import { useLocation, NavLink, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Next Work Dashboard React examples
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";

// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRoot";

// Next Work Dashboard React context
import { useSoftUIController, setMiniSidenav } from "context";
import SidenavCard from "./SidenavCard";
import { setDialog } from "context";
import { deleteData } from "api/users";
import Logo from "../../assets/images/logo.jpeg";

function Sidenav({ color, brand, routes, ...rest }) {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentSidenav, user } = controller;
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const collapseName = pathname.split("/").slice(1)[0];

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(
    ({ type, name, icon, title, noCollapse, key, route, children, href }) => {
      let returnValue;

      if (type === "collapse") {
        returnValue = href ? (
          <Link
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavCollapse
              color={color}
              name={name}
              icon={icon}
              active={key === collapseName}
              noCollapse={noCollapse}
            />
          </Link>
        ) : children ? (
          <>
            <SidenavCollapse
              color={color}
              name={name}
              icon={icon}
              active={key === collapseName}
              noCollapse={noCollapse}
              child={routes.filter((e) => e.key === key && e.type === "children")}
            />
          </>
        ) : (
          <NavLink to={route} key={key}>
            <SidenavCollapse
              color={color}
              key={key}
              name={name}
              icon={icon}
              active={key === collapseName}
              noCollapse={noCollapse}
            />
          </NavLink>
        );
      } else if (type === "title") {
        returnValue = (
          <SoftTypography
            key={key}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            opacity={0.6}
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </SoftTypography>
        );
      } else if (type === "divider") {
        returnValue = <Divider key={key} />;
      }

      return returnValue;
    }
  );

  const logoutHandler = (add) => {
    const logoutNavigate = () => {
      let referLink = window.location.origin;
      referLink += `/sign-up?sponsorId=${user.id}`;
      if (add) {
        window.location.reload();
      } else {
        window.location.replace(referLink);
      }
      setDialog(dispatch, []);
    };
    setDialog(dispatch, [
      {
        status: "form",
        action: "Logout",
        title: add ? "Are you sure to Logout." : "Kindly Logout for New Registration!",
        call: () => setTimeout(() => deleteData(logoutNavigate), 200),
      },
    ]);
  };

  return (
    <SidenavRoot {...rest} variant="permanent" ownerState={{ transparentSidenav, miniSidenav }}>
      <SoftBox pt={3} pb={1} px={4} textAlign="center">
        <SoftBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <SoftTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </SoftTypography>
        </SoftBox>
        <SoftBox
          component={NavLink}
          to="/"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {brand && <SoftBox component="img" src={Logo} alt="KNOCIAL INDIA LIMITED" width="5rem" />}
        </SoftBox>
      </SoftBox>
      <Divider />
      <List>{renderRoutes}</List>
      <SoftBox pt={2} my={2} mx={2} mt="auto">
        <SidenavCard />
        <div className="mt5">
          <button
            className="btn btn-prime"
            style={{ width: "100%" }}
            onClick={() => logoutHandler(false)}
          >
            Add Member
          </button>
        </div>
        <div className="mt5">
          <button className="btn " style={{ width: "100%" }} onClick={() => logoutHandler(true)}>
            LOGOUT
          </button>
        </div>
      </SoftBox>
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
