/* eslint-disable react/prop-types */
// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

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
      <div className="d-flex column g8">
        <p className="badge error">Inactive</p>
      </div>
    );
  } else {
    return (
      <div className="d-flex column g8">
        <p className="badge success">Active</p>
      </div>
    );
  }
}

const RentOnRentView = {
  columns: [
    { name: "user", align: "left" },
    { name: "level", align: "left" },
    { name: "storage", align: "center" },
    { name: "amount", align: "center" },
    { name: "status", align: "center" },
    { name: "endDate", align: "center" },
  ],

  rows: (data) => {
    return data?.map((e) => {
      const dateObject = new Date(e.endDate);

      const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
      const formattedDate = dateObject.toLocaleDateString("en-GB", options);

      return {
        user: <Author name={e.sourceName ?? e?.type?.toUpperCase()} id={e.source} />,
        level: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.level}
          </SoftTypography>
        ),
        storage: <Author name={e.storage} />,
        amount: <Author name={e.amount} />,
        endDate: <Author name={formattedDate} />,
        status: <Status tnxId={e.transactionId} status={e.status} />,
      };
    });
  },
};

export default RentOnRentView;
