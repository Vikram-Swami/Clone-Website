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

function OrdersOverview() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [controller, dispatch] = useSoftUIController();
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        startLoading(dispatch, true);
        const response = await ApiClient.getData(getUserNotification);
        setNotifications(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchNotifications();
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
              24%
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
