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
  if (tnxId === null) {
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBox display="flex" alignItems="center" flexDirection="column" gap="4px">
          <SoftBadge
            variant="gradient"
            badgeContent="payment pending"
            color="warning"
            size="xs"
            container
          />
        </SoftBox>
      </SoftBox>
    );
  } else if (!status) {
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBadge variant="gradient" badgeContent="Inactive" color="warning" size="xs" container />
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

function Verified({ status }) {
  if (!status) {
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBadge
          variant="gradient"
          badgeContent="Not Verified"
          color="error"
          size="xs"
          container
        />
      </SoftBox>
    );
  } else {
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBox display="flex" flexDirection="column">
          <SoftBadge
            variant="gradient"
            badgeContent="Verified"
            color="success"
            size="xs"
            container
          />
        </SoftBox>
      </SoftBox>
    );
  }
}

const RentView = {
  columns: [
    { name: "user", align: "left" },
    { name: "level", align: "left" },
    { name: "storage", align: "center" },
    { name: "amount", align: "center" },
    { name: "connectionId", align: "center" },
    { name: "status", align: "center" },
    { name: "endDate", align: "center" },

  ],

  rows: (data) => {
    return data?.map((e) => {
      const dateObject = new Date(e.endDate);

      const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
      const formattedDate = dateObject.toLocaleDateString("en-GB", options);

      return {
        user: <Author name={e.fullName} id={e.userId} />,
        level: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.level}
          </SoftTypography>
        ),
        storage: <Author name={e.storage} />,
        amount: <Author name={e.amount} />,
        connectionId: <Author name={e.connectionId} />,
        endDate: <Author name={formattedDate} />,
        status: <Status tnxId={e.transactionId} status={e.status} />,
      };
    });
  },
};

export default RentView;
