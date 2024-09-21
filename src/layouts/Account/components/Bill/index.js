// @mui material components
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";
// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useSoftUIController } from "context";
import { setDialog } from "context";
import { toast } from "react-toastify";
import { setLoading } from "context";
import { startLoading } from "context";
import { setUser } from "context";
import ApiClient from "Services/ApiClient";
import { getUserById } from "Services/endpointes";
import Withdraw from "../Withdraw";
import { withdraw } from "Services/endpointes";

function Bill() {
  const [controller, dispatch] = useSoftUIController();
  const { user } = controller;
  const payment = async (form) => {
    try {
        form.append("paymentMethod", "Account Transfer");
        form.append("type", "withdraw")
      startLoading(dispatch, true);
      const response = await ApiClient.createData(withdraw, form);
      if (response.status == 200) {
        const data = await ApiClient.getData(getUserById);
        if (data.status == 200) {
          setUser(dispatch, data?.data);
        }
      }
      setDialog(dispatch, [response]);

    } catch (err) {
      toast.error(err?.toString());
      setLoading(dispatch, false);
    }
  };



  return (
    <SoftBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor="grey-100"
      borderRadius="lg"
      p={3}
      mt={2}
    >
      <SoftBox width="100%" display="flex" flexDirection="column">
        <SoftBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {user?.wallet ?? 0}
          </SoftTypography>

          <SoftBox
            display="flex"
            alignItems="center"
            mt={{ xs: 2, sm: 0 }}
            ml={{ xs: -1.5, sm: 0 }}
          ></SoftBox>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0} display={"flex"} justifyContent={"space-between"}>
          <SoftTypography variant="h6" color="black" fontWeight="medium">
            My Balance :
          </SoftTypography>
          <SoftTypography variant="h6" color="black" fontWeight="medium">
            {user?.wallet ?? 0}
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0} display={"flex"} justifyContent={"space-between"}>
          <SoftTypography variant="h6" color="black" fontWeight="medium">
            My Earning :
          </SoftTypography>
          <SoftTypography variant="h6" color="black" fontWeight="medium">
            {user?.earning??0}
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0} display={"flex"} justifyContent={"space-between"}>
          <SoftTypography variant="h6" color="black" fontWeight="medium">
            Total Withdraw :
          </SoftTypography>
          <SoftTypography variant="h6" color="black" fontWeight="medium">
            {user?.totalWithdraw ?? 0}
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0} display={"flex"} justifyContent={"space-between"}>
          <SoftTypography variant="h6" color="black" fontWeight="medium">
            TDS :
          </SoftTypography>
          <SoftTypography variant="h6" color="black" fontWeight="medium">
            {user?.tds??0}
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0} display={"flex"} justifyContent={"space-between"}>
          <SoftTypography variant="h6" color="black" fontWeight="medium">
            Monthly Income :
          </SoftTypography>
          <SoftTypography variant="h6" color="black" fontWeight="medium">
            {0}
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0} display={"flex"} justifyContent={"space-between"}>
          <SoftTypography variant="h6" color="black" fontWeight="medium">
            Storage :
          </SoftTypography>
          <SoftTypography variant="h6" color="black" fontWeight="medium">
            {user?.ownStr}
          </SoftTypography>
        </SoftBox>

        <Divider variant="middle" />
        <SoftBox mb={1} lineHeight={0} display={"flex"} justifyContent={"space-between"}>
          <SoftTypography variant="h6" color="black" fontWeight="medium">
            {user?.bankName}
          </SoftTypography>
          <SoftTypography variant="h6" color="black" fontWeight="medium">
            <Icon
              fontSize="small"
              color="info"
              onClick={() => {
                setDialog(dispatch, [
                  {
                    status: "form",
                    title: "Transfer to Self Bank Account",
                    action: "Confirm",
                    children: <Withdraw amount={parseFloat(user?.wallet)} />,
                    call: (form) => {
                      setDialog(dispatch, [
                        {
                          status: "form",
                          title: "Transfer to Self Bank Account",
                          action: "Confirm",
                          message: "Are you sure to Proceed",
                          call: () => payment(form),
                        },
                      ]);
                    },
                  },
                ]);
              }}
            >
              account_balance_wallet
            </Icon>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </SoftBox>
  );
}

export default Bill;
