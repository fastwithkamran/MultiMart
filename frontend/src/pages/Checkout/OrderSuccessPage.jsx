import Lottie from "lottie-react";
import { Header, Footer } from "../../components";
import animationData from "../../assests/Animations/One Click Order.json";

function OrderSuccessPage() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center">
        <div className="w-72 h-72">
          <Lottie animationData={animationData} loop={true} autoPlay={true} />
        </div>
        <h5 className="text-center mb-14 text-[25px] text-black/63">
          Your Order is successful
        </h5>
      </div>
      <Footer />
    </>
  );
}

export default OrderSuccessPage;
