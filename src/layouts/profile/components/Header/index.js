import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";

// Next Work Dashboard React examples
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Next Work Dashboard React base styles
import breakpoints from "assets/theme/base/breakpoints";

import { useSoftUIController } from "context";

function Header() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [controller] = useSoftUIController();
  const { user } = controller;
  useEffect(() => {

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


  return (
    <SoftBox position="relative">
      <DashboardNavbar absolute light />

      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <SoftAvatar icon={{ color: "green", component: " person4" }} />
          </Grid>
          <Grid item>
            <SoftBox height="100%" mt={0.5} lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                {user?.fullName}
              </SoftTypography>
              <SoftTypography variant="button" color="text" fontWeight="medium">
                {user?.designationId?.length > 1 ? user?.designationId : "User"}
              </SoftTypography>
            </SoftBox>
          </Grid>
        </Grid>
      </Card>
    </SoftBox>
  );
}

export default Header;
