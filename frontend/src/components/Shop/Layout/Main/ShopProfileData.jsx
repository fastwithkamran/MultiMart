import { useState } from "react";
import { productData } from "../../../../static/data";
import ProductCard from "../../../Landing/Products/ProductCard";
import { Link } from "react-router-dom";
import styles from "../../../../styles/styles";

function ShopProfileData({ isOwner }) {
  const [active, setActive] = useState(1);
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
            <Link to={"/dashboard"}>
              <div className={`${styles.button} rounded-sm h-11`}>
                <span className="text-white md:whitespace-nowrap p-3">Go Dashboard</span>
              </div>
            </Link>
          )}
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl-grid-cols-4 xl:gap-5 mb-12 border-0">
        {productData &&
          productData.map((data, index) => (
            <ProductCard data={data} key={index} isShop={true} />
          ))}
      </div>
    </div>
  );
}

export default ShopProfileData;
