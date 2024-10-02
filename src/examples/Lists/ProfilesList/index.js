import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";

// Next Work Dashboard React base styles
import breakpoints from "assets/theme/base/breakpoints";
import { AccountBalance, AccountCircle, Home } from "@mui/icons-material";
import { useSoftUIController } from "context";

function Header() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [controller] = useSoftUIController();
  const { user } = controller;

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <SoftBox position="relative">
      <Card>
        <Grid container spacing={2} alignItems="center" p={2}>
          {/* Profile Avatar and Info */}
          <Grid item xs={12} md={6} lg={6}>
            <Grid container alignItems="center">
              <Grid item xs={12} md={4} lg={3}>
                <SoftAvatar
                  src={user?.image ? user.image : "51365.jpg"}
                  alt="profile-image"
                  variant="rounded"
                  size="xxl"
                  shadow="sm"
                />
              </Grid>
              <Grid item xs={12} md={8} lg={8}>
                <SoftBox mt={0.5} lineHeight={1}>
                  <h5>
                    {user.initial} {user.fullName}
                  </h5>
                  <SoftTypography variant="button" color="text" fontWeight="medium">
                    {user.role}
                  </SoftTypography>
                </SoftBox>
              </Grid>
            </Grid>
          </Grid>

          {/* Tabs for Personal, Address, and KYC */}
          <Grid item xs={12} md={6} lg={6}>
            <AppBar position="static">
              <Tabs
                value={tabValue}
                onChange={handleSetTabValue}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                sx={{ background: "transparent" }}
              >
                <Tab label="Personal" icon={<AccountCircle />} />
                <Tab label="Address" icon={<Home />} />
                <Tab label="KYC" icon={<AccountBalance />} />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>


        {/* Content for each tab */}

        {tabValue === 0 && (
          <div className="br-card">
            <div className="d-flex j-start column">
              <div className="d-flex j-between g8 desc-small" style={{ whiteSpace: "pre-line", width: "fit-content" }}>

                <h4>FullName</h4> : <p>{user.fullName}</p>
              </div>
              <div className="d-flex j-between g8 desc-small" style={{ whiteSpace: "pre-line", width: "fit-content" }}>
                <h4>User ID</h4> : <p>{user?.id}</p>
              </div>
              <div className="d-flex j-between g8 desc-small" style={{ whiteSpace: "pre-line", width: "fit-content" }}>
                <h4>Email</h4> : <p>{user?.email}</p>
              </div>
              <div className="d-flex j-between g8 desc-small" style={{ whiteSpace: "pre-line", width: "fit-content" }}>

                <h4>Phone</h4> : <p>{user.phone}</p>
              </div>
              <div className="d-flex j-between g8 desc-small" style={{ whiteSpace: "pre-line", width: "fit-content" }}>

                <h4>Joined On</h4> : <p>{user?.createdAt}</p>
              </div>
            </div>
          </div>
        )}
        {tabValue === 1 && (
          <div className="br-card">
            <div className="d-flex column">
              <div className="d-flex j-between g8 desc-small" style={{ whiteSpace: "pre-line", width: "fit-content" }}>

                <h4>Street</h4> : <p>{user.street}</p>
              </div>
              <div className="d-flex j-between g8 desc-small" style={{ whiteSpace: "pre-line", width: "fit-content" }}>

                <h4>City</h4> : <p>{user?.city}</p>
              </div>
              <div className="d-flex j-between g8 desc-small" style={{ whiteSpace: "pre-line", width: "fit-content" }}>

                <h4>State</h4> : <p>{user?.state}</p>
              </div>
              <div className="d-flex j-between g8 desc-small" style={{ whiteSpace: "pre-line", width: "fit-content" }}>

                <h4>Country</h4> : <p>{user.country}</p>
              </div>
            </div>
          </div>
        )}
        {tabValue === 2 && (
          <div className="br-card">
            <div className="d-flex column" style={{ whiteSpace: "wrap" }}>
              <div className="d-flex j-between g8 desc-small" style={{ whiteSpace: "pre-line", width: "fit-content" }}>

                <h4>Account Type</h4> : <p>{user.type}</p>
              </div>
              <div className="d-flex j-between g8 desc-small" style={{ whiteSpace: "pre-line", width: "fit-content" }}>

                <h4>Aadhar Number</h4> : <p>{user?.aadharNo}</p>
              </div>
              <div className="d-flex j-between g8 desc-small" style={{ whiteSpace: "pre-line", width: "fit-content" }}>

                <h4>Pan No</h4> : <p>*******{user?.panNo.substr(-4)}</p>
              </div>
              <div className="d-flex j-between g8 desc-small" style={{ whiteSpace: "pre-line", width: "fit-content" }}>

                <h4>Bank Account No</h4> : <p>{user.accountNo}</p>
              </div>
              <div className="d-flex j-between g8 desc-small" style={{ whiteSpace: "pre-line", width: "fit-content" }}>

                <h4>IFSC</h4> : <p>{user?.IFSC}</p>
              </div>
              <div className="d-flex j-between g8 desc-small" style={{ whiteSpace: "pre-line", width: "fit-content" }}>

                <h4>Nominee</h4> : <p>{user?.nomineeName}</p>
              </div>
            </div>
          </div>
        )}

      </Card>
    </SoftBox>
  );
}

export default Header;
