import React, { useEffect, useState } from "react";
import { Icon } from "@mui/material";
import { useSoftUIController } from "context";
import TeamView from "./data/team";
import "reactflow/dist/style.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import TreeComponent from "./TreeView";
import { getMember } from "api/users";
import { setDialog } from "context";

function Team() {
  const [controller, dispatch] = useSoftUIController();
  const [filteredMember, setMember] = useState([]);
  const { member, user, loading } = controller;

  const [view, setView] = useState("table");

  const fetchMember = async () => {
    let newMember = await getMember(dispatch, user);
    setMember(newMember.filter(e => e.sponsorId?.toLowerCase() != user?.id?.toLowerCase()));
  }

  const memberSearch = () => {
    setDialog(dispatch, [
      {
        status: "search",
        title: "Looking for a Member! We are here to help you!",
        children: <input type="search" name="member" placeholder="Enter USER ID | Email | Phone" />,
        action: "submit",
        call: (form) => {
          let id = form.get("member")
          let filter = member.filter(e => e.userId?.toLowerCase() == id?.toLowerCase() || e.email?.toLowerCase() == id?.toLowerCase() || e.phone == id);
          if (filter && filter.length > 0) {
            setMember(filter);
            setDialog(dispatch, []);
          }
          else {
            setDialog(dispatch, [{ status: 400, message: "No Member found!" }])
          }
        }

      }
    ])
  }

  useEffect(() => {
    member?.length < 1 && fetchMember();
  }, []);

  const memoizedRows = TeamView.rows(filteredMember, "", dispatch, user);
  const directMembers = member.filter(e => e.sponsorId?.toLowerCase() == user.id?.toLowerCase());
  const directMemoizeRow = TeamView.rows(directMembers, Math.max(...directMembers.map(e => e.member)), dispatch, user);

  return (
    <DashboardLayout>
      <DashboardNavbar call={fetchMember} />
      {member.filter(e => e.sponsorId?.toLowerCase() == user.id?.toLowerCase())?.length > 0 && view == "table" ?
        <div className='card mb20' style={{ maxHeight: "100%" }}>

          <div className="d-flex j-between mb20">
            <h5 style={{ whiteSpace: 'nowrap' }} >My Direct Line</h5>
          </div>
          <>
            <Table columns={TeamView.columns} rows={directMemoizeRow} />
          </>


        </div>
        :
        ""
      }
      <div className='card mt5' style={{ maxHeight: "100%" }}>

        <div className="d-flex j-between mb20">
          <h5 style={{ whiteSpace: 'nowrap' }} >
            {view === "table" ? "Table View" : "Tree View"}
          </h5>
          {member.length > 0 && <Icon className="c-point" onClick={memberSearch}>search</Icon>}
          {member.length > 0 && <button className="btn" onClick={() => setView(view === "table" ? "tree" : "table")}>{view === "table" ? "Tree" : "Table"}</button>}
        </div>
        {filteredMember.filter(e => e.sponsorId?.toLowerCase() != user?.id?.toLowerCase())?.length > 0 ? (
          view === "table" ? (
            <>
              <Table columns={TeamView.columns} rows={memoizedRows} />
            </>
          ) : (
            <TreeComponent data={member} />
          )
        ) : <div className="card-body d-flex">
          <h6 className="help-text">{loading ? "Looking for Team Members" : "No Team Members Found! Grom Your Network to Earn Unlimited!"}</h6>
        </div>
        }

      </div>

    </DashboardLayout >
  );
}

export default Team;
