
import { useSoftUIController } from "context";
import { setDialog } from "context";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import PropTypes from "prop-types";

function TreeView({ id }) {
  const [controller, dispatch] = useSoftUIController();
  const { member } = controller;
  let mem = member?.filter(e => e.sponsorId == id?.toLowerCase());
  return (
    <>
      {
        mem
          ?

          mem.map(e =>
            member.find(f => f.sponsorId?.toLowerCase() == e?.id?.toLowerCase())
              ?
              <li key={e.id} style={{ width: 100 }}>
                <details open style={{ width: "200px", display: "flex", justifyContent: "space-between", padding: "2px 4px" }}>
                  <summary onClick={() => setDialog(dispatch, [{
                    status: "form", message: `${e.name} - ${e.userId}`, children: <div><p>{e.name}</p><p>Storage: {e.storage}TB<p>Phone: {e.phone}</p><p>Email: {e.email}</p></p></div>, action: "close"
                  }])}>{e.name?.substr(0, 8)}</summary>
                  <ul>
                    <TreeView id={e.id} />
                  </ul>
                </details>
              </li>
              :
              <li key={e.id} onClick={() => setDialog(dispatch, [{
                status: "form", message: `${e.name} - (${e.userId})`, children: <div><p>{e.name}</p><p>Storage: {e.storage}TB<p>Phone: {e.phone}</p><p>Email: {e.email}</p></p></div>, action: "close"
              }])}>
                <span>{e.name?.substr(0, 8)}</span>


              </li>
          )
          : ""
      }
    </>
  )
}

const MemberView = (e) => {
  return (
    <div><p>{e.name}</p><p>Storage: {e.storage}TB<p>Phone: {e.phone}</p><p>Email: {e.email}</p></p></div>
  )
}

TreeView.defaultProps = {
  member: [],
  id: ""
};

TreeView.propTypes = {
  member: PropTypes.array,
  id: PropTypes.string
};


export default TreeView;
