import styles from "../../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { addToCart } from "../../../redux/actions/cart";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

function EventCard({ active, data }) {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (id) => {
    const isItemExist = cart && cart.find((i) => i._id === id);
    if (isItemExist) toast.error("Item already in cart!");
    else {
      const cartData = { ...data, qty: 1 };
      dispatch(addToCart(cartData));
      toast.success("Item added to cart successfully!");
    }
  };

  return (
    <>
      {data ? (
        <div
          className={`w-full grid grid-cols-1 gap-5 md:grid-cols-2 bg-white rounded-lg p-2 ${active ? "unset" : "mb-12"} `}
        >
          <div className="flex justify-center items-center">
            <img
              src={data?.images[0].url}
              alt="productImage"
              className="w-100 h-100 object-contain"
            />
          </div>

          <div className="w-full flex flex-col justify-center">
            <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
            <p className="whitespace-pre-line">{data?.description}</p>
            <div className="flex py-2 justify-between">
              <div className="flex">
                <h5 className="font-medium text-[18px] text-orange-600 pr-3 line-through">
                  {data?.originalPrice}$
                </h5>
                <h5 className="font-bold text-[20px] text-slate-600 font-Roboto">
                  {data?.discountPrice}$
                </h5>
              </div>
              <span className="pr-3 font-medium text-[17px] text-green-300">
                {data?.sold_out}
              </span>
            </div>
            <CountDown data={data} />
            <div className="flex items-center">
              <Link to={`/product/${data._id}?isEvent=true`}>
                <div className={`${styles.button} p-3 text-white rounded-sm!`}>
                  See Details
                </div>
              </Link>
              <div
                onClick={() => addToCartHandler(data)}
                className={`${styles.button} ml-5 p-3 rounded-sm! text-white`}
              >
                Add To Cart
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-10">
          <div className="text-center text-4xl text-red-500">
            No Ongoing Events
          </div>
        </div>
      )}
    </>
  );
}

export default EventCard;
