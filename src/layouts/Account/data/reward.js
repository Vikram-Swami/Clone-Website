/* eslint-disable react/prop-types */
import SoftTypography from "components/SoftTypography";
import { receiveReward } from "api/users";

const ClaimView = {
  columns: [
    { name: "reward", align: "center" },
    { name: "type", align: "center" },
    { name: "claimedDate", align: "center" },
    { name: "status", align: "center" },
  ],

  rows: (data, dispatch) => {
    return data.map((e) => {
      const dateObject = new Date(e.createdAt);

      const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
      const formattedDate = dateObject.toLocaleDateString("en-GB", options);

      return {
        reward: <h5 className="help-text">{e.reward}</h5>,

        type: (
          <span >{e.type?.toUpperCase()} REWARD</span>
        ),
        claimedDate: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {formattedDate}
          </SoftTypography>
        ),

        status: <>{!e.status ?

          <div className="d-flex">
            <button className="btn btn-prime" onClick={() => receiveReward(e.id, dispatch)}>Received</button>
          </div>
          :
          <div className="d-flex">
            <p className="badge success">Received</p>
          </div>
        }</>,
      };
    });
  },
};

export default ClaimView;
