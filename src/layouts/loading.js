import { PropTypes } from "prop-types"

const Loading = ({ condition }) => {
  return (<>
    {condition && <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        position: "fixed",
        height: "100dvh",
        width: "100%",
        top: 0,
        background: "#2c292975",
        zIndex: 11111111,
      }}
    >
      <div id="loop" className="center"></div>
      <div id="bike-wrapper" className="center">
        <div id="bike" className="centerBike"></div>
      </div>
    </div>}
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
