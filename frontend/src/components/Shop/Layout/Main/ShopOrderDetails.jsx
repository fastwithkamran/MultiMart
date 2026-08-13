import { BsFillBagFill } from "react-icons/bs";
import styles from "../../../../styles/styles";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllShopOrders } from "../../../../redux/actions/order";
import Loader from "../../../Layout/Loader/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../../../../server";
import {
  getAllProducts,
  getAllProductsShop,
} from "../../../../redux/actions/product";

const ShopOrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [status, setStatus] = useState("");

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllShopOrders(seller._id));
  }, [dispatch, seller._id]);

  const data = orders && orders.find((item) => item._id === id);

  const orderUpdateHandler = async (e) => {
    e.preventDefault();

    if (status === "" || status === "Processing")
      toast.error("Update the order status");

    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        { status },
        { withCredentials: true },
      )
      .then(() => {
        toast.success("Order Status Updated");
        dispatch(getAllProducts());
        dispatch(getAllProductsShop());
        navigate("/dashboard-orders");
      })
      .catch((error) =>
        toast.error(error.response?.data?.message || error.message),
      );
  };

  const refundOrderUpdateHandler = async (e) => {
    e.preventDefault();

    if (status === "" || status === "Processing refund")
      toast.error("Update the order status");

    await axios
      .put(
        `${server}/order/order-refund-proceedings/${id}`,
        { status },
        { withCredentials: true },
      )
      .then(() => {
        toast.success("Refund Request Status Updated");
        navigate("/dashboard-orders");
        dispatch(getAllProducts());
        dispatch(getAllProductsShop());
      })
      .catch((error) =>
        toast.error(error.response?.data?.message || error.message),
      );
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
            <Link to={"/dashboard-orders"}>
              <div
                className={`${styles.button} p-4 bg-[#fce1e6]! rounded-sm! text-[#e94560] font-semibold h-8 text-[18px]`}
              >
                Order List
              </div>
            </Link>
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
                  src={`${item?.images[0].url}`}
                  alt="productImage"
                  className="object-cover w-50 h-50"
                />
                <div className="w-full">
                  <h5 className="pl-3 text-[20px]">{item?.name}</h5>
                  <h5 className="pl-3 text-[20px] text-slate-500">
                    US${item?.discountPrice} x {item?.qty}
                  </h5>
                </div>
              </div>
            ))}

          <div className="border-t w-full text-right">
            <h5 className="pt-3 text-[18px]">
              Total Price <strong>US${data?.totalPrice}</strong>
            </h5>
          </div>

          <div className="mt-4 w-full md:flex items-center">
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
                Payment Method: {data?.paymentInfo.type}
                <span>
                  {data?.paymentInfo?.status
                    ? " | " + data?.paymentInfo?.status
                    : null}
                </span>
              </h4>
            </div>
          </div>
          <h4 className="mt-4 pt-3 mb-2 text-[20px] font-semibold">
            Order Status:
          </h4>
          {data?.status !== "Processing refund" &&
          data?.status !== "Refund approve" &&
          data?.status !== "Refund reject" ? (
            <select
              className="w-48 border h-8 rounded-sm!"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              {[
                "Processing",
                "Transferred to delivery partner",
                "Shipping",
                "Received",
                "On the way",
                "Delivered",
              ]
                .slice(
                  [
                    "Processing",
                    "Transferred to delivery partner",
                    "Shipping",
                    "Received",
                    "On the way",
                    "Delivered",
                  ].indexOf(data?.status),
                )
                .map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          ) : (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-48 border h-8 rounded-sm!"
            >
              {data?.status === "Processing refund" ? (
                <>
                  <option value="Processing refund">Choose an action.. </option>
                  <option value="Refund approve">Refund approve</option>
                  <option value="Refund reject">Refund reject</option>
                </>
              ) : (
                <option value={data?.status}>{data?.status}</option>
              )}
            </select>
          )}

          <div
            className={`${styles.button} w-48 text-center p-4 bg-[#fce1e6]! rounded-sm! text-[#e94560] font-semibold h-8 text-[18px]`}
            onClick={
              data?.status !== "Processing refund"
                ? orderUpdateHandler
                : refundOrderUpdateHandler
            }
          >
            Update Status
          </div>
        </div>
      )}
    </>
  );
};

export default ShopOrderDetails;
