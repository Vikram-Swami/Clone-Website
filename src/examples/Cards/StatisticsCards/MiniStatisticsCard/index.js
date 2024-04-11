import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import CircularProgressWithLabels from "components/Progress";
import Icon from "@mui/material/Icon";
function MiniStatisticsCard({ bgColor, title, count, percentage, icon, direction }) {
  return (
    <Card>
      <SoftBox bgColor={bgColor} variant="gradient">
        <SoftBox p={2}>
          <Grid container alignItems="center" height="3rem" justifyContent={"space-between"}>
            <Grid item>
              {direction === "right" && (
                <SoftBox
                  variant="gradient"
                  bgColor={bgColor === "white" ? icon.color : "white"}
                  color={bgColor === "white" ? "white" : "dark"}
                  width="3rem"
                  height="3rem"
                  marginTop="-11px"
                  borderRadius="md"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  shadow="md"
                >
                  <Icon fontSize="small" color="inherit">
                    {icon.component}
                  </Icon>
                </SoftBox>
              )}
            </Grid>
            <Grid item xs={8} lg={6} width={"100px"}>
              <SoftBox ml={direction === "left" ? 2 : 0} lineHeight={1}>
                <SoftTypography
                  variant="h6"
                  color={bgColor === "white" ? "text" : "white"}
                  opacity={bgColor === "white" ? 1 : 0.7}
                  textTransform="capitalize"
                  fontWeight={title.fontWeight}
                >
                  {title.text}
                </SoftTypography>
                <SoftTypography variant="h4" fontWeight="bold">
                  {count}
                </SoftTypography>
              </SoftBox>
            </Grid>
            <Grid item>
              <SoftBox>
                <CircularProgressWithLabels value={50} />
              </SoftBox>
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

MiniStatisticsCard.defaultProps = {
  bgColor: "white",
  title: {
    fontWeight: "medium",
    text: "",
  },
  percentage: {
    color: "success",
    text: "",
  },
  direction: "right",
};

MiniStatisticsCard.propTypes = {
  bgColor: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  title: PropTypes.shape({
    fontWeight: PropTypes.oneOf(["light", "regular", "medium", "bold"]),
    text: PropTypes.string,
  }),
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  icon: PropTypes.shape({
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    // Corrected this prop type to specify that it should be a valid MUI icon name
    component: PropTypes.string.isRequired,
  }).isRequired,
  direction: PropTypes.oneOf(["right", "left"]),
  children: PropTypes.node,
};

export default MiniStatisticsCard;
