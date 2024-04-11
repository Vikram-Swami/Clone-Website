import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import PropTypes from "prop-types";
import { Icon } from "@mui/material";
import { setDialog } from "context";

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

function Level({ level, pLevel }) {
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
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBox display="flex" alignItems="center" flexDirection="column" gap="4px">
          <SoftBadge variant="gradient" badgeContent="Active" color="success" size="xs" container />
        </SoftBox>
      </SoftBox>
    );
  } else if (!status && verified) {
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBadge variant="gradient" badgeContent="Inactive" color="warning" size="xs" container />
      </SoftBox>
    );
  } else if (!verified) {
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBox display="flex" flexDirection="column">
          <SoftBadge
            variant="gradient"
            badgeContent="Not Verified"
            color="error"
            size="xs"
            container
          />
        </SoftBox>
      </SoftBox>
    );
  }
}

Author.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
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
    { name: "phone", align: "center" },
    { name: "joining", align: "center" },
    { name: "status", align: "center" },
    { name: "level", align: "center" },
    { name: "storage", align: "center" },
    { name: "add", align: "center" },
  ],

  rows: (data, dispatch, user) => {
    console.log(user);
    return data?.map((e, i) => {
      const dateObject = new Date(e.createdAt);

      const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
      const formattedDate = dateObject.toLocaleDateString("en-GB", options);

      return i != 0
        ? {
            user: <Author name={e.name} id={e.userId} />,
            email: (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                {e.email}
              </SoftTypography>
            ),
            phone: (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                {e.phone}
              </SoftTypography>
            ),
            joining: (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                {formattedDate}
              </SoftTypography>
            ),

            status: <Status verified={e.isVerified} status={e.status} />,
            level: <Level level={parseInt(e.level)} pLevel={e.placementLevel} />,
            storage: (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                {e.storage}
              </SoftTypography>
            ),
            add: (
              <SoftTypography
                component="a"
                href="#"
                variant="caption"
                color="secondary"
                fontWeight="medium"
                cursor="pointer"
                onClick={() => {
                  const generateReferLink = () => {
                    const referLink = window.location.origin;

                    return `${referLink}/sign-up/1?sponsorId=${user.id}&placementId=${e.userId}`;
                  };

                  const referLink = generateReferLink();

                  navigator.clipboard
                    .writeText(referLink)
                    .then(() => {
                      setDialog(dispatch, [
                        {
                          status: 200,
                          message:
                            "Link has been coppied to clipboard. Please share the link with your new Member.",
                        },
                      ]);
                    })
                    .catch((_) => {
                      setDialog(dispatch, [{ status: 400, message: "Unable to copy the Link." }]);
                    });
                }}
              >
                <Icon fontSize="small" color="green">
                  add_link
                </Icon>
              </SoftTypography>
            ),
          }
        : "";
    });
  },
};
export default TeamView;
