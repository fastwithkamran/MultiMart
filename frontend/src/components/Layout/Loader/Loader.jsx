import Lottie from "lottie-react";
import animationData from "../../../assests/Animations/loader.json";

function Loader() {
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-72 h-72 object-cover">
          <Lottie animationData={animationData} loop={true} autoPlay={true} />
        </div>
      </div>
    </>
  );
}

export default Loader;
