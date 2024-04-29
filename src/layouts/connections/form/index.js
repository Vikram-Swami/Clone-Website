import { Button, Card } from "@mui/material";
import Box from "@mui/material/Box";
import { PropTypes } from "prop-types";
import Typography from "@mui/material/Typography";
import { useSoftUIController } from "context";
import { toast } from "react-toastify";
import { setLoading } from "context";
import ApiClient from "Services/ApiClient";
import { setRent } from "context";
import { useEffect } from "react";
import { getRentByUserId } from "Services/endpointes";

const ConnectionRent = ({ id }) => {
  const [controller, dispatch] = useSoftUIController();
  const { rent } = controller;

  const getRent = async () => {
    try {
      const response = await ApiClient.getData(getRentByUserId);
      console.log(response);
      if (response.status === 200) {
        setRent(dispatch, response.data);
      } else {
        toast.warn("Please Activate Your Connection to Get Monthly Rent.");
        setLoading(dispatch, false);
      }
    } catch (err) {
      toast.error(err?.toString());
      setLoading(dispatch, false);
    }
  };
  useEffect(() => {
    rent.length < 1 && getRent();
    console.log(
      rent,
      id,
      rent.find((e) => e.connectionId === id)
    );
  });
  return (
    <>
      {rent.length > 0 ? (
        <Box px={2}>
          <Box display="flex" mb={3} gap={2} justifyContent={"space-between"} alignItems={"center"}>
            <Typography variant="h3" fontWeight="regular" color="text">
              {rent.find((e) => e.connectionId === id)?.storage ?? ""} TB
            </Typography>
            <Typography variant="button" fontWeight="bold" textTransform="capitalize">
              <Typography
                variant="button"
                fontWeight="bold"
                p={1.1}
                borderRadius={"5px"}
                backgroundColor={rent.find((e) => e.connectionId === id)?.status ? "green" : "red"}
                color="white"
              >
                {rent.find((e) => e.connectionId === id)?.status ? "Active" : "Inactive" ?? ""}
              </Typography>
            </Typography>
          </Box>

          <Box display="flex" justifyContent={"space-between"}>
            <Typography variant="button" fontWeight="bold" textTransform="capitalize">
              My Monthly Rent:
            </Typography>
            <Typography variant="button" fontWeight="bold" color="text">
              ₹ {rent.find((e) => e.connectionId === id)?.amount ?? ""}/-
            </Typography>
          </Box>

          <Box display="flex" justifyContent={"space-between"}>
            <Typography variant="button" fontWeight="bold" textTransform="capitalize">
              Enddate:
            </Typography>
            <Typography variant="button" fontWeight="regular" color="text">
              {rent.find((e) => e.connectionId === id)?.endDate
                ? (() => {
                    const endDate = new Date(rent.find((e) => e.connectionId === id)?.endDate);
                    const datePart = endDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });

                    return <div>{datePart}</div>;
                  })()
                : ""}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Typography>Looking for Active Rent...</Typography>
      )}
    </>
  );
};

export default ConnectionRent;

ConnectionRent.defaultProps = {
  data: [],
  type: "new",
  id: "",
};

ConnectionRent.propTypes = {
  data: PropTypes.any,
  type: PropTypes.string,
  id: PropTypes.string,
};
