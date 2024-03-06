import React from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function WorkinProgress() {
    return (

        <Card>
            <SoftBox display="flex" justifyContent="center" alignItems="center" p={3} flexDirection="column" >
                {/* Replace the following line with your company logo */}
                <img src="logo.png" alt="Company Logo" style={{ maxWidth: "500px" }} />
                <SoftTypography variant="h1" mt={20}>
                    Work in Progress
                </SoftTypography>
                <img src="work.png" alt="Company Logo" style={{ maxWidth: "300px", marginBottom: "100px" }} />
            </SoftBox>
        </Card>

    );
}

export default WorkinProgress;
