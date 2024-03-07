/* eslint-disable react/prop-types */
// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";

import { Icon } from "@mui/material";
import { useState } from "react";
import { setDialog } from "context";
import { useSoftUIController } from "context";

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

const usersView = {
  columns: [
    { name: "user", align: "left" },
    { name: "amount", align: "left" },
    { name: "phone", align: "center" },
    { name: "verification", align: "center" },
    { name: "earning", align: "center" },
    { name: "status", align: "center" },
    { name: "kyc", align: "center" },
    { name: "address", align: "center" },
    { name: "actions", align: "center" },
  ],

  rows: (data, dispatch) => {
    return data.map((e) => {
      const dateObject = new Date(e.createdAt);

      const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
      const formattedDate = dateObject.toLocaleDateString("en-GB", options);

      return {
        user: <Author name={e.fullName} id={e.userId} />,
        amount: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.amount}
          </SoftTypography>
        ),
        phone: <Author name={e.phone} />,

        verification: <Verified status={e.isVerified} />,
        earning: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.totalEarn}
          </SoftTypography>
        ),
        status: <Status tnxId={e.transactionId} status={e.status} />,
        kyc: (
          <SoftTypography
            component="a"
            href="#"
            variant="caption"
            color="info"
            fontWeight="medium"
            cursor="pointer"
            onClick={() => {}}
          >
            <Icon fontSize="small" color="info">
              visibility
            </Icon>
          </SoftTypography>
        ),
        address: (
          <SoftTypography
            component="a"
            href="#"
            variant="caption"
            color="info"
            fontWeight="medium"
            cursor="pointer"
            onClick={() => {}}
          >
            <Icon fontSize="small" color="info">
              visibility
            </Icon>
          </SoftTypography>
        ),
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
              onClick={() => {}}
            >
              <Icon fontSize="small" color="info">
                visibility
              </Icon>
            </SoftTypography>
            <SoftTypography
              component="a"
              href="#"
              variant="caption"
              color="info"
              fontWeight="medium"
              cursor="pointer"
              onClick={() => {
                setDialog(dispatch, [
                  {
                    status: "form",
                    route: "",
                    message: `UPDATE - CONNECTION - ${e.userId}`,
                    action: "Update",
                    children: <usersForm data={e} />,
                  },
                ]);
              }}
            >
              <Icon fontSize="small" color="info">
                edit
              </Icon>
            </SoftTypography>
            <SoftTypography
              component="a"
              href="#"
              variant="caption"
              color="error"
              cursor="pointer"
              fontWeight="medium"
              onClick={() => {
                setDialog(dispatch, [
                  {
                    status: "form",
                    route: "",
                    message: `DELETE - CONNECTION - ${e.userId}`,
                    action: "Delete",
                  },
                ]);
              }}
            >
              <Icon fontSize="small" color="error">
                delete
              </Icon>
            </SoftTypography>
          </SoftBox>
        ),
      };
    });
  },
};

export default usersView;
