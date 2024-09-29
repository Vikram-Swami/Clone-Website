// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import { useSoftUIController } from "context";

// Billing page components
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAllUsersTransaction } from "api/users";


function Transactions() {
  const [controller, dispatch] = useSoftUIController();
  const { transaction } = controller;

  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (date) => {
    setStartDate(date);
    getAllUsersTransaction(dispatch, { month: date.getMonth() + 1, year: date.getFullYear() });
  };


  useEffect(() => {
    transaction.length < 1 && getAllUsersTransaction(dispatch, { month: startDate.getMonth() + 1, year: startDate.getFullYear() });
  }, []);

  return (
    <div className="card transactions">
      <div className="d-flex j-between">
        <h5>Transactions</h5>
        <DatePicker
          selected={startDate}
          onChange={handleChange}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          showFullMonthYearPicker
        />
      </div>

      <div className="card-body">

        {transaction?.length > 0
          ? transaction.map((e) => {
            const date = new Date(e.createdAt);
            const formattedDate = date.toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            });

            return (
              <div key={e.invoice} className="d-flex j-between mb20" >

                <div className="d-flex" style={{ flexDirection: "row", justifyContent: "start" }}>
                  <div className="icon">
                    <Icon color={e?.type?.toLowerCase().includes("new") ? "success" : "error"}>receipt</Icon>
                  </div>
                  <div className="desc-small">
                    <p >{e.type}</p>
                    <span>TNX ID: {e.id}</span><br />
                    <span>{formattedDate}</span>
                  </div>
                </div>


                <div className="desc-small">
                  <h5 style={{ color: "green" }} className="mb10">₹{e.amount}</h5>
                  <div className="textCenter c-point" style={{ fontSize: 13, lineHeight: "normal" }}>
                    <Icon className="textCenter">download</Icon>
                    <p>Invoice</p>
                  </div>
                </div>

              </div>
            );
          })
          :
          <div className="d-flex">
            <h6 className="help-text">No Transaction is found for selected Month.</h6>
          </div>
        }
      </div>
    </div>
  );
}

export default Transactions;
