import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import TimelineItem from "examples/Timeline/TimelineItem";
import ApiClient from "Services/ApiClient";
import { getUserNotification } from "Services/endpointes";
import { startLoading } from "context";
import { useSoftUIController } from "context";
import { setLoading } from "context";
import { setNotification } from "context";
import { toast } from "react-toastify";
import Grid from "@mui/material/Grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function Notifications() {
  const [controller, dispatch] = useSoftUIController();
  const { notifications, user } = controller;
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [visibleNotifications, setVisibleNotifications] = useState([]);
  const buttonStyle = {
    backgroundColor: "#147A5F",
    color: "white",
    padding: "4px 12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "10px",
    transition: "background-color 0.3s",
  };

  const fetchNotifications = async () => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.getData(getUserNotification);
      if (response.status === 200) {
        setNotification(dispatch, response.data);
      } else {
        setLoading(dispatch, false);
      }
    } catch (error) {
      setLoading(dispatch, false);
      toast.error(error.toString());
    }
  };

  useEffect(() => {
    if (notifications.length < 1) {
      fetchNotifications();
    }
  }, []);

  useEffect(() => {
    if (showAllNotifications) {
      setVisibleNotifications(notifications);
    } else {
      setVisibleNotifications(notifications);
    }
  }, [notifications, showAllNotifications]);

  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Mark all as read</MenuItem>
      <MenuItem onClick={closeMenu}>Delete all</MenuItem>
    </Menu>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Card className="h-100">
            <SoftBox px={3}>
              <SoftBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={3}
                pb={0}
              >
                <SoftBox>
                  <SoftTypography variant="h5" gutterBottom>
                    Notifications
                  </SoftTypography>
                </SoftBox>
                <SoftBox color="text" px={2}>
                  <Icon
                    sx={{ cursor: "pointer", fontWeight: "bold" }}
                    fontSize="small"
                    onClick={openMenu}
                  >
                    more_vert
                  </Icon>
                </SoftBox>
                {renderMenu}
              </SoftBox>

              <SoftBox mb={0}>
                <SoftTypography variant="button" color="text" fontWeight="regular">
                  <SoftTypography display="inline" variant="body2" verticalAlign="middle">
                    <Icon
                      sx={{
                        fontWeight: "bold",
                        color: ({ palette: { success } }) => success.main,
                      }}
                    >
                      arrow_upward
                    </Icon>
                  </SoftTypography>
                  &nbsp;
                  <SoftTypography variant="button" color="text" fontWeight="medium">
                    {user.unread} Unread Notifications
                  </SoftTypography>{" "}
                  this month
                </SoftTypography>
              </SoftBox>
            </SoftBox>
            <SoftBox p={2}>
              {visibleNotifications.map((item, index) => (
                <TimelineItem
                  key={index}
                  color={item.color}
                  icon={item.icon}
                  title={item.title}
                  dateTime={item.dateTime}
                />
              ))}
            </SoftBox>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default Notifications;
