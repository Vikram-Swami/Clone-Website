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

import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
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
                  size="xl"
                  shadow="sm"
                />
              </Grid>
              <Grid item xs={12} md={8} lg={8}>
                <SoftBox mt={0.5} lineHeight={1}>
                  <SoftTypography variant="h4" fontWeight="medium">
                    {user.initial}
                    {user.fullName}
                  </SoftTypography>
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

          {/* Content for each tab */}
          <Grid item xs={12}>
            {tabValue === 0 && (
              <ProfileInfoCard
                info={{
                  fullName: <span>{user.fullName}</span>,
                  ID: user.id ?? "",
                  mobile: user?.phone,
                  email: user?.email,
                  joined: user?.createdAt,
                  location: user?.city + " " + user?.state + " " + user?.country
                }}
              />
            )}
            {tabValue === 1 && (
              <ProfileInfoCard
                title="Address information"
                info={{
                  street: user?.street,
                  city: user?.city,
                  state: user?.state,
                  country: user?.country,
                }}
                action={{ route: "/dashboard", tooltip: "Edit Profile" }}
              />
            )}
            {tabValue === 2 && (
              <ProfileInfoCard
                title="KYC information"
                info={{
                  accountType: user?.type,
                  aadharNo: user?.aadharNo,
                  panNo: user?.panNo,
                  accountNo: user?.accountNo,
                  IFSC: user?.IFSC,
                  nomineeName: user?.nomineeName,

                }}

                action={{ route: "/home", tooltip: "Modify Info" }}
              />
            )}
            {/* <img src={user?.aadharFile} alt="Aadhar Card" /> */}
          </Grid>
        </Grid>
      </Card>
    </SoftBox>
  );
}

export default Header;
