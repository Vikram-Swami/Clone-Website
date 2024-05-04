// @mui material components
import Grid from "@mui/material/Grid";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";

// Next Work Dashboard React components

// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Billing page components
import { useEffect, useRef } from "react";
import { useSoftUIController } from "context";
import DefaultProductCard from "examples/Cards/InfoCards/DefaultProductCard";

import ApiClient from "Services/ApiClient";
import { getPublished } from "Services/endpointes";
import { setProducts } from "context";
import { setLoading } from "context";
import { toast } from "react-toastify";
import { Box, Divider, Icon, IconButton, InputBase, Paper } from "@mui/material";
import { setDialog } from "context";
import { generateProduct } from "Services/endpointes";

function Products() {
  // const [products, setProducts] = useState([]);
  const [controller, dispatch] = useSoftUIController();
  const { products } = controller;
  const inputRef = useRef();
  const getProducts = async () => {
    try {
      setLoading(dispatch, true);
      const response = await ApiClient.getData(getPublished);
      if (response?.status === 200) {
        setProducts(dispatch, response?.data);
      } else {
        setDialog(dispatch, [response]);
      }
    } catch (error) {
      toast.error(error.toString());
      setLoading(dispatch, false);
    }
  };
  const generate_Product = async () => {
    try {
      setLoading(dispatch, true);
      console.log(inputRef.current.children[0].value);
      const response = await ApiClient.getData(
        generateProduct + `/${inputRef.current.children[0].value}`
      );
      if (response?.status === 200) {
        // Update products directly in the controller
        const updatedProducts = [...products, response.data];
        setProducts(dispatch, updatedProducts);
        inputRef.current.value = ""; // Clear input after successful submission
        toast.success(response.message);
      } else {
        setDialog(dispatch, [response]);
      }
    } catch (error) {
      toast.error(error.toString());
    } finally {
      setLoading(dispatch, false);
    }
  };
  useEffect(() => {
    products.length < 1 && getProducts();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar call={getProducts} />
      <SoftBox mt={4}>
        <SoftBox mb={1.5}>
          <SoftBox display="flex" justifyContent="center" alignItems="center" px={2} pb={1}>
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                generate_Product();
              }}
              sx={{ p: "2px 2px", display: "flex", alignItems: "center", width: 300 }}
            >
              <InputBase
                ref={inputRef}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Enter Required Tera Byte"
                inputProps={{ "aria-label": "Enter Required TB" }}
              />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <Icon>cloud_download</Icon>
              </IconButton>
            </Box>
          </SoftBox>
          <Divider sx={{ width: "100%", m: 0.5, mb: 2 }} orientation="horizontal" />
          <Grid container spacing={3} justifyContent="space-around">
            <Grid item xs={12} lg={10}>
              <Grid container spacing={3}>
                {products.map((data, index) => {
                  let multiplier = parseFloat(data.range) < 1 ? 1 : data.range;
                  return (
                    <Grid key={index} item xs={12} md={6} xl={4}>
                      <DefaultProductCard
                        icon="cloud"
                        range={data.range}
                        storage={data.space}
                        rent={data.rent}
                        basicAmt={data.basicAmt}
                        tax={data.tax}
                        totalprice={
                          parseFloat(multiplier * data.basicAmt) +
                          parseFloat(multiplier * data.basicAmt * data.tax) / 100
                        }
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Products;
