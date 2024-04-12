// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
// @mui material components
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";
// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useSoftUIController } from "context";
import Transaction from "examples/TransactionView";
import { setDialog } from "context";

const payment = (id, amount, dispatch, call) => async (form) => {
  try {
    form.append("id", id);
    form.append("amount", amount);
    startLoading(dispatch, true);
    const response = await ApiClient.createData(purchase, form);
    if (response.status == 200) {
      setDialog(dispatch, [response]);
      call();
    } else {
      setDialog(dispatch, [response]);
    }
  } catch (err) {
    toast.error(err.response?.data?.message);
    setLoading(dispatch, false);
  }
};
function Bill({ wallet, earning, withdraw, TDS, Income, Storage, bankName }) {
  const [controller, dispatch] = useSoftUIController();
  const { user, e } = controller;
  return (
    <SoftBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor="grey-100"
      borderRadius="lg"
      p={3}
      mb={Income ? 0 : 1}
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
            {wallet}
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
            {user?.wallet}
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0} display={"flex"} justifyContent={"space-between"}>
          <SoftTypography variant="h6" color="black" fontWeight="medium">
            My Earning :
          </SoftTypography>
          <SoftTypography variant="h6" color="black" fontWeight="medium">
            {/* {user?.wallet} */}0
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0} display={"flex"} justifyContent={"space-between"}>
          <SoftTypography variant="h6" color="black" fontWeight="medium">
            Total Withdraw :
          </SoftTypography>
          <SoftTypography variant="h6" color="black" fontWeight="medium">
            {/* {user?.wallet} */}0
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0} display={"flex"} justifyContent={"space-between"}>
          <SoftTypography variant="h6" color="black" fontWeight="medium">
            TDS :
          </SoftTypography>
          <SoftTypography variant="h6" color="black" fontWeight="medium">
            {/* {user?.wallet} */}0
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0} display={"flex"} justifyContent={"space-between"}>
          <SoftTypography variant="h6" color="black" fontWeight="medium">
            Monthly Income :
          </SoftTypography>
          <SoftTypography variant="h6" color="black" fontWeight="medium">
            {/* {user?.wallet} */}0
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
                    title: "Please select payment method",
                    message: `Connection -  TB`,
                    action: "Pay Now",
                    children: <Transaction amount={parseFloat(+parseFloat(200))} type="purchase" />,
                    call: payment("", parseFloat(+parseFloat(200)), dispatch, ""),
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

// Setting default values for the props of Bill
Bill.defaultProps = {
  Income: false,
};

// Typechecking props for the Bill
Bill.propTypes = {
  wallet: PropTypes.string.isRequired,
  earning: PropTypes.string.isRequired,
  withdraw: PropTypes.string.isRequired,
  TDS: PropTypes.string.isRequired,
  Income: PropTypes.bool,
  Storage: PropTypes.string.isRequired,
  bankName: PropTypes.string.isRequired,
};

export default Bill;
