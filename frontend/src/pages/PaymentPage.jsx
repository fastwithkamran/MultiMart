import { CheckoutSteps, Header, Footer, Payment } from "../components";


function PaymentPage() {
  return (
    <div className="w-full min-h-screen bg-gray-200">
        <Header />
        <CheckoutSteps active={2}/>
        <Payment />
        <Footer />      
    </div>
  )
}

export default PaymentPage
