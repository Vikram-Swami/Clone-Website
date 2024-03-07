/* eslint-disable react/prop-types */
// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";

import { Icon } from "@mui/material";
import { useState } from "react";
import { setDialog } from "context";
import { useSoftUIController } from "context";
import ApiClient from "Services/ApiClient";
import { toast } from "react-toastify";
import { updateRent } from "Services/endpointes";
import { deleteRent } from "Services/endpointes";
import RentForm from "../form";

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
const editRent = (id, getAllRents) => async (formData) => {
  try {
    formData.append("id", id);
    console.log(id, formData, formData.get("id"));
    const response = await ApiClient.putData(updateRent, formData);
    toast.success(response.message);
    getAllRents();
  } catch (error) {
    console.error("Error adding Token:", error);
    toast.error(
      error.response?.data?.message ?? "Failed to delete Toeken. Please try again later."
    );
  }
};

const deleteBRent = (id, getAllRents) => async (form) => {
  try {
    console.log(id);
    const response = await ApiClient.deleteData(deleteRent, id);
    toast.success(response?.message);
    getAllRents();
  } catch (error) {
    console.error("Error deleting Token:", error);
    toast.error(error.response?.data?.message ?? "Failed to delete Token. Please try again later.");
  }
};
const RentView = {
  columns: [
    { name: "user", align: "left" },
    { name: "level", align: "left" },
    { name: "storage", align: "center" },
    { name: "amount", align: "center" },
    { name: "connectionId", align: "center" },
    { name: "status", align: "center" },
    { name: "endDate", align: "center" },
    { name: "actions", align: "center" },
  ],

  rows: (data, dispatch, getAllRents) => {
    return data.map((e) => {
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
              onClick={() => {
                setDialog(dispatch, [
                  {
                    status: "form",
                    call: editRent(e.id, getAllRents),
                    children: <RentForm data={e} />,

                    message: `UPDATE - RENT - ${e.userId}`,
                    action: "Update",
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
                    call: deleteBRent(e.id, getAllRents),

                    message: `DELETE - RENT - ${e.userId}`,
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

export default RentView;
