/* eslint-disable react/prop-types */
// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";

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

const limitRewardView = {
  columns: [
    { name: "required", align: "center" },
    { name: "time_duration", align: "center" },
    { name: "rewards", align: "center" },
  ],

  rows: (data, dispatch) => {
    return data.map((e) => {
      return {
        required: (
          <>
            <Author name={e.range} />
            TB
          </>
        ),
        time_duration: (
          <>
            <Author name={e.rule} />
            Days
          </>
        ),
        rewards: <Author name={e.reward} />,
      };
    });
  },
};

export default limitRewardView;
