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

function CoverLayout({ header, title, top, children }) {
  return (
    <PageLayout background="white" display="flex" justifyContent="center" alignItems="center" minHeight={"100dvh"}>
      <SoftBox mt={top} minWidth="22dvw" borderRadius="10px" minHeight={"80dvh"} display="flex" sx={{ flexWrap: "wrap" }} justifyContent="space-evenly" alignItems="center">
        <SoftBox pt={3} px={3} sx={{ textAlign: "center" }}>
          {!header ? (
            <>
              <SoftBox mb={2} sx={{ textAlign: "center" }}>

                <SoftBox
                  component="img"
                  src="/logo.png"
                  alt="TRIWAVES INDIA LIMTED"
                  width="100%"
                  maxWidth="22rem"
                />
              </SoftBox>
              <SoftTypography variant="h5" fontWeight="bold" textGradient>
                {title}
              </SoftTypography>
            </>
          ) : (
            header
          )}
        </SoftBox>
        <SoftBox pb={3} px={3}>{children}</SoftBox>
      </SoftBox>
      <Footer />
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
  top: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default CoverLayout;
