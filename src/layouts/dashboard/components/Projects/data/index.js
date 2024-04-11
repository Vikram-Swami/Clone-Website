// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftProgress from "components/SoftProgress";

// Images
import team1 from "assets/team-1.jpg";
import team2 from "assets/team-2.jpg";
import team3 from "assets/team-3.jpg";
import team4 from "assets/team-4.jpg";

export default function data() {
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <SoftAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  return {
    columns: [
      { name: "companies", align: "left" },
      { name: "members", align: "left" },
      { name: "budget", align: "center" },
      { name: "completion", align: "center" },
    ],

    rows: [
      {
        members: (
          <SoftBox display="flex" py={1}>
            {avatars([
              [team1, "Ryan Tompson"],
              [team2, "Romina Hadid"],
              [team3, "Alexander Smith"],
              [team4, "Jessica Doe"],
            ])}
          </SoftBox>
        ),
        budget: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            $14,000
          </SoftTypography>
        ),
        completion: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={60} color="info" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        members: (
          <SoftBox display="flex" py={1}>
            {avatars([
              [team2, "Romina Hadid"],
              [team4, "Jessica Doe"],
            ])}
          </SoftBox>
        ),
        budget: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            $3,000
          </SoftTypography>
        ),
        completion: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={10} color="info" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        members: (
          <SoftBox display="flex" py={1}>
            {avatars([
              [team1, "Ryan Tompson"],
              [team3, "Alexander Smith"],
            ])}
          </SoftBox>
        ),
        budget: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            Not set
          </SoftTypography>
        ),
        completion: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={100} color="success" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        members: (
          <SoftBox display="flex" py={1}>
            {avatars([
              [team4, "Jessica Doe"],
              [team3, "Alexander Smith"],
              [team2, "Romina Hadid"],
              [team1, "Ryan Tompson"],
            ])}
          </SoftBox>
        ),
        budget: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            $20,500
          </SoftTypography>
        ),
        completion: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={100} color="success" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        members: (
          <SoftBox display="flex" py={1}>
            {avatars([[team4, "Jessica Doe"]])}
          </SoftBox>
        ),
        budget: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            $500
          </SoftTypography>
        ),
        completion: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={25} color="info" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        members: (
          <SoftBox display="flex" py={1}>
            {avatars([
              [team1, "Ryan Tompson"],
              [team4, "Jessica Doe"],
            ])}
          </SoftBox>
        ),
        budget: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            $2,000
          </SoftTypography>
        ),
        completion: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={40} color="info" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
    ],
  };
}
