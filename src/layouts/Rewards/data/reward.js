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

function Status({ claim, claimed, id, dis }) {
  if (claimed) {
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftButton disabled>claimed</SoftButton>
      </SoftBox>
    );
  } else if (claim) {
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
          <SoftButton
            color="warning"
            onClick={() => {
              claimRewards(id, dis);
            }}
          >
            claim
          </SoftButton>
        </SoftBox>
      </SoftBox>
    );
  } else {
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftButton disabled>claim</SoftButton>
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
const rewardView = {
  columns: [
    { name: "required", align: "center" },
    { name: "rewards", align: "center" },
    { name: "salary", align: "center" },
    { name: "claim", align: "center" },
  ],

  rows: (data, dispatch) => {
    return data.map((e) => {
      console.log(e);
      const dateObject = new Date(e.createdAt);

      const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
      const formattedDate = dateObject.toLocaleDateString("en-GB", options);

      return {
        required: <Author name={e.range} id={"TB"} />,

        rewards: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.reward}
          </SoftTypography>
        ),
        salary: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.salary ? e.salary : "NA"}
          </SoftTypography>
        ),

        claim: <Status claim={e.claim} claimed={e.claimed} id={e.id} dis={dispatch} />,
      };
    });
  },
};

export default rewardView;
