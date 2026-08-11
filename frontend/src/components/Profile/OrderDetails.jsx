import { BsFillBagFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../Layout/Loader/Loader";
import { getAllUserOrders } from "../../redux/actions/order";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { server } from "../../../server";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [ratings, setRating] = useState(3);
  const [comment, setComment] = useState("");

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllUserOrders(user._id));
  }, [dispatch, user._id]);

  const data = orders && orders.find((item) => item._id === id);

  const reviewHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/product/product-review`,
        { user, ratings, comment, productId: selectedItem?._id, orderId: id },
        {
          withCredentials: true,
        },
      )
      .then(() => {
        toast.success("Thanks for the review!");
        setRating(3);
        setComment("");
        setOpen(false);
        dispatch(getAllUserOrders(user._id));
      })
      .catch((error) => toast.error(error.message));
  };

  const refundHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(`${server}/order/order-refund/${id}`, {
        status: "Processing refund",
      })
      .then(() => {
        toast.success("Refund Request is in Process");
        dispatch(getAllUserOrders(user._id));
      })
      .catch((error) => toast.error(error.message));
  };

  const handleMessageSubmit = async (e, item) => {
    e.preventDefault();

    if (isAuthenticated) {
      console.log(item)
      const conversationTitle = user._id + item.shopId;
      const userId = user._id;
      const sellerId = item.shopId;

      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          conversationTitle,
          userId,
          sellerId,
        })
        .then(() => {
          navigate(`/inbox`);
        })
        .catch((error) => toast.error(error.response.data.message));
    } else {
      toast.error("Please login to start a conversation!");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="py-4 p-3 min-h-screen w-full">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center">
              <BsFillBagFill size={30} color="crimson" />
              <h1 className="pl-2 text-[25px]">Order Details</h1>
            </div>
          </div>

          <div className="w-full flex items-center justify-between pt-6">
            <h5 className="text-slate-500">
              Order ID: <span>#{data?._id?.slice(0, 8)}</span>
            </h5>
            <h5 className="text-slate-500">
              Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
            </h5>
          </div>

          {/* order Items */}
          {data &&
            data?.cart.map((item, index) => (
              <div
                key={index}
                className="w-full flex flex-col md:flex-row justify-between mb-5 mt-4"
              >
                <div className="flex flex-col md:flex-row">
                  <img
                    src={`${item?.images[0]}`}
                    alt="productImage"
                    className="object-cover w-32 h-32"
                  />
                  <div className="flex flex-col">
                    <h5 className="md:pl-3 text-[20px]">{item?.name}</h5>
                    <h5 className="md:pl-3 text-[20px] text-slate-500">
                      US${item?.discountPrice} x {item?.qty}
                    </h5>

                    {!item?.isReviewed && (
                      <div
                        className={`${styles.button} w-50 md:ml-2 rounded-sm! whitespace-nowrap text-white`}
                        onClick={() => setOpen(true) || setSelectedItem(item)}
                      >
                        Write a Review
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="w-full flex flex-col items-start mb-5">
                    <h4 className="pt-3 text-[15px] font-medium">
                      Shop Information
                    </h4>
                    <div className="w-full md:[60%]">
                      <h4 className="pt-3 text-[15px]">
                        Shop Name: {item?.shop?.name}
                      </h4>
                      <h4 className="pt-3 text-[15px]">
                        Shop Email: {item?.shop?.email}
                      </h4>
                      <h4 className="pt-3 text-[15px]">
                        Shop Phone Number: {item?.shop?.phoneNumber}
                      </h4>
                    </div>
                    <div className="flex gap-4">
                      <div
                        className={`${styles.button} whitespace-nowrap text-white rounded-sm! w-36`}
                        onClick={(e) => handleMessageSubmit(e, item)}
                      >
                        Send Message
                      </div>
                      {data.status === "Delivered" && (
                        <div
                          className={`${styles.button} whitespace-nowrap text-white rounded-sm! w-36`}
                          onClick={refundHandler}
                        >
                          Ask a Refund
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {/* review popup */}
          {open && (
            <div className="w-full fixed top-0 left-0 h-screen flex justify-center items-center bg-black/60 z-50">
              <div className="w-[80%] md:w-[50%] h-min-content bg-white shadow rounded-md p-3">
                <div className="w-full flex justify-end p-3">
                  <RxCross1
                    size={30}
                    onClick={() => setOpen(false)}
                    className="cursor-pointer"
                  />
                </div>
                <h2 className="text-[30px] font-semibold font-Poppins text-center">
                  Give a Review
                </h2>
                <div className="mt-4 w-full flex flex-col md:flex-row gap-3">
                  <img
                    src={selectedItem?.images[0]}
                    alt="productImage"
                    className="w-32 h-32 object-cover"
                  />
                  <div>
                    <div className="md:pl-3 text-[30px]">
                      {selectedItem.name}
                    </div>
                    <div className="md:pl-3 text-[20px]">
                      US${selectedItem?.discountPrice} x {selectedItem?.qty}
                    </div>
                  </div>
                </div>

                <h5 className="md:pl-3 text-[20px] mt-4 font-semibold">
                  Give a Rating<span className="text-red-500">*</span>
                </h5>
                <div className="flex w-full md:ml-2 pt-1">
                  {[1, 2, 3, 4, 5].map((i) =>
                    ratings >= i ? (
                      <AiFillStar
                        key={i}
                        className="mr-1 cursor-pointer"
                        color="rgb(246,186,0)"
                        size={35}
                        onClick={() => setRating(i)}
                      />
                    ) : (
                      <AiOutlineStar
                        key={i}
                        className="mr-1 cursor-pointer"
                        color="rgb(246,186,0)"
                        size={35}
                        onClick={() => setRating(i)}
                      />
                    ),
                  )}
                </div>
                <div className="w-full ml-3 mt-4">
                  <label className="block text-[20px] font-medium">
                    Write a comment
                    <span className="font-400 text-[16px] text-slate-400 ml-1">
                      Optional
                    </span>
                  </label>
                  <textarea
                    name="comment"
                    placeholder="How was your product? write your experience"
                    className="mt-2 w-[95%] border p-2 outline-none"
                    rows={5}
                    cols={20}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <div
                    className={`${styles.button} w-[95%]! text-white text-[20px]`}
                    onClick={reviewHandler}
                  >
                    Submit
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="border-t w-full text-right">
            <h5 className="pt-3 text-[18px]">
              Total Price <strong>US${data?.totalPrice}</strong>
            </h5>
          </div>

          {/* Customer Information */}
          <div className="mt-4 w-full grid gap-5 grid-cols-1 md:grid-cols-2">
            <div className="w-full md:[60%]">
              <h4 className="pt-3 text-[20px] font-semibold">
                Shipping Address
              </h4>
              <h4 className="pt-3 text-[15px]">
                Country: {data?.shippingAddress.country}
              </h4>
              <h4 className="pt-3 text-[15px]">
                State: {data?.shippingAddress.state}
              </h4>
              <h4 className="pt-3 text-[15px]">
                Street: {data?.shippingAddress.address},{" "}
                {data?.shippingAddress.city}
              </h4>
              <h4 className="pt-3 text-[15px]">
                ZipCode: {data?.shippingAddress.zipCode}
              </h4>
            </div>
            <div className="w-full md:[60%]">
              <h4 className="pt-3 text-[20px] font-semibold">
                Customer Information
              </h4>
              <h4 className="pt-3 text-[15px]">Name: {data?.user.name}</h4>
              <h4 className="pt-3 text-[15px]">Email: {data?.user.email}</h4>
              <h4 className="pt-3 text-[15px]">
                Phone Number: {data?.user.phoneNumber}
              </h4>
              <h4 className="pt-3 text-[15px]">
                Payment Method: {data?.paymentInfo.type}{" "}
                <span>
                  {data?.paymentInfo?.status
                    ? "| " + data?.paymentInfo?.status
                    : null}
                </span>
              </h4>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
