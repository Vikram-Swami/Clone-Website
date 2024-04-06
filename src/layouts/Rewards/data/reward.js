/* eslint-disable react/prop-types */
// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";

import SoftButton from "components/SoftButton";

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
    { name: "Index", align: "left" },
    { name: "Rewards", align: "center" },
    { name: "TB(Required)", align: "center" },
    { name: "Type", align: "left" },
    { name: "Alloted", align: "center" },
    { name: "actions", align: "center" },
  ],

  rows: (data, name, dispatch) => {
    return data.map((e) => {
      const dateObject = new Date(e.createdAt);

      const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
      const formattedDate = dateObject.toLocaleDateString("en-GB", options);

      return {
        Index: <Author name={name} id={e.index} />,

        type: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.type}
          </SoftTypography>
        ),
        level: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.level + 1}
          </SoftTypography>
        ),
        amount: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.amount + e.tds + e.conCharge}
          </SoftTypography>
        ),
        status: <Status status={e.status} />,
        actions: (
          <SoftButton
      display="block"
      color="warning"
      shadow="md"
      height="0.001rem"
      sx={{ padding: "0 !important" }}
      borderRadius="md"
      variant="gradient"
    >
      Claim
    </SoftButton>
        ),
      };
    });
  },
};

export default usersView;
