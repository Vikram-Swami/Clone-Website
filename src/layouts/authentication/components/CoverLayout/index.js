// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Next Work Dashboard React examples
import PageLayout from "examples/LayoutContainers/PageLayout";

// Authentication layout components
import Footer from "layouts/authentication/components/Footer";

function CoverLayout({ color, header, title, top, children }) {
  return (
    <PageLayout background="white">
      <Grid
        container
        py={2}
        justifyContent="center"
        flexDirection={"column"}
        alignItems={"center"}
        minHeight={"100dvh"}
      >
        <img src="/logo.png" alt="Nextwork Technologies" width={250} />
        <Grid item xs={11} sm={12} md={12} xl={12}>
          <SoftBox mt={top} border="1px solid lightgrey" width="30dvw" borderRadius="10px">
            <SoftBox pt={3} px={3}>
              {!header ? (
                <>
                  <SoftBox mb={1}>
                    <SoftTypography variant="h3" fontWeight="bold" color={color} textGradient>
                      {title}
                    </SoftTypography>
                  </SoftBox>
                </>
              ) : (
                header
              )}
            </SoftBox>
            <SoftBox pb={3} px={3}>{children}</SoftBox>
          </SoftBox>
        </Grid>
        <Grid item xs={12} md={12}>
          <SoftBox
            height="100%"
            display={{ xs: "none", md: "block" }}
            position="relative"
            right={{ md: "-12rem", xl: "-16rem" }}
            mr={-16}
            sx={{
              transform: "skewX(-10deg)",
              overflow: "hidden",
              borderBottomLeftRadius: ({ borders: { borderRadius } }) => borderRadius.lg,
            }}
          ></SoftBox>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

// Setting default values for the props of CoverLayout
CoverLayout.defaultProps = {
  header: "",
  title: "",
  description: "",
  color: "info",
  top: 4,
};

// Typechecking props for the CoverLayout
CoverLayout.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  header: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  top: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default CoverLayout;
