// @mui material components
import Card from "@mui/material/Card";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import SoftInput from "components/SoftInput";
import { FormControl, FormLabel, MenuItem, Select } from "@mui/material";
import { useRef, useState } from "react";
import SoftButton from "components/SoftButton";

import ApiClient from "Services/ApiClient";
import { registerUser } from "Services/endpointes";
import { setDialog } from "context";
import { useSoftUIController } from "context";
import { toast } from "react-toastify";

function CreateMembers() {
  const form = useRef(null);
  const [dispatch] = useSoftUIController();

  const registerHandler = async (e) => {
    try {
      const formdata = new FormData(form.current);
      const response = await ApiClient.createData(registerUser, formdata);
      if (response.status === 200) {
        setDialog(dispatch, [response]);
        form.current.reset();
      } else {
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Network Error!")
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" p={3}>
              <SoftTypography variant="h6">ADD MEMBER</SoftTypography>
            </SoftBox>
            <SoftBox

            >
              <Card>
                <SoftBox display="flex" justifyContent="center" alignItems="center" pt={2} pb={3} px={3}>
                  <SoftBox
                    component="form"
                    role="form"
                    encType="multipart/form-data"
                    method="POST"
                    ref={form}
                  >
                    <SoftBox mb={2}>
                      <FormControl sx={{ display: "flex", gap: 5, justifyContent: "center", flexDirection: "row", alignContent: "center" }} >
                        <FormLabel color="primary" sx={{ alignSelf: "center" }} >Initials</FormLabel>
                        <Select
                          labelId="initial"
                          id="demo-simple-select"
                          defaultValue="Mr."
                          label="Initial"
                          name="initial"
                        >
                          <MenuItem fullwidth value="Mr.">Mr.</MenuItem>
                          <MenuItem value="Mrs.">Mrs.</MenuItem>
                          <MenuItem value="Miss">Miss</MenuItem>
                          <MenuItem value="Ms.">Ms.</MenuItem>
                          <MenuItem value="Dr.">Dr.</MenuItem>
                          {/* Add more titles as needed */}
                        </Select>
                      </FormControl>
                    </SoftBox>
                    <SoftBox mb={2}>
                      <SoftInput name="fullName" placeholder="Name" />
                    </SoftBox>
                    <SoftBox mb={2}>
                      <SoftInput name="email" type="email" placeholder="Email" />
                    </SoftBox>
                    <SoftBox mb={2}>
                      <SoftInput
                        name="phone"
                        type="text"
                        placeholder="Phone"
                        onChange={(e) => {
                          e.target.value.replace();
                          e.target.value =
                            e.target.value.length > 10
                              ? e.target.value.toString().substr(0, 10)
                              : e.target.value;
                        }}
                        max={10}
                        onKeyPress={(e) => {
                          if (isNaN(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                      <SoftTypography color="text" fontWeight="light" fontSize="14px">
                        Please enter the Valid Mobile Number
                      </SoftTypography>
                    </SoftBox>
                    <SoftBox mb={2}>
                      <SoftInput name="password" type="password" placeholder="Password" />
                      <SoftTypography color="text" fontWeight="light" fontSize="14px">
                        Password must be Alphanumerical and must contain atleast one special
                        charactor.
                      </SoftTypography>
                    </SoftBox>
                    <SoftBox mb={2}>
                      <SoftInput name="sponsorId" type="text" placeholder="sponsor id" />
                    </SoftBox>
                    <SoftBox mb={2}>
                      <SoftInput name="placementId" type="text" placeholder="placement id" />
                    </SoftBox>
                    <SoftBox mt={4} mb={1}>
                      <SoftButton variant="gradient" color="dark" onClick={registerHandler}>
                        Submit
                      </SoftButton>
                    </SoftBox>
                    <SoftBox display="block" mt="2">
                      <SoftTypography
                        component="a"
                        href="#"
                        variant="button"
                        fontWeight="bold"
                        textGradient
                      >
                        By submiting, you agree our Conditions of Use and Privacy Notice.
                      </SoftTypography>
                    </SoftBox>
                  </SoftBox>
                </SoftBox>
              </Card>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default CreateMembers;
