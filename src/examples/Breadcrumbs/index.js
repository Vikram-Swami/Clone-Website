// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import { Box, Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import Icon from "@mui/material/Icon";

// Next Work Dashboard React components
import SoftTypography from "components/SoftTypography";

function Breadcrumbs({ icon, title, route, light, call }) {
  const routes = route.slice(0, -1);

  return (
    <Box display="flex" alignItems="center" gap={3} mr={{ xs: 0, xl: 8 }}>
      <MuiBreadcrumbs
        sx={{
          whiteSpace: "nowrap",
          "& .MuiBreadcrumbs-separator": {
            color: ({ palette: { white, grey } }) => (light ? white.main : grey[600]),
          },
        }}
      >
        <Link to="/">
          <span
            style={{ color: light ? "white" : "black", opacity: light ? 0.8 : 0.5 }}

            opacity={light ? 0.8 : 0.5}
          >
            <Icon className="c-point">{icon}</Icon>
          </span>
        </Link>
        {routes.map((el) => (
          <Link to={`/${el}`} key={el}>
            <SoftTypography
              component="span"
              variant="button"
              fontWeight="regular"
              textTransform="capitalize"
              color={light ? "white" : "dark"}
              opacity={light ? 0.8 : 0.5}
              sx={{ lineHeight: 0 }}
            >
              {el}
            </SoftTypography>
          </Link>
        ))}
        <SoftTypography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          color={light ? "white" : "dark"}
          sx={{ lineHeight: 0 }}
        >
          {title.replace("-", " ")}
        </SoftTypography>
      </MuiBreadcrumbs>
      <p className="c-point" onClick={call}>
        <Icon style={{ verticalAlign: "middle" }}>refresh</Icon>
      </p>
    </Box>
  );
}

// Setting default values for the props of Breadcrumbs
Breadcrumbs.defaultProps = {
  light: false,
  call: () => { }
};

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  icon: PropTypes.node.isRequired,
  call: PropTypes.func,
  title: PropTypes.string.isRequired,
  route: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  light: PropTypes.bool,
};

export default Breadcrumbs;
