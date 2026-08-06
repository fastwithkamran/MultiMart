import { CheckoutSteps, Header, Footer, Payment } from "../../components";
import { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../../server";
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js"

function PaymentPage() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    async function getStripeApiKey() {
      const { data } = await axios.get(`${server}/payment/stripeapikey`);
      setStripeApiKey(data.stripeApikey);
    }

    getStripeApiKey();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-200">
      <Header />
      <CheckoutSteps active={2} />
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Payment />
        </Elements>
      )}
      <Footer />
    </div>
  );
}

export default PaymentPage;
