// @mui material components
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { setDialog } from "context";
import { useSoftUIController } from "context";
import { setTransaction } from "context";
import { setLoading } from "context";

import { toast } from "react-toastify";
// Billing page components
import { useEffect } from "react";
import ApiClient from "Services/ApiClient";
import { getTransactionsByUserId } from "Services/endpointes";
import Transaction from "../Transaction";
function Transactions() {
  const [controller, dispatch] = useSoftUIController();
  const { transaction } = controller;

  const getAllUsersTransaction = async () => {
    try {
      setLoading(dispatch, true);
      const response = await ApiClient.getData(getTransactionsByUserId);
      if (response?.status === 200) {
        setTransaction(dispatch, response?.data);
      }
    } catch (error) {
      toast.error(error.toString());
      setLoading(dispatch, false);
    }
  };
  useEffect(() => {
    transaction.length < 1 && getAllUsersTransaction();
  }, []);

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Your Transaction&apos;s
        </SoftTypography>
        <SoftBox display="flex" alignItems="flex-start">
          <SoftBox color="text" mr={0.5} lineHeight={0}>
            <Icon color="inherit" fontSize="small">
              date_range
            </Icon>
          </SoftBox>
          <SoftTypography variant="button" color="text" fontWeight="regular">
            2024
          </SoftTypography>
        </SoftBox>
      </SoftBox>
      <SoftBox pt={3} pb={2} px={2}>
        <SoftBox mb={2}>
          <SoftTypography
            variant="caption"
            color="text"
            fontWeight="bold"
            textTransform="uppercase"
          >
            newest
          </SoftTypography>
        </SoftBox>
        <SoftBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={2}
          m={0}
          sx={{ listStyle: "none" }}
        >
          {transaction?.length > 0
            ? transaction.map((e) => {
              const date = new Date(e.createdAt);
              const formattedDate = date.toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              });

              return (
                <Transaction
                  key={e.invoiceNo}
                  color="error"
                  icon="arrow_downward"
                  name={e.type}
                  id={e.id}
                  description={formattedDate}
                  value={"₹" + e.amount}
                />
              );
            })
            : ""}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default Transactions;
