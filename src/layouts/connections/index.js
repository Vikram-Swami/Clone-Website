// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect } from "react";
import { Avatar, Icon } from "@mui/material";
import { getConnection } from "api/users";
import { useSoftUIController } from "context";
import { completeProfile } from "api/users";
import { useNavigate } from "react-router-dom";
import { setDialog } from "context";

function Connections() {
  const [controller, dispatch] = useSoftUIController();
  const { connection, user } = controller;
  const navigate = useNavigate();


  useEffect(() => {
    if (!user.isVerified) {
      setDialog(dispatch, [{
        status: "form",
        title: "Account Verification Required",
        message: "Complete your KYC to access your portfolio and activate your rent.",
        action: "Complete KYC",
        call: () => { completeProfile(dispatch, navigate) }
      }])
    }
    connection.length < 1 && getConnection(dispatch);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar call={() => getConnection(dispatch)} />

      <div className="d-flex mb20">

        {
          connection?.length > 0 ?
            connection?.map(e =>
              <div key={e.id} className="br-card">
                <div className="content-card">
                  <div className="d-flex j-start g8 mb20" style={{ flexWrap: "wrap" }}>
                    <div className="card-icon-space">
                      <Avatar sx={{ width: 37, height: 37 }} alt={user.fullName} fontSize="medium" src="51365.jpg" />
                    </div>
                    <h5 className="help-text" style={{ minWidth: "90px" }}>Hi, {user.fullName}</h5>
                    <span className="help-text" style={{ textTransform: "uppercase" }}>(Connection ID : {e.id})</span>

                  </div>
                  <div className="d-flex j-between mb20">
                    <div className="d-flex j-start g8">
                      <div className="card-icon-space">
                        <Icon fontSize="large" color="primary" sx={{ verticalAlign: "middle" }}>cloud</Icon>
                      </div>
                      <h4 className="textCenter">{e?.storage ?? 0} TB</h4>
                    </div>
                    <div className="d-flex j-end">
                      <p className={e.status ? "badge success" : "badge"}>{e.status ? "Active" : "Inactive"}</p>
                    </div>
                  </div>
                  <div className="card-group-content j-center">

                    <div className="card-group-content j-start">
                      <div className="d-flex j-start g8" style={{ maxWidth: "170px" }}>
                        <div className="card-icon-space">
                          <Icon fontSize="large" color="primary" sx={{ verticalAlign: "middle" }}>insights</Icon>
                        </div>
                        <div className="mx5">
                          <h5>Monthly Rent</h5>
                          <p className="help-text">{e.status ? "₹" + e?.rent : "N/A"}</p>
                        </div>
                      </div>
                      <div className="d-flex j-start g8" style={{ maxWidth: "170px" }}>
                        <div className="card-icon-space">
                          <Icon fontSize="large" color="primary" sx={{ verticalAlign: "middle" }}>insights</Icon>
                        </div>
                        <div className="mx5">
                          <h5>Bought At</h5>
                          <p className="help-text">{e.createdAt}</p>
                        </div>
                      </div>
                      <div className="d-flex j-start g8" style={{ maxWidth: "170px" }}>
                        <div className="card-icon-space">
                          <Icon fontSize="large" color="primary" sx={{ verticalAlign: "middle" }}>insights</Icon>
                        </div>
                        <div className="mx5">
                          <h5>Valid Thru</h5>
                          <p className="help-text">{e.status ? e.endDate : "N/A"}</p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex j-between g8" style={{ width: "fit-content" }}>
                      <div className="d-flex column desc-small" style={{ width: "50px" }}>
                        <Icon>visibility</Icon>
                        <span>Agreements</span>
                      </div>
                      <div className="d-flex column desc-small" style={{ width: "50px" }}>
                        <Icon>download</Icon>
                        <span>Invoice</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
            : <div className="d-flex j-center" style={{ width: "100%" }}>
              <h6 className="help-text">OH! You have not purchased a connection. Purchase Connection to Earn.</h6>
            </div>
        }
      </div>


    </DashboardLayout>
  );
}

export default Connections;
