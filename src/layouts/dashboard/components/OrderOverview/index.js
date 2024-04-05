import { useEffect } from "react";
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

function OrdersOverview() {
  const [controller, dispatch] = useSoftUIController();
  const { notifications, user } = controller;
  const fetchNotifications = async () => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.getData(getUserNotification);
      if (response.status == 200) {
        setNotification(dispatch, response.data);
      } else {
        setLoading(dispatch, false);
      }
    } catch (error) {
      setLoading(dispatch, false)
      toast.error(error.toString());
    }
  };
  useEffect(() => {

    notifications.length < 1 && fetchNotifications();
  }, []);

  return (
    <Card className="h-100">
      <SoftBox pt={3} px={3}>
        <SoftTypography variant="h6" fontWeight="medium">
          Notifications
        </SoftTypography>
        <SoftBox mt={1} mb={2}>
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
        {notifications?.map((item, index) => (
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
  );
}

export default OrdersOverview;
