import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import ProductDetailsCard from "./ProductDetailsCard";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineEye,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cart";
import Ratings from "./Ratings";

const ProductCard = ({ data }) => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const addToCardHandler = (id) => {
    const isItemExist = cart && cart.find((i) => i._id === id);
    if (isItemExist) toast.error("Item already in cart!");
    else {
      const cartData = { ...data, qty: 1 };
      dispatch(addToCart(cartData));
      toast.success("Item added to cart successfully!");
    }
  };

  const click = Boolean(wishlist && wishlist.find((i) => i._id === data._id));

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    dispatch(addToWishlist(data));
    toast.success("Added to wishlist");
  };

  return (
    <div className="w-full h-96 rounded-lg bg-white shadow-sm p-3 relative cursor-pointer">
      <div className="flex justify-end"></div>
      <Link to={`/product/${data._id}`}>
        <img
          src={data?.images[0]}
          alt="productImage"
          className="w-[80%] mx-auto h-44 object-contain"
        />
      </Link>
      {/* shop name and title */}
      <Link
        to={`/shop/preview/${data?.shop?._id} text-ellipsis whitespace-nowrap overflow-hidden`}
      >
        <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
      </Link>
      <Link to={`/product/${data._id}`}>
        <h4 className="pb-3 font-medium text-ellipsis whitespace-nowrap overflow-hidden">
          {data.name.length > 40 ? data.name.slice(0, 40) : data.name}
        </h4>

        {/* stars rating */}
        <div className="flex">
          <Ratings rating={data.reviews[0]?.ratings} />
        </div>

        {/* price */}
        <div className="py-2 flex items-center justify-between">
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice}`}>
              {data.discountPrice === 0
                ? data.originalPrice
                : data.discountPrice}
              $
            </h5>
            <h4 className={`${styles.price}`}>
              {data.originalPrice ? data.originalPrice + "$" : null}
            </h4>
          </div>

          {/* total sells */}
          <span className="font-[400px] text-[17px] text-green-400">
            {data.sold_out} sold
          </span>
        </div>
      </Link>

      {/* side icons */}
      {click ? (
        <AiFillHeart
          size={22}
          className="cursor-pointer absolute right-2 top-5"
          onClick={() => removeFromWishlistHandler(data)}
          color={click ? "red" : "#333"}
          title="Remove from wishlist"
        />
      ) : (
        <AiOutlineHeart
          size={22}
          className="cursor-pointer absolute right-2 top-5"
          onClick={() => addToWishlistHandler(data)}
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
        onClick={() => addToCardHandler(data._id)}
        color={"#444"}
        title="Add to cart"
      />

      {open && <ProductDetailsCard data={data} setOpen={setOpen} />}
    </div>
  );
};

export default ProductCard;
