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
import { useSoftUIController, setProducts } from "context";
import DefaultProductCard from "examples/Cards/InfoCards/DefaultProductCard";
import ApiClient from "Services/ApiClient";
import { getPublished } from "Services/endpointes";
import SoftInput from "components/SoftInput";
import { toast } from "react-toastify";

function Products() {
  const [controller, dispatch] = useSoftUIController();
  const { products } = controller;

  const getProducts = async () => {
    try {
      setLoading(dispatch, true);
      console.log("============================================")
      const storageData = await ApiClient.getData(getPublished);
      console.log("====================called========================")
      setProducts(dispatch, storageData?.data);
      toast.success(storageData.message);
    } catch (error) {
      toast.info(error.response?.data?.message);
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
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftBox pr={1}>
              <SoftInput
                placeholder="Required TB"
                icon={{ component: "search", direction: "left" }}
              />
            </SoftBox>
          </SoftBox>
          <Grid container spacing={3} justifyContent="space-around">
            <Grid item xs={12} lg={10}>
              <Grid container spacing={3}>
                {products?.map((data, index) => (
                  <Grid key={index} item xs={12} md={6} xl={4}>
                    <DefaultProductCard
                      icon="cloud"
                      range={data.range}
                      storage={data.space}
                      rent={data.rent}
                      basicAmt={data.basicAmt}
                      tax={data.tax}
                      totalprice={
                        parseFloat(data.range * data.basicAmt) +
                        parseFloat(data.range * data.basicAmt * data.tax) / 100
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Products;
