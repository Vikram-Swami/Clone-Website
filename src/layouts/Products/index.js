// @mui material components
import Grid from "@mui/material/Grid";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";

// Next Work Dashboard React components
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Next Work Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Billing page components
import { useEffect } from "react";
import ProductController from "Services/ConnectionsServices";
import { useState } from "react";
import { useSoftUIController } from "context";
import DefaultProductCard from "examples/Cards/InfoCards/DefaultProductCard";

function Products() {
  const productController = new ProductController();
  const [products, setProducts] = useState([]);
  const [controller] = useSoftUIController();
  const { user } = controller;

  const getProducts = async () => {
    try {
      const storageData = await productController.getPublished();
      console.log(storageData);
      if (storageData?.status === 200) {
        setProducts(storageData?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createConnection = async () => {
    try {
      const response = await productController.createConnections();
      console.log(response);
    } catch (error) {
      console.log(error);
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
                      title={`Storage : ${data.range} GB`}
                      space={`Space: ${data.space} GB`}
                      rent={`Rent: ${data.rent}`}
                      basicAmt={`Basic Amount: ${data.basicAmt}`}
                      tax={`Tax: ${data.tax}`}
                      totalprice={`Total Price: ${
                        parseFloat(data.basicAmt + (data.basicAmt * data.tax) / 100) * data.range
                      }`}
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
