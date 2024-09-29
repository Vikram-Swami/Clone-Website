// @mui material components
import Grid from "@mui/material/Grid";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import reward from "../../assets/images/reward.png"

// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Dashboard layout components
import { useSoftUIController } from "context";
// import OrdersOverview from "./components/OrderOverview";
import { getUser } from "api/users";
import CardOne from "./components/CardOne";
import StaticsCard from "./components/StaticsCard/Index";
import ProductCard from "components/ProductCard";
import { useEffect } from "react";
import { setDialog } from "context";
import { completeProfile } from "api/users";
import { useNavigate } from "react-router-dom";
import Rewards from "./components/Rewards";

// import Countdown from "components/Countdown";

function Dashboard() {
  const [controller, dispatch] = useSoftUIController();
  const { user } = controller;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isVerified) {
      setDialog(dispatch, [{
        status: "form",
        title: "Account Verification Required",
        message: "Please complete your KYC to unlock more features and seize new opportunities.",
        action: "Complete KYC",
        call: () => { completeProfile(dispatch, navigate) }
      }])
    }
  }, [])

  return (
    <DashboardLayout>
      <DashboardNavbar call={() => getUser(dispatch)} />
      <SoftBox py={3}>

        <Grid container spacing={3} style={{ height: "400px !important", overflow: "hidden" }}>
          <Grid item xs={12} lg={6} >
            <StaticsCard user={user} />
          </Grid>
          <Grid item xs={12} lg={6} mb={1}>
            <CardOne />
          </Grid>
          <Grid item xs={12} lg={12} >
            <ProductCard />
          </Grid>
          <Grid item xs={12} lg={12} mb={3}>
            <div className="br-card d-flex j-center" style={{ maxWidth: '100%', position: 'relative' }}>
              <div className="textCenter">
                <h3 style={{ color: "black", zIndex: 111, position: "relative", textTransform: "uppercase", fontSize: "1rem" }}>Refer & Earn 5/100  & Exiting Rewards Instant</h3>
              </div>
              <img width={"100px"} height={"100px"} className="reward-icon" src={reward} alt="reward" />
            </div>
          </Grid>
          <Grid item xs={12} lg={6} mb={3}>
            <div className="card card-image" style={{ maxHeight: "100%" }}>
              <div className="d-flex column desc-small" style={{ padding: "20px" }}>
                <p>
                  Success is not the result of luck or chance, but the outcome of consistent effort and determination. Every great achievement starts with a single step, taken by those who dare to dream and persevere. The road to reward may be filled with challenges, but it’s in those moments of difficulty that true strength and character are forged. Each day, with every task you complete and every obstacle you overcome, you’re moving closer to your goals. Don’t let temporary setbacks define your journey. Instead, let them fuel your desire to push harder, learn more, and grow stronger. Remember, the effort you invest today will shape the rewards you enjoy tomorrow. Stay committed, stay focused, and believe in your potential—because the reward is not just the end goal, it’s also the person you become along the way.
                </p>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} lg={6} >
            <Rewards />
          </Grid>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Dashboard;
