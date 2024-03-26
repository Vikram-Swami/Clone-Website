import { Box } from "@mui/material";
import { PropTypes } from "prop-types"

const Loading = ({ condition }) => {
  return (<>
    {condition && <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100%",
      position: "fixed",
      height: "100dvh",
      width: "100%",
      top: 0,
      zIndex: 11111111,
    }}>
      <div className="book">
        <div className="book__pg-shadow"></div>
        <div className="book__pg"></div>
        <div className="book__pg book__pg--2"></div>
        <div className="book__pg book__pg--3"></div>
        <div className="book__pg book__pg--4"></div>
        <div className="book__pg book__pg--5"></div>
      </div></Box>}
  </>
  );
};


Loading.defaultProps = {
  condition: false
}

Loading.propTypes = {
  condition: PropTypes.bool
}

export default Loading;
