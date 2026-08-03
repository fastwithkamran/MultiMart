import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import ProductDetailsCard from "./ProductDetailsCard";

import {
  AiFillHeart,
  AiFillStar,
  AiOutlineStar,
  AiOutlineHeart,
  AiOutlineEye,
  AiOutlineShoppingCart,
} from "react-icons/ai";

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const product_name = data.name.replace(/\s+/g, "-");

  return (
    <div className="w-full h-96 rounded-lg bg-white shadow-sm p-3 relative cursor-pointer">
      <div className="flex justify-end"></div>
      <Link to={`/product/${product_name}`}>
        <img
          src={data?.images[0]}
          alt="productImage"
          className="w-[80%] mx-auto h-44 object-contain"
        />
      </Link>
      {/* shop name and title */}
      <Link to={"/"}>
        <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
      </Link>
      <Link to={`/product/${product_name}`}>
        <h4 className="pb-3 font-medium">
          {data.name.length > 40 ? data.name.slice(0, 40) : data.name}
        </h4>

        {/* stars rating */}
        <div className="flex text-yellow-400">
          <AiFillStar className="mr-2 cursor-pointer" size={20} />
          <AiFillStar className="mr-2 cursor-pointer" size={20} />
          <AiFillStar className="mr-2 cursor-pointer" size={20} />
          <AiFillStar className="mr-2 cursor-pointer" size={20} />
          <AiOutlineStar className="mr-2 cursor-pointer" size={20} />
        </div>

        {/* price */}
        <div className="py-2 flex items-center justify-between">
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice}`}>
              {data.discountPrice === 0 ? data.originalPrice : data.discountPrice}$
            </h5>
            <h4 className={`${styles.price}`}>
              {data.originalPrice ? data.originalPrice + "$" : null}
            </h4>
          </div>

          {/* total sells */}
          <span className="font-[400px] text-[17px] text-green-400">
            {data.stock} sold
          </span>
        </div>
      </Link>

      {/* side icons */}
      {click ? (
        <AiFillHeart
          size={22}
          className="cursor-pointer absolute right-2 top-5"
          onClick={() => setClick(!click)}
          color={click ? "red" : "#333"}
          title="Remove from wishlist"
        />
      ) : (
        <AiOutlineHeart
          size={22}
          className="cursor-pointer absolute right-2 top-5"
          onClick={() => setClick(!click)}
          color={click ? "red" : "#333"}
          title="Add to wishlist"
        />
      )}

      <AiOutlineEye
        size={22}
        className="cursor-pointer absolute right-2 top-13"
        onClick={() => setOpen(!open)}
        color={"#333"}
        title="Quick view"
      />

      <AiOutlineShoppingCart
        size={22}
        className="cursor-pointer absolute right-2 top-22"
        onClick={() => setOpen(!open)}
        color={"#444"}
        title="Add to cart"
      />

      {open && <ProductDetailsCard data={data} setOpen={setOpen} />}
    </div>
  );
};

export default ProductCard;
