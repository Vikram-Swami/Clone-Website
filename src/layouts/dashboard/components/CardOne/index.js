// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Images
import ivancik from "assets/ivancik.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useSoftUIController } from "context";
import { handleCopyLink } from "api/users";
import { useEffect } from "react";
import { setDialog } from "context";
import { completeProfile } from "api/users";

function CardOne() {

  const [controller, dispatch] = useSoftUIController();
  const { user } = controller;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isVerfied && !user.accountNo && user.aadharNo) {
      setDialog(dispatch, [{
        status: "form",
        title: "Your Account is Not Verified!",
        message: "Kindly complete your KYC to access more features!",
        action: "Complete KYC",
        call: () => { completeProfile(dispatch, navigate) }
      }])
    }
  }, [user])


  return (
    <div className="card card-image">
      <h5 className="mb20">Add New Member</h5>
      <div className="d-flex column g8 desc-small">
        <p className="mb20">
          Let&apos;s grow together! Join our vibrant community and amplify possibilities with
          new connections. Your presence makes us stronger. Join us now!
        </p>
        <div className="d-flex j-start mb10">
          <button className="btn btn-trans" onClick={() => handleCopyLink(user, null, dispatch)}>
            Invite <Icon style={{ verticalAlign: "middle" }}>arrow_forward</Icon>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardOne;
