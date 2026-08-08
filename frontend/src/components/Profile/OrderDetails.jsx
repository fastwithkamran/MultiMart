import { BsFillBagFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from "../Layout/Loader/Loader";
import { getAllUserOrders } from "../../redux/actions/order";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";

const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllUserOrders(user._id));
  }, [dispatch, user._id]);

  const data = orders && orders.find((item) => item._id === id);

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

          <div className="w-full flex items=center justify-between pt-6">
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
              <div key={index} className="w-full flex items-start mb-5 mt-4">
                <img
                  src={`${item?.images[0]}`}
                  alt="productImage"
                  className="object-cover w-50 h-50"
                />
                <div className="w-full">
                  <h5 className="pl-3 text-[20px]">{item?.name}</h5>
                  <h5 className="pl-3 text-[20px] text-slate-500">
                    US${item?.discountPrice} x {item?.qty}
                  </h5>
                </div>
                {data?.status === "Delivered" && (
                  <div className={`${styles.button} text-white`}>
                    Write a Review
                  </div>
                )}
              </div>
            ))}

          <div className="border-t w-full text-right">
            <h5 className="pt-3 text-[18px]">
              Total Price <strong>US${data?.totalPrice}</strong>
            </h5>
          </div>

          <div className="mt-4 w-full grid gap-5 whitespace-nowrap grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center">
            <div className="w-full md:[60%]">
              <h4 className="pt-3 text-[20px] font-semibold">
                Shipping Address
              </h4>
              <h4 className="pt-3 text-[20px]">
                Country: {data?.shippingAddress.country}
              </h4>
              <h4 className="pt-3 text-[20px]">
                State: {data?.shippingAddress.state}
              </h4>
              <h4 className="pt-3 text-[20px]">
                Street: {data?.shippingAddress.address},{" "}
                {data?.shippingAddress.city}
              </h4>
              <h4 className="pt-3 text-[20px]">
                ZipCode: {data?.shippingAddress.zipCode}
              </h4>
            </div>
            <div className="w-full md:[60%]">
              <h4 className="pt-3 text-[20px] font-semibold">
                Customer Information
              </h4>
              <h4 className="pt-3 text-[20px]">Name: {data?.user.name}</h4>
              <h4 className="pt-3 text-[20px]">Email: {data?.user.email}</h4>
              <h4 className="pt-3 text-[20px]">
                Phone Number: {data?.user.phoneNumber}
              </h4>
              <h4 className="pt-3 text-[20px]">
                Payment Method: {data?.paymentInfo.type}{" "}
                <span>
                  {data?.paymentInfo?.status
                    ? "|" + data?.paymentInfo?.status
                    : null}
                </span>
              </h4>
            </div>

            {data &&
              data?.cart.map((item, index) => (
                <div
                  key={index}
                  className="w-full flex flex-col items-start mb-5 mt-4"
                >
                  <h4 className="pt-3 text-[20px] font-semibold">
                    Shop Information
                  </h4>
                  <img
                    src={`${item?.shop.avatar.url}`}
                    alt="productImage"
                    className="object-cover rounded-full w-12 h-12"
                  />
                  <div className="w-full md:[60%]">
                    <h4 className="pt-3 text-[20px]">
                      Shop Name: {item?.shop?.name}
                    </h4>
                    <h4 className="pt-3 text-[20px]">
                      Shop Email: {item?.shop?.email}
                    </h4>
                    <h4 className="pt-3 text-[20px]">
                      Shop Phone Number: {item?.shop?.phoneNumber}
                    </h4>
                    <Link to="/">
                      <div
                        className={`${styles.button} rounded-sm! text-white`}
                      >
                        Send Message
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
