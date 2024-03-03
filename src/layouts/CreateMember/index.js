// @mui material components
import Card from "@mui/material/Card";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import SignUp from "layouts/authentication/sign-up";
import SoftInput from "components/SoftInput";
import { Checkbox, NativeSelect } from "@mui/material";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SoftButton from "components/SoftButton";
import FormDialog from "components/Pop";
import ApiClient from "Services/ApiClient";
import { registerUser } from "Services/endpointes";

function CreateMembers() {
    const [agreement, setAgreement] = useState(true);
    const [user, setUser] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const form = useRef(null);
    const navigate = useNavigate();
    let newUserId = sessionStorage.getItem("userId") ?? 0;
    const [step, setStep] = useState(newUserId ? 2 : 1);
    const fetchPostalDetails = async (postalCode, e) => {
        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${postalCode}`);
            const data = await response.json();
            if (data && data[0] && data[0].PostOffice) {
                const postOffice = data[0].PostOffice[0];
                form.current.city.value = postOffice?.District;
                form.current.state.value = postOffice?.State;
                form.current.country.value = postOffice?.Country;
                form.current.postalCode.parentNode.style.border = "2px solid #67ca67 ";
            } else {
                form.current.postalCode.parentNode.style.border = "2px solid red";
            }
        } catch (error) {
            console.error("Error fetching postal details:", error);
        }
    };
    const bankDetails = async (ifsc, e) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/ifsc-validate/${ifsc}`);
            const data = await response.json();
            if (data) {
                const bank = data?.data?.BANK;
                form.current.bankName.value = bank;
                form.current.IFSC.parentNode.style.border = "2px solid #67ca67 ";
            } else {
                form.current.IFSC.parentNode.style.border = "2px solid red";
            }
        } catch (error) {
            form.current.IFSC.parentNode.style.border = "2px solid red";

            console.error("Error fetching postal details:", error);
        }
    };

    const handlePostalCodeChange = async (e) => {
        const postalCode = e.target.value;
        if (postalCode.length == 6) {
            await fetchPostalDetails(postalCode, e);
            return;
        } else {
            form.current.postalCode.parentNode.style.border = "none";
            form.current.city.value = "City";
            form.current.state.value = "State";
            form.current.country.value = "Country";
        }
    };
    const handleIFSCCodeChange = async (e) => {
        const ifsc = e.target.value;
        if (ifsc.length == 11) {
            await bankDetails(ifsc, e);
            return;
        } else {
            form.current.IFSC.parentNode.style.border = "none";
        }
    };

    const handleSetAgreement = () => setAgreement((prevAgreement) => !prevAgreement);

    const registerHandler = async (e) => {
        try {
            const formdata = new FormData(form.current);
            const userData = await ApiClient.createData(registerUser, formdata);
            if (userData.status === 200) {
                setIsOpen(true);
                setStep(step + 1);
                setUser(userData);
                sessionStorage.setItem("userId", userData?.data?.id);
                form.current.reset();
            } else {
                setIsOpen(true);
                setUser(userData);
            }
        } catch (error) {
            setIsOpen(true);
            setUser(error.response.data);
            console.error("Registration failed:", error);
        }
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox py={3}>
                <SoftBox mb={3}>
                    <Card>
                        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                            <SoftTypography variant="h6">Add Member</SoftTypography>
                        </SoftBox>
                        <SoftBox
                            sx={{
                                "& .MuiTableRow-root:not(:last-child)": {
                                    "& td": {
                                        borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                                            `${borderWidth[1]} solid ${borderColor}`,
                                    },
                                },
                            }}
                        >
                            <Card>
                                <SoftBox pt={2} pb={3} px={3}>
                                    <SoftBox
                                        component="form"
                                        role="form"
                                        encType="multipart/form-data"
                                        method="POST"
                                        ref={form}
                                    >


                                        <SoftBox mb={2}>
                                            <h3>Provide Member Details <small>(please fill your user Id as sponsorId)</small></h3>
                                        </SoftBox>
                                        <SoftBox mb={2}>
                                            <SoftInput name="fullName" placeholder="Name" />
                                        </SoftBox>
                                        <SoftBox mb={2}>
                                            <NativeSelect
                                                fullWidth
                                                defaultValue="Mr. / Ms. / Mrs."
                                                inputProps={{
                                                    name: "initial",
                                                    id: "uncontrolled-native",
                                                }}
                                            >
                                                <option value="Mr. / Ms. / Mrs.">Mr. / Ms. / Mrs.</option>
                                                <option value="Mr.">Mr.</option>
                                                <option value="Ms.">Ms.</option>
                                                <option value="Mrs.">Mrs.</option>
                                            </NativeSelect>
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
                                                Password must be Alphanumerical and must contain atleast one special charactor.
                                            </SoftTypography>
                                        </SoftBox>
                                        <SoftBox mb={2}>
                                            <SoftInput name="sponsorId" type="text" placeholder="sponsor id" />
                                        </SoftBox>
                                        <SoftBox mb={2}>
                                            <SoftInput name="placementId" type="text" placeholder="placement id" />
                                        </SoftBox>
                                        <SoftBox display="flex" alignItems="center">
                                            <Checkbox checked={agreement} onChange={handleSetAgreement} />
                                            <SoftTypography
                                                variant="button"
                                                fontWeight="regular"
                                                onClick={handleSetAgreement}
                                                sx={{ cursor: "poiner", userSelect: "none" }}
                                            >
                                                &nbsp;&nbsp;I agree the&nbsp;
                                            </SoftTypography>
                                            <SoftTypography
                                                component="a"
                                                href="#"
                                                variant="button"
                                                fontWeight="bold"
                                                textGradient
                                            >
                                                Terms and Conditions
                                            </SoftTypography>
                                        </SoftBox>
                                        <SoftBox mt={4} mb={1}>
                                            <SoftButton variant="gradient" color="dark" onClick={registerHandler}>
                                                Next
                                            </SoftButton>
                                        </SoftBox>
                                    </SoftBox>
                                </SoftBox>
                            </Card>
                            <FormDialog open={isOpen} setOpen={setIsOpen} data={user} />
                        </SoftBox>
                    </Card>
                </SoftBox>
            </SoftBox>
            {/* <Footer /> */}
        </DashboardLayout>
    );
}

export default CreateMembers;
