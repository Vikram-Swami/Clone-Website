// Server Bridge Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Billing page components
import { useEffect } from "react";
import { useSoftUIController } from "context";
import { setDialog } from "context";
import ProductCard from "components/ProductCard";
import storage from "../../assets/images/storage.png"
import { getSlabs } from "api/users";
import { generateSlab } from "api/users";
import { PaymentMode, TnxId } from "./Form";
import { buyConnection } from "api/users";
import { toast } from "react-toastify";

function Products() {
  // const [products, setProducts] = useState([]);
  const [controller, dispatch] = useSoftUIController();
  const { products } = controller;


  function formatIndianCurrency(num) {
    const numStr = num.toString();

    // Match last 3 digits first, then continue matching groups of 2 digits for Indian numbering
    const lastThree = numStr.substring(numStr.length - 3);
    const otherNumbers = numStr.substring(0, numStr.length - 3);

    if (otherNumbers !== '') {
      return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
    } else {
      return lastThree;  // No formatting needed for numbers less than 1,000
    }
  }

  const handleGenerate = () => {
    setDialog(dispatch, [{
      status: "form",
      title: "Enter Required Unit!",
      children: <input type="number" placeholder="Enter required TB" name="range" />,
      action: "Generate",
      call: (form) => generateSlab(form, dispatch, products)
    }])
  }

  const handlePayment = (form, storage, amount) => {
    if (form?.get("paymentMethod") == "TnxId") {
      setDialog(dispatch, [{ status: "form", title: "Kindly Enter Transaction Number", children: <TnxId amount={amount} />, action: "Confirm", call: (newForm) => { buyConnection(newForm, storage, form.get("paymentMethod"), dispatch) } }])
    } else {
      toast.error("Selcted payment method is not Available currently")
    }
  }


  useEffect(() => {
    products?.length < 1 && getSlabs(dispatch, "published");
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar call={() => getSlabs(dispatch, "published")} />
      <ProductCard />

      <div className="d-flex j-evenly prod-cards">
        {products?.length > 0
          ? products?.map((e, i) => {
            let price = e.range >= 1 ? e.range * e.basicAmt : e.basicAmt;
            let rent = price * e.rent / 100;
            price += price * e.tax / 100;

            return (
              <div key={i} className='card mb10' style={{ padding: 0 }}>
                <div className="image">
                  <img src={storage} alt="Storage" />
                  <p className="prod-unit">{e?.range ?? 0} TB</p>
                  <p className="card-badge">Cloud Storage</p>
                </div>
                <div style={{ padding: "10px" }}>
                  <div className="card-filler">
                    <p>₹{rent}<br /> Every Month</p>
                    <div style={{ borderRight: "1px solid grey" }}></div>
                    <p>{e?.rule * 12} Months<br /> Assured Return</p>
                  </div>
                  <div className="d-flex j-between">
                    <h4 className="price-tag">₹{formatIndianCurrency(price)} (incl GST)</h4>
                    <button className="btn" onClick={() => {
                      setDialog(dispatch, [{ status: 'form', title: "Select Payment Mode", message: `Amount Payble: ₹${formatIndianCurrency(price)} (incl GST)`, children: <PaymentMode amount={formatIndianCurrency(price)} />, action: "Pay Now", call: (form) => handlePayment(form, e.range, price) }])
                    }}>Buy</button>
                  </div>
                </div>

              </div>
            )
          }
          ) :
          <div className="card-body d-flex">
            <h6 className="help-text">Something Went Wrong, Kindly try to reach here back in some time.</h6>
          </div>
        }
        <div className='card mb10' style={{ padding: 0 }}>
          <div className="image">
            <img src={storage} alt="Storage" />
            <p className="prod-unit">TB - ?</p>
            <p className="card-badge">cloud storage</p>
          </div>
          <div style={{ padding: "10px" }}>
            <div className="card-filler">
              <p> Customize Your Purchase</p>
            </div>
            <div className="d-flex j-center">
              <button className="btn" onClick={handleGenerate}>Create New</button>
            </div>
          </div>

        </div>
      </div>

    </DashboardLayout >
  );
}

export default Products;
