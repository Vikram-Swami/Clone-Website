// @mui material components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Icon from "@mui/material/Icon";

// Custom styles for the SidenavCard
import { card, cardContent, cardIconBox } from "examples/Sidenav/styles/sidenavCard";

// Next Work Dashboard React context
import { useSoftUIController } from "context";

function SidenavCard() {
  const [controller] = useSoftUIController();
  const { miniSidenav, sidenavColor } = controller;
  const star = {
    backgroundColor: "white",
    width: "2rem",
    height: "2rem",
    fontSize: "30px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  }

  const handleDownload = () => {
    // Create a dynamic link and trigger the download
    const link = document.createElement("a");
    link.href = `/knoone.pdf`; // Path to your file in the public folder
    link.download = "KNO-ONE_TRIWAVES.pdf"; // Name of the file after download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card sx={(theme) => card(theme, { miniSidenav })}>
      <CardContent sx={(theme) => cardContent(theme, { sidenavColor })}>
        <div style={star}>
          <Icon color="warning">
            star
          </Icon>
        </div>
        <div style={{ lineHeight: 1 }}>
          <h6 className="help-text" style={{ color: "white" }}>
            Need help?
          </h6>
          <div className="mb10">
            <p className="help-text" style={{ color: "white" }}>
              Please check our docs
            </p>
          </div>
          <button className="btn" style={{ background: "white", color: "black" }} onClick={handleDownload}>Documentation</button>
        </div>
      </CardContent>
    </Card>
  );
}

export default SidenavCard;
