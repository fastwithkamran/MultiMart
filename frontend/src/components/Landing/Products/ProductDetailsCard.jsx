import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import {
  AiOutlineMessage,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import axios from "axios";
import { server } from "../../../../server";

const ProductDetailsCard = ({ data, setOpen }) => {
  const [count, setCount] = useState(1);

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const click = Boolean(wishlist && wishlist.find((i) => i._id === data._id));

  const addToCardHandler = (id) => {
    const isItemExist = cart && cart.find((i) => i._id === id);
    if (isItemExist) toast.error("Item already in cart!");
    else {
      if (data.stock < count) toast.error("Product stock limited!");
      else {
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    dispatch(addToWishlist(data));
    toast.success("Added to wishlist");
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    if (isAuthenticated) {
      const conversationTitle = user._id + data.shop._id;
      const userId = user._id;
      const sellerId = data.shop._id;

      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          conversationTitle,
          userId,
          sellerId,
        })
        .then(() => {
          navigate(`/inbox`);
        })
        .catch((error) => toast.error(error.response?.data?.message || error.message));
    } else {
      toast.error("Please login to start a conversation!");
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.ratings, 0),
      0,
    );

  const avgRatings = totalRatings / totalReviewsLength || 0;

  return (
    <div className="bg-white">
      {data && (
        <div className="fixed w-full h-screen top-0 left-0 z-40 flex items-center justify-center">
          <div className="w-[90%] sm:w-[60%] h-[90vh] md:h-[75vh] overflow-y-scroll bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />

            <div className="block w-full md:flex">
              <div className="w-full md:w-[50%]">
                <img
                  src={data.images[0].url}
                  alt="productImage"
                  className="w-50 h-50 mx-auto mb-5 object-contain"
                />
                <div className="flex">
                  <Link to={`/shop/preview/${data.shop._id}`}>
                    <img
                      src={data.shop.avatar.url}
                      alt="shopAvator"
                      className="w-12 h-12 rounded-full mr-2 object-contain"
                    />
                    <div>
                      <h3 className={`${styles.shop_name}`}>
                        {data.shop.name}
                      </h3>
                      <h5 className="pb-3 text-[15px]">
                        ({avgRatings}/5) Ratings
                      </h5>
                    </div>
                  </Link>
                </div>
                <div
                  className={`${styles.button} bg-black mt-2 rounded-sm! h-11 w-fit p-4`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-white flex items-center">
                    Send Message
                    <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
                <h5 className="text-red-500 text-sm mt-2">
                  ({data.sold_out}) Sold
                </h5>
              </div>

              <div className="w-full md:w-[50%] pt-5 pl-1.5 pr-1.5">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.name}
                </h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + "$" : null}
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-linear-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={() => (count === 1 ? 1 : setCount(count - 1))}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-2.5">
                      {count}
                    </span>
                    <button
                      className="bg-linear-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={() => setCount(count + 1)}
                    >
                      +
                    </button>
                  </div>
                  {click ? (
                    <AiFillHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={() => removeFromWishlistHandler(data)}
                      color={click ? "red" : "#333"}
                      title="Remove from wishlist"
                    />
                  ) : (
                    <AiOutlineHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={() => addToWishlistHandler(data)}
                      color={click ? "red" : "#333"}
                      title="Add to wishlist"
                    />
                  )}
                </div>
                <div
                  className={`${styles.button} mt-6 rounded-sm! h-11 flex items-center`}
                  onClick={() => addToCardHandler(data._id)}
                >
                  <span className="text-white flex h-11 items-center">
                    Add to Cart
                    <AiOutlineShoppingCart
                      size={22}
                      className="cursor-pointer ml-2"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsCard;
