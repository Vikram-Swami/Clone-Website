import { Button, Card } from "@mui/material";
import Box from "@mui/material/Box";
import { PropTypes } from "prop-types";
import Typography from "@mui/material/Typography";
import { useSoftUIController } from "context";

const ConnectionRent = () => {
  const [controller, dispatch] = useSoftUIController();

  const { rent } = controller;
  console.log(rent);

  let data = rent.filter((e) => {
    return e.level === "self";
  });
  console.log(data[0].amount);
  return (
    <>
      <Card>
        <Box p={2}>
          <Box>
            <Box display="flex" justifyContent={"space-between"} py={1} pr={2}>
              <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                User:
              </Typography>
              <Typography variant="button" fontWeight="regular" color="text">
                {data[0].userId}
              </Typography>
            </Box>
            <Box display="flex" py={1} pr={2} justifyContent={"space-between"}>
              <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                Level:
              </Typography>
              <Typography variant="button" fontWeight="regular" color="text">
                {data[0].level}
              </Typography>
            </Box>
            <Box display="flex" py={1} pr={2} justifyContent={"space-between"}>
              <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                Storage:
              </Typography>
              <Typography variant="button" fontWeight="regular" color="text">
                {data[0].storage}
              </Typography>
            </Box>
            <Box display="flex" py={1} pr={2} justifyContent={"space-between"}>
              <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                Amount:
              </Typography>
              <Typography variant="button" fontWeight="regular" color="text">
                {data[0].amount}
              </Typography>
            </Box>
            <Box display="flex" py={1} pr={2} justifyContent={"space-between"}>
              <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                Status:
              </Typography>
              <Typography variant="button" fontWeight="regular" color="text">
                {data[0].status}
              </Typography>
            </Box>
            <Box display="flex" py={1} pr={2} justifyContent={"space-between"}>
              <Typography variant="button" fontWeight="bold" textTransform="capitalize">
                Enddate:
              </Typography>
              <Typography variant="button" fontWeight="regular" color="text">
                {data[0].endDate}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Picture input fields */}
        <Card
          style={{
            display: "flex",
            gap: "10px",
            padding: "0 5px",
            width: "100%",
            overflow: "scroll",
          }}
        ></Card>
      </Card>
    </>
  );
};

export default ConnectionRent;

ConnectionRent.defaultProps = {
  data: [],
  type: "new",
};

ConnectionRent.propTypes = {
  data: PropTypes.any,
  type: PropTypes.string,
};
