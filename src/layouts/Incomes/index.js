// @mui material components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { useEffect, useState } from "react";
import Table from "examples/Tables/Table";
import ApiClient from "Services/ApiClient";
import { toast } from "react-toastify";
import { useSoftUIController, startLoading, setLoading } from "context";
import React from "react";
import { getRentByUserId } from "Services/endpointes";
import { setDialog } from "context";
import RentOnRentView from "./data";
import { setRent } from "context";

function RentOnRent() {
  const [controller, dispatch] = useSoftUIController();


  const { rent } = controller;

  const [menu, setMenu] = useState("ror");

  const getAllRents = async () => {
    startLoading(dispatch, true);
    try {
      const response = await ApiClient.getData(getRentByUserId);
      if (response.status == 200) {
        setRent(dispatch, response.data);
      } else {
        setDialog(dispatch, [response]);
      }
    } catch (error) {
      toast.info(error.toString());
      setLoading(dispatch, false);
    }
  };
  useEffect(() => {
    rent.length < 1 && getAllRents();
  }, []);

  let memoizedRows = RentOnRentView.rows(rent.filter((e) => e.type == menu));

  return (
    <DashboardLayout>
      <DashboardNavbar call={getAllRents} />
      <div className='card transactions' style={{ maxHeight: "100%" }}>
        <div className="d-flex j-between" >
          <h5 style={{ whiteSpace: "nowrap" }}>Monthly Benefits</h5>
          <div className="d-flex j-end">
            <select name="type" className="custom-select" style={{ width: "fit-content" }} onChange={(e) => { setMenu(e.target.value); console.log(e.target.value, menu, rent) }} defaultValue="ror">
              <option value="ror">RoR</option>
              <option value="royality">ROYALITY</option>
              <option value="rewards">SALARY</option>
            </select>
          </div>
        </div>
        {
          rent.filter((e) => e.type == menu).length > 0 ?
            <Table columns={RentOnRentView.columns} rows={memoizedRows} />
            : <div className="card-body d-flex">
              <h6 className="help-text">No Benefit Found for current Selection</h6>
            </div>
        }

      </div>
      {/* <Footer /> */}
    </DashboardLayout >
  );
}

export default RentOnRent;
