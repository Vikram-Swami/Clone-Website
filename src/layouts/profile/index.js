// @mui material components
import Grid from "@mui/material/Grid";
// Next Work Dashboard React components
import SoftBox from "components/SoftBox";

// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Card from "@mui/material/Card";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
// Overview page components
import { useSoftUIController } from "context";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import BillingInformation from "layouts/billing/components/BillingInformation";
import { NavLink } from "react-router-dom";
import SoftButton from "components/SoftButton";

function Overview() {
  const [controller] = useSoftUIController();
  const { user } = controller;
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={4}>
            <Card>
              <SoftBox p={2}>
                <Grid container spacing={3}>
                  <Grid
                    item
                    xs={12}
                    lg={12}
                    sx={{ position: "relative" }}
                    style={{ height: "100%" }}
                  >
                    <img
                      src="work.png"
                      alt="User Avatar"
                      style={{ width: "50%", height: "auto" }}
                    />
                    <ProfileInfoCard
                      info={{
                        fullName: <span>{user.fullName}</span>,
                        ID: user.id ?? "",
                        mobile: user?.phone,
                        email: user?.email,
                        location: user?.city + " " + user?.state + " " + user?.country,
                        addStorageLink: (
                          <NavLink to="/new-connections">
                            <SoftButton variant="gradient" color="dark" ml={2}>
                              &nbsp;Add Storage
                            </SoftButton>
                          </NavLink>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </SoftBox>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            pt={4}
            xl={8}
            style={{ height: "100%", display: "flex", flexDirection: "column", gap: "30px" }}
          >
            <ProfileInfoCard
              title="KYC information"
              info={{
                aadharNo: user?.aadharNo,
                panNo: user?.panNo,
                bankName: user?.bankName,
                accountNo: user?.accountNo,
                IFSC: user?.IFSC,
                nomineeName: user?.nomineeName,
              }}
              action={{ route: "/dashboard", tooltip: "Edit Profile" }}
            />
            <ProfileInfoCard
              title="Address information"
              info={{
                street1: user?.street1,
                street2: user?.street2,
                city: user?.city,
                state: user?.state,
                country: user?.country,
              }}
              action={{ route: "/dashboard", tooltip: "Edit Profile" }}
            />
          </Grid>
          {/* <Grid item xs={12} md={6} xl={8}>
            <ProfileInfoCard
              title="Address information"
              info={{
                street1: user?.street1,
                street2: user?.street2,
                city: user?.city,
                state: user?.state,
                country: user?.country,
              }}
              action={{ route: "/dashboard", tooltip: "Edit Profile" }}
            />
          </Grid> */}
        </Grid>
      </SoftBox>

      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Overview;
