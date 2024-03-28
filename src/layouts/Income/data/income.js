/* eslint-disable react/prop-types */
// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";

import { Icon } from "@mui/material";
import { setDialog } from "context";
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

function Status({ tnxId, status }) {
  if (!status) {
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBadge variant="gradient" badgeContent="Unpaid" color="warning" size="xs" container />
      </SoftBox>
    );
  } else {
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBox display="flex" flexDirection="column">
          <SoftBadge variant="gradient" badgeContent="paid" color="success" size="xs" container />
        </SoftBox>
      </SoftBox>
    );
  }
}


const usersView = {
  columns: [
    { name: "user", align: "left" },
    { name: "amount", align: "left" },
    { name: "tds", align: "center" },
    { name: "conveniencecharge", align: "center" },
    { name: "type", align: "center" },
    { name: "status", align: "center" },
    { name: "actions", align: "center" },
  ],

  rows: (data, name, dispatch) => {

    return data.map((e) => {
      const dateObject = new Date(e.createdAt);

      const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
      const formattedDate = dateObject.toLocaleDateString("en-GB", options);

      return {
        user: <Author name={name} id={e.userId} />,
        amount: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.amount}
          </SoftTypography>
        ),
        tds: <Author name={e.tds ?? 0} />,
        conveniencecharge: <Author name={e.conCharge ?? 0} />,

        type: <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {e.type}
        </SoftTypography>,
        status: <Status status={e.status} />,
        actions: (
          <SoftBox
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="10px"
            px={1}
            py={0.5}
          >
            <SoftTypography
              component="a"
              href="#"
              variant="caption"
              color="info"
              fontWeight="medium"
              cursor="pointer"
              onClick={() => { toast.success("Details will be available soon!") }}
            >
              <Icon fontSize="small" color="info">
                visibility
              </Icon>
            </SoftTypography>
          </SoftBox>
        ),
      };
    });
  },
};

export default usersView;
