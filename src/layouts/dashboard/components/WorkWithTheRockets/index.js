// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Grid, Typography } from "@mui/material";

// Images
import ivancik from "assets/ivancik.jpg";
import { Link } from "react-router-dom";
import { useSoftUIController } from "context";

function WorkWithTheRockets() {
  const generateReferLink = (id) => {
    const referLink = window.location.origin;

    return `${referLink}/sign-up/1?sponsorId=${id}&placementId=${id}`;
  };
  const [controller, dispatch] = useSoftUIController();
  const { user } = controller;
  function generateWhatsAppMessage(referralLink) {
    const companyName = "Nextwork Technologies Ltd";
    const message = `👋 Hey there!\n\nLooking to start earning?💰\nClick on this link to get started with ${companyName}.\n\nLink: ${referralLink}\n\nJoin us at ${companyName} and explore exciting opportunities to earn from the comfort of your home.\n\nHappy earning! 🚀\n\nRegards\n${user.fullName}`;
    return message;
  }

  const handleSend = (message) => {
    // Construct the WhatsApp URL with only the prewritten message
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in a new window or tab
    window.open(whatsappUrl, "_blank");
  };

  const handleCopyLink = (user) => {
    const referLink = generateReferLink(user.id);

    let message = generateWhatsAppMessage(referLink);
    setDialog(dispatch, [
      {
        status: "form",
        title: "Here is Your Refer Link",
        children: (
          <Grid container spacing={1}>
            <Grid item xs={1}>
              <Icon small>link</Icon>
            </Grid>
            <Grid item xs={11}>
              <Typography fontSize={13} whiteSpace={"nowrap"}>
                {" "}
                {referLink}
              </Typography>
            </Grid>
          </Grid>
        ),
        action: "Share",
        call: () => handleSend(message),
      },
    ]);
  };

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox position="relative" height="100%" p={2}>
        <SoftBox
          display="flex"
          flexDirection="column"
          height="100%"
          py={2}
          px={2}
          borderRadius="lg"
          sx={{
            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.dark.main, 0.8),
                rgba(gradients.dark.state, 0.8)
              )}, url(${ivancik})`,
            backgroundSize: "cover",
          }}
        >
          <SoftBox mb={3} pt={1}>
            <SoftTypography variant="h5" color="white" fontWeight="bold">
              Add New Member
            </SoftTypography>
          </SoftBox>
          <SoftBox mb={2}>
            <SoftTypography variant="body2" color="white">
              Let&apos;s grow together! Join our vibrant community and amplify possibilities with
              new connections. Your presence makes us stronger. Join us now!
            </SoftTypography>
          </SoftBox>
          <SoftBox display="flex">
            <SoftTypography
              component={Link}
              to="/create-members"
              variant="button"
              color="white"
              fontWeight="medium"
              sx={{
                mt: "auto",
                mr: "50px",
                display: "inline-flex",
                alignItems: "center",
                cursor: "pointer",
                textDecoration: "none",

                "& .material-icons-round": {
                  fontSize: "1.125rem",
                  transform: `translate(2px, -0.5px)`,
                  transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
                },

                "&:hover .material-icons-round, &:focus  .material-icons-round": {
                  transform: `translate(6px, -0.5px)`,
                },
              }}
            >
              Add
              <Icon sx={{ fontWeight: "bold" }}>add</Icon>
            </SoftTypography>
            <SoftTypography
              component={Link}
              to="/create-members"
              variant="button"
              color="white"
              onClick={() => handleCopyLink(user)}
              fontWeight="medium"
              sx={{
                mt: "auto",
                mr: "auto",
                display: "inline-flex",
                alignItems: "center",
                cursor: "pointer",
                textDecoration: "none",

                "& .material-icons-round": {
                  fontSize: "1.125rem",
                  transform: `translate(2px, -0.5px)`,
                  transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
                },

                "&:hover .material-icons-round, &:focus  .material-icons-round": {
                  transform: `translate(6px, -0.5px)`,
                },
              }}
            >
              Invite
              <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
            </SoftTypography>
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default WorkWithTheRockets;
