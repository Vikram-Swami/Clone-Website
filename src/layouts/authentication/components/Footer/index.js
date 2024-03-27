// @mui material components
import Grid from "@mui/material/Grid";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function Footer() {
  return (
    <SoftBox component="footer" py={2}>
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={8} sx={{ textAlign: "center" }}>
          <SoftTypography variant="body2" color="secondary">
            Copyright &copy; 2024 Nextwork Technologies Limited
          </SoftTypography>
        </Grid>
      </Grid>
    </SoftBox>
  );
}

export default Footer;
