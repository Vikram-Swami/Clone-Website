import { Box, Typography } from "@mui/material";
import { PropTypes } from "prop-types";

const Loading = ({ condition }) => {

  return (
    <>
      {condition && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            width: "100dvw",
            height: "100dvh",
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: "#2c298075",
            zIndex: 11111111,
          }}
        >
          <Typography fontWeight={"bold"} style={{ textAlign: "center", color: "#ffffff", fontSize: "1rem" }}>
            Loading...
          </Typography>
        </Box>
      )}
    </>
  );
};

Loading.defaultProps = {
  condition: false,
};

Loading.propTypes = {
  condition: PropTypes.bool,
};

export default Loading;
