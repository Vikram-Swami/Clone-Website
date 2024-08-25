import { useRef, useState } from "react";
// @mui material components

import { IconButton, InputAdornment, FormControl, FormLabel, MenuItem, Select, Card } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

import ApiClient from "Services/ApiClient";
import { registerUser } from "Services/endpointes";
import { setDialog } from "context";
import { useSoftUIController } from "context";
import { toast } from "react-toastify";

function CreateMembers() {
  const form = useRef(null);
  const [controller, dispatch] = useSoftUIController();
  const { user } = controller;

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const registerHandler = async (e) => {
    try {
      const formdata = new FormData(form.current);
      formdata.append("sponsorId", user?.id)
      const response = await ApiClient.createData(registerUser, formdata);
      if (response.status === 200) {
        form.current.reset();
      }
      setDialog(dispatch, [response]);

    } catch (error) {
      toast.error(error.response?.data?.message ?? "Network Error!");
      setLoading(dispatch, false);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox component="form" role="form" textAlign="center" display="flex" encType="multipart/form-data" flexDirection="column" justifyContent="space-around" alignItems="center" ref={form}>
        <SoftBox width="50%">
          <SoftBox mb={2} width="100%">
            <FormControl sx={{ display: "flex", gap: 5, justifyContent: "center", flexDirection: "row", alignContent: "center" }} >
              <FormLabel color="primary" sx={{ alignSelf: "center" }}>Initials</FormLabel>
              <Select
                labelId="initial"
                defaultValue="Mr."
                label="Initial"
                name="initial"
              >
                <MenuItem fullWidth value="Mr.">Mr.</MenuItem>
                <MenuItem value="Mrs.">Mrs.</MenuItem>
                <MenuItem value="Miss">Miss</MenuItem>
                <MenuItem value="Ms.">Ms.</MenuItem>
                <MenuItem value="Dr.">Dr.</MenuItem>
              </Select>
            </FormControl>
          </SoftBox>

          <SoftBox mb={2} width="100%">
            <SoftInput name="fullName" placeholder="Name" />
          </SoftBox>

          <SoftBox mb={2} width="100%">
            <SoftInput name="dob" type="date" placeholder="Date of Birth" />
          </SoftBox>

          <SoftBox mb={2} width="100%">
            <SoftInput name="email" type="email" placeholder="Email" />
          </SoftBox>

          <SoftBox mb={2} width="100%">
            <SoftInput
              name="phone"
              type="tel"
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
            <SoftTypography color="text" fontWeight="light" fontSize="0.8rem">
              Please enter the Valid 10 digit Mobile Number
            </SoftTypography>
          </SoftBox>

          <SoftBox mb={2} width="100%">
            <SoftInput
              name="password"
              type={showPassword ? "text" : "password"} // Toggle between text and password
              placeholder="Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    sx={{ position: "absolute", right: 10, top: 0 }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <SoftTypography color="text" fontWeight="light" fontSize="0.8rem">
              Password must be Alphanumerical, minimum 8 characters long and must contain at least one special character.
            </SoftTypography>
          </SoftBox>

          <FormControl mb={2} sx={{ marginBottom: 2, width: '100%', display: "flex", gap: 5, justifyContent: "center", flexDirection: "row", alignContent: "center" }} >
            <Select
              labelId="accountType"
              defaultValue="individual"
              name="type"
            >
              <MenuItem fullWidth value="individual">Individual</MenuItem>
              <MenuItem value="organization">Organization</MenuItem>
            </Select>
          </FormControl>

          <SoftBox mb={2} width="100%">
            <SoftInput name="placementId" defaultValue={user.id} type="text" placeholder="Placement Id" />
          </SoftBox>

          <SoftBox mt={4} mb={1}>
            <SoftButton type="submit" variant="gradient" color="dark" onClick={registerHandler}>
              Submit
            </SoftButton>
          </SoftBox>

        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default CreateMembers;
