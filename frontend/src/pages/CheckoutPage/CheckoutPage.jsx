import { Checkout, CheckoutSteps, Header, Footer } from "../../components";

function CheckoutPage() {
  return (
    <div>
      <Header />
      <CheckoutSteps active={1} />
      <Checkout />
      <Footer />
    </div>
  );
}

export default CheckoutPage;
