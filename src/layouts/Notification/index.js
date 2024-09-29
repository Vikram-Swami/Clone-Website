import { useEffect } from "react";
import Icon from "@mui/material/Icon";
import { useSoftUIController } from "context";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { setDialog } from "context";
import { fetchNotifications } from "api/users";
import { markReadNotif } from "api/users";
import { deleteAllNotif } from "api/users";

function Notifications() {
  const [controller, dispatch] = useSoftUIController();
  const { notifications } = controller;



  // useEffect(() => {
  // if (showAllNotifications) {
  //   setVisibleNotifications(notifications);
  // } else {
  //   setVisibleNotifications(notifications);
  // }
  // }, [notifications, showAllNotifications]);





  useEffect(() => {
    if (notifications.length < 1) {
      fetchNotifications(dispatch);
    }
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar call={() => fetchNotifications(dispatch)} />
      <div className="card transactions" style={{ minHeight: "100%", lineHeight: "20px" }}>
        <div className="d-flex j-between">
          <h5 style={{ textTransform: "uppercase" }}>Notifications</h5>
          <div className="d-flex j-end g8">
            <Icon color="error" sx={{ cursor: "pointer" }} onClick={() => { setDialog(dispatch, [{ status: "form", title: "Confirmation Requried!", message: "All Notification wil be deleted after this action.", action: "Confirm", call: () => { deleteAllNotif(dispatch) } }]) }}>delete</Icon>
            <span className="help-text mx5 c-point" onClick={() => { setDialog(dispatch, [{ status: "form", title: "Confirmation Requried!", message: "All Notification wil be marked as read after this action.", action: "Confirm", call: () => { markReadNotif(dispatch) } }]) }}>Mark All<Icon>done_all</Icon></span>
          </div>
        </div>

        <div className="card-body">

          {notifications?.length > 0 ?
            notifications.map(e =>
              <div key={e.id} className="d-flex j-center mb20" style={{ paddingBottom: "20px", flexWrap: "wrap", borderBottom: '1px solid grey', lineHeight: '1' }} >
                <div className="d-flex j-center mb10">
                  <div className="d-flex g8 mb10" style={{ flexDirection: "row", justifyContent: "start" }}>
                    <Icon fontSize="large">notifications</Icon>
                    <p className="help-text" style={{ textTransform: "uppercase" }}>{e.title ?? ""} </p>


                  </div>
                  {e.status ? <Icon className="badge success">done_all</Icon> : <Icon className="badge error">mark_chat_unread</Icon>}
                </div>
                <div className="desc-small mb20" >
                  <p className="help-text">Reference : ( {e.sourceId} )</p>
                </div>
                <div className="g8 mb10 d-flex j-start " style={{ flexDirection: "row", justifyContent: "start", fontSize: "0.8rem" }}>
                  <Icon fontSize="medium" >watch_later</Icon>
                  <span>{e.createdAt}</span>
                </div>

              </div>)
            :
            <div className="d-flex">
              <h6 className="help-text">No Notifications Found.</h6>
            </div>
          }
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Notifications;
