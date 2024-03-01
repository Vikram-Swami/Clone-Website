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
import ProductController from "Services/ConnectionsServices";
import { useState } from "react";
import { useSoftUIController } from "context";
import DefaultProductCard from "examples/Cards/InfoCards/DefaultProductCard";

function Products() {
  const productController = new ProductController();
  const [products, setProducts] = useState([]);


  const getProducts = async () => {
    try {
      const storageData = await productController.getPublished();
      if (storageData?.status === 200) {
        setProducts(storageData?.data);

      }
    } catch (error) {
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
          <Grid container spacing={3} justifyContent="space-around">
            <Grid item xs={12} lg={10}>
              <Grid container spacing={3}>
                {products.map((data, index) => (
                  <Grid key={index} item xs={12} md={6} xl={4}>
                    <DefaultProductCard
                      icon="cloud"
                      range={data.range}
                      storage={data.space}
                      rent={data.rent}
                      basicAmt={data.basicAmt}
                      tax={data.tax}
                      totalprice={parseFloat(data.range * data.basicAmt) + parseFloat((data.range * data.basicAmt) * data.tax) / 100}
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
