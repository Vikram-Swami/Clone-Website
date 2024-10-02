import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import PropTypes from "prop-types";
import { Icon } from "@mui/material";
import { handleCopyLink } from "api/users";
import { toast } from "react-toastify";

function Level({ level }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {level}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function Status({ verified, status }) {
  if (verified && status) {
    return (
      <div className="d-flex column g8">
        <p className="badge success">Active</p>
      </div>
    );
  } else if (!status && verified) {
    return (
      <div className="d-flex column g8">
        <p className="badge error">Inactive</p>
      </div>
    );
  } else if (!verified) {
    return (
      <div className="d-flex column g8">
        <p className="badge error">Not-Verified</p>
      </div>
    );
  }
}

Status.propTypes = {
  status: PropTypes.bool,
  verified: PropTypes.bool,
};
Level.propTypes = {
  level: PropTypes.string,
  pLevel: PropTypes.string,
};
const TeamView = {
  columns: [
    { name: "user", align: "left" },
    { name: "email", align: "left" },
    { name: "level", align: "center" },
    { name: "storage", align: "center" },
    { name: "down_business", align: "center" },
    { name: "status", align: "center" },
    { name: "joining", align: "center" },
  ],

  rows: (data, maxVal, dispatch, user) => {
    const CopyId = (id) => {
      navigator.clipboard
        .writeText(id)
        .then(() => {
          toast.success("User ID has been copied to your clipboard.");
        })
        .catch((_) => {
          toast.error("Unable to copy ID");
        });
    }
    return data?.map((e, i) => {
      return {
        user: (<div >
          <p>{e.name}</p>

        </div>),
        email: (
          <div className="d-flex j-between" style={{ alignItems: "flex-start" }}>

            <h5 style={{ width: "fit-content", }}>{e.email?.substr(0, 15)}...</h5>
            <div className="d-flex j-between g8" style={{ fontSize: "18px" }}>

              <Icon className="c-point mx5" onClick={() => CopyId(e.email)}>copy</Icon>
              <Icon className="c-point" onClick={() => handleCopyLink(user, e.userId, dispatch)}>add_link</Icon>
            </div>
          </div>
        ),
        joining: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.createdAt}
          </SoftTypography>
        ),
        down_business: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.member} {maxVal === e.member ? "(P)" : ""}
          </SoftTypography>
        ),

        status: <Status verified={e.isVerified} status={e.status} />,
        level: <Level level={parseInt(e.level) - parseInt(user?.level)} />,
        storage: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.storage}
          </SoftTypography>
        ),
      };
    });
  },
};
export default TeamView;
