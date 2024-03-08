/* eslint-disable react/prop-types */
// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";

import { Icon } from "@mui/material";
import SoftButton from "components/SoftButton";
import { setDialog } from "context";
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { PropTypes } from "prop-types";
import Transaction from "../../../examples/TransactionView";
import { startLoading } from "context";
import ApiClient from "Services/ApiClient";
import { purchase } from "Services/endpointes";
import { toast } from "react-toastify";


function Author({ name, id }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {id}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

const payment = (id, amount, dispatch) => async (form) => {
  try {
    // console.log(form.getAll("tnxId"));
    // form.append("id", id);
    // form.append("amount", amount);
    // startLoading(dispatch, true);
    // const result = await ApiClient.createData(purchase, form)
    // setDialog(dispatch, [result]);
  } catch (err) {
    toast.error(err.response?.data?.message);
  }
}

function Status({ tnxId, status, dispatch, e }) {
  if (tnxId && status) {
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBox display="flex" flexDirection="column">
          <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
        </SoftBox>
      </SoftBox>
    );
  } else if (tnxId === null) {
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBox display="flex" alignItems="center" flexDirection="column" gap="4px">
          <SoftBadge
            variant="gradient"
            badgeContent="pending"
            color="warning"
            size="xs"
            container
          />
          <SoftButton
            color="warning"
            width="3rem"
            height="2rem"
            shadow="md"
            marginRight="2rem"
            borderRadius="lg"
            cursor="pointer"
            onClick={() => {
              setDialog(dispatch, [
                {
                  status: "form",
                  title: "Please select payment method",
                  message: `Connection - ${e.storage} TB`,
                  action: "Pay Now",
                  children: (<Transaction amount={parseFloat(e.amount + parseFloat(e.amount * `0.${e.tax}`))} type="purchase" />),
                  call: payment(e.id, e.amount, dispatch)
                },
              ]);
            }}
          >
            Make Payment
          </SoftButton>
        </SoftBox>
      </SoftBox>
    );
  } else if (!status) {
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBox display="flex" flexDirection="column">
          <SoftButton
            color="success"
            width="3rem"
            height="2rem"
            shadow="md"
            marginRight="2rem"
            borderRadius="lg"
            variant="gradient"
            onClick={() => {
              console.log(status, isAlloted);
            }}
          >
            Activate Rent
          </SoftButton>
        </SoftBox>
      </SoftBox>
    );
  } else {
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBox display="flex" flexDirection="column">
          <SoftBadge variant="gradient" badgeContent="Active" color="success" size="xs" container />
        </SoftBox>
      </SoftBox>
    );
  }
}

const connectionView = {
  columns: [
    { name: "id", align: "left" },
    { name: "storage", align: "left" },
    { name: "amount", align: "center" },
    { name: "boughtAt", align: "center" },
    { name: "credentials", align: "center" },
    { name: "status", align: "center" },
    { name: "lookup", align: "center" },
  ],

  rows: (data, name, dispatch) => {
    return data.map((e) => {
      const dateObject = new Date(e.createdAt);

      const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
      const formattedDate = dateObject.toLocaleDateString("en-GB", options);

      return {
        id: <Author name={name} id={e.id} />,
        storage: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.storage} TB
          </SoftTypography>
        ),
        amount: <Author name={e.amount} id={`Excluded ${e.tax}% GST`} />,

        boughtAt: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {formattedDate}
          </SoftTypography>
        ),
        credentials: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.isAlloted ? (
              <Author name={e.storageId} id={e.password} />
            ) : (
              <Icon fontSize="small" color="inherit">
                lock
              </Icon>
            )}
          </SoftTypography>
        ),
        status: <Status tnxId={e.transactionId} status={e.status} dispatch={dispatch} e={e} />,
        lookup: (
          <SoftTypography
            component="a"
            href="#"
            variant="caption"
            color="secondary"
            fontWeight="medium"
            cursor="pointer"
            onClick={() => {
              setDialog(dispatch, [
                {
                  status: "form",
                  title: `CONNECTION ID - ${e.id}`,
                  message: `Invoices and Credential will be available soon.`,
                  // children: (<Transaction amount={e.amount} type="purchase" />),
                },
              ]);
            }}
          >
            <Icon fontSize="small" color="green">
              visibility
            </Icon>
          </SoftTypography>
        ),
      };
    });
  },
};

export default connectionView;
