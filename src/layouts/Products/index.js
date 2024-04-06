// @mui material components
import Grid from "@mui/material/Grid";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";

// Next Work Dashboard React components

// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Billing page components
import { useEffect } from "react";
import { useSoftUIController } from "context";
import DefaultProductCard from "examples/Cards/InfoCards/DefaultProductCard";

import ApiClient from "Services/ApiClient";
import { getPublished } from "Services/endpointes";
import { setProducts } from "context";
import { setLoading } from "context";
import { toast } from "react-toastify";
import { Box, Divider, Icon, IconButton, InputBase, Paper } from "@mui/material";

function Products() {
  // const [products, setProducts] = useState([]);
  const [controller, dispatch] = useSoftUIController();
  const { products } = controller;

  const getProducts = async () => {
    try {
      setLoading(dispatch, true);
      const storageData = await ApiClient.getData(getPublished);
      if (storageData?.status === 200) {
        setProducts(dispatch, storageData?.data);
      }
    } catch (error) {
      toast.error(error.toString());
    } finally {
      setLoading(dispatch, false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4}>
        <SoftBox mb={1.5}>
          <SoftBox display="flex" justifyContent="center" alignItems="center" px={2} pb={1}>
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();


              }}
              sx={{ p: '2px 2px', display: 'flex', alignItems: 'center', width: 300 }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Enter Required Tera Byte"
                inputProps={{ 'aria-label': 'Enter Required TB' }}
              />
              <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
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
                  return (<Grid key={index} item xs={12} md={6} xl={4}>
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
                  </Grid>)
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
