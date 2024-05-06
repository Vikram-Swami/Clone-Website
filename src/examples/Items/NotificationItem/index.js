import { forwardRef } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// custom styles for the NotificationItem
import { menuItem, menuImage } from "examples/Items/NotificationItem/styles";
import { NavLink } from "react-router-dom";

const NotificationItem = forwardRef(({ title, ...rest }, ref) => (
  <MenuItem {...rest} ref={ref} sx={(theme) => menuItem(theme)}>
    <SoftBox mt={1} mr={2} mb={0.25} borderRadius="lg">
      <Icon>notifications_active </Icon>
    </SoftBox>
    <SoftBox>
      <NavLink to={"/notifications"}>
        <SoftTypography variant="button" textTransform="capitalize" fontWeight="regular">
          <strong>{title.substring(0, 20)}...</strong>
        </SoftTypography>
      </NavLink>
    </SoftBox>
  </MenuItem>
));

// Setting default values for the props of NotificationItem
NotificationItem.defaultProps = {
  color: "dark",
};

// Typechecking props for the NotificationItem
NotificationItem.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  image: PropTypes.node.isRequired,
  title: PropTypes.arrayOf(PropTypes.string).isRequired,
  date: PropTypes.string.isRequired,
};

export default NotificationItem;
