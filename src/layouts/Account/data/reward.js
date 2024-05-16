/* eslint-disable react/prop-types */
// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";

import SoftButton from "components/SoftButton";
import ApiClient from "Services/ApiClient";
import { claimReward } from "Services/endpointes";
import { toast } from "react-toastify";
import { setDialog } from "context";
import { startLoading } from "context";
import { setLoading } from "context";

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

function Status({ status }) {
  if (!status) {
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBadge variant="gradient" badgeContent="Pending" color="warning" size="xs" container />
      </SoftBox>
    );
  } else {
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBox display="flex" flexDirection="column">
          <SoftBadge
            variant="gradient"
            badgeContent="Claimed"
            color="success"
            size="xs"
            container
          />
        </SoftBox>
      </SoftBox>
    );
  }
}
const claimRewards = async (id, dis) => {
  startLoading(dis, true);
  try {
    const response = await ApiClient.createData(claimReward + `/${id}`);

    setDialog(dis, [response]);
  } catch (error) {
    setLoading(dis, false);
    toast.info(error.response);
  }
};
const achievementView = {
  columns: [
    { name: "reward", align: "center" },
    { name: "type", align: "center" },
    { name: "claimedDate", align: "center" },
    { name: "status", align: "center" },
  ],

  rows: (data, dispatch) => {
    return data.map((e) => {
      console.log(e);
      const dateObject = new Date(e.createdAt);

      const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
      const formattedDate = dateObject.toLocaleDateString("en-GB", options);

      return {
        reward: <Author name={e.reward} id={e.rewardId} />,

        type: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.type}
          </SoftTypography>
        ),
        claimedDate: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {formattedDate}
          </SoftTypography>
        ),

        status: <Status status={e.status} />,
      };
    });
  },
};

export default achievementView;
