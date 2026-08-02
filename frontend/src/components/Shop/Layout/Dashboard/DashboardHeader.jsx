import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div className="w-full h-14 bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to={"/dashboard"}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5oWZDONBetL_aTOElWb_x6ECh9FPrnJr4vEAkyedUGQ&s=10"
            alt="Logo"
            className="m-1 h-15 w-30 object-cover mix-blend-multiply"
          />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to={"/dashboard-coupons"} className="hidden md:block">
            <AiOutlineGift
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to={"/dashboard-events"} className="hidden md:block">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to={"/dashboard-products"} className="hidden md:block">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to={"/dashboard-orders"} className="hidden md:block">
            <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link>
          <Link to={"/dashboard-messages"} className="hidden md:block">
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to={`/shop/${seller._id}`}>
            <img
              alt="Image"
              src={`${seller.avatar.url}`}
              className="w-12 h-12 rounded-full object-cover border-2 border-green-400"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
