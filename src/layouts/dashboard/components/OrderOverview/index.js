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
import SoftButton from "components/SoftButton";
import { NavLink } from "react-router-dom";

function OrdersOverview() {
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
      setVisibleNotifications(notifications.slice(0, 1));
    }
  }, [notifications, showAllNotifications]);

  const handleViewMoreLess = () => {
    setShowAllNotifications(!showAllNotifications);
  };

  return (
    <Card className="h-100">
      <SoftBox pt={3} px={3}>
        <SoftTypography variant="h6" fontWeight="medium">
          Notifications
        </SoftTypography>
        <SoftBox mt={1} mb={0}>
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
        {notifications.length > 1 && (
          <NavLink to="/notifications">
            {" "}
            <SoftButton variant="gradient" color="dark" ml={2}>
              &nbsp;View More
            </SoftButton>
          </NavLink>
        )}
      </SoftBox>
    </Card>
  );
}

export default OrdersOverview;
