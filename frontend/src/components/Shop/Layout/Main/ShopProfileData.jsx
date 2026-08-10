import { useEffect, useState } from "react";
import ProductCard from "../../../Landing/Products/ProductCard";
import { Link, useParams } from "react-router-dom";
import styles from "../../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../../../redux/actions/product";
import Ratings from "../../../Landing/Products/Ratings";
import { getAllEventsShop } from "../../../../redux/actions/event";
import EventCard from "../../../Landing/Events/EventCard";

function ShopProfileData({ isOwner }) {
  const [active, setActive] = useState(1);
  const { products } = useSelector((state) => state.product);
  const { events } = useSelector((state) => state.event);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventsShop(id));
  }, [dispatch, id]);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row w-full items-center justify-between">
        <div className="w-full flex">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-medium text-[15px] sm:text-[20px] ${active === 1 ? "text-red-500" : "text-[#333]"} cursor-pointer pr-5`}
            >
              Shop Products
            </h5>
          </div>

          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-medium text-[15px] sm:text-[20px] ${active === 2 ? "text-red-500" : "text-[#333]"} cursor-pointer pr-5`}
            >
              Running Events
            </h5>
          </div>

          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-medium text-[15px] sm:text-[20px] ${active === 3 ? "text-red-500" : "text-[#333]"} cursor-pointer pr-5`}
            >
              Shop Reviews
            </h5>
          </div>
        </div>

        <div>
          {isOwner && (
            <Link to="/dashboard">
              <div className={`${styles.button} rounded-sm h-11`}>
                <span className="text-white md:whitespace-nowrap p-3">
                  Go Dashboard
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>

      {active === 1 && products && products?.length !== 0 && (
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl-grid-cols-4 xl:gap-5 mb-12 border-0">
          {products &&
            products.map((data, index) => (
              <ProductCard data={data} key={index} isShop={true} />
            ))}
        </div>
      )}

      {active === 2 && events && events?.length !== 0 && (
        <div className="mt-5 grid grid-cols-1 border-0">
          {events &&
            events.map((data, index) => (
              <EventCard data={data} key={index} isShop={true} />
            ))}
        </div>
      )}

      {active === 3 &&
        products &&
        products
          .flatMap((product) => product.reviews || [])
          .map((item, index) => (
            <div className="w-full flex mt-6" key={index}>
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={`${item?.user?.avatar?.url}`}
                alt="userAvatar"
              />
              <div className="pl-2">
                <h1 className="font-medium">{item?.user?.name}</h1>
                <Ratings rating={item?.ratings} />
                <h3 className="font-400">{item?.comment}</h3>
                <h3 className="font-400">{item?.createdAt.slice(0, 10) || "2 days ago"}</h3>
              </div>
            </div>
          ))}

      {products && products.length === 0 && (
        <div className="text-center mt-10 text-2xl text-red-900">
          No Products for this Shop!!
        </div>
      )}
    </div>
  );
}

export default ShopProfileData;
