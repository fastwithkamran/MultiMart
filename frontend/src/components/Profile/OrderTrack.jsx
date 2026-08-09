import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllUserOrders } from "../../redux/actions/order";
import Loader from "../Layout/Loader/Loader";

const OrderTrack = () => {
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
        <div className="w-full h-[80vh] flex items-center justify-center">
          {data && data?.status === "Processing" && (
            <h1 className="text-center text-20[px]">
              Your Order Details are Processing!!
            </h1>
          )}
          
          {data && data?.status === "Transferred to delivery partner" && (
            <h1 className="text-center text-20[px]">
              Your Order is Dispatch!!
            </h1>
          )}
         
          {data && data?.status === "Shipping" && (
            <h1 className="text-center text-20[px]">
              Your Order is On The Way!!
            </h1>
          )}
          
          {data && data?.status === "Received" && (
            <h1 className="text-center text-20[px]">
              Your Order Reached Your City!!
            </h1>
          )}
          
          {data && data?.status === "Delivered" && (
            <h1 className="text-center text-20[px]">
              Your Order is At Your Home!!
            </h1>
          )}
      
          {data && data?.status === "Processing refund" && (
            <h1 className="text-center text-20[px]">
              Your Order Details are Processing for Refund!!
            </h1>
          )}
    
          {data && data?.status === "Refund approve" && (
            <h1 className="text-center text-20[px]">
              Order has been Refunded!!
            </h1>
          )}
          
          {data && data?.status === "Refund reject" && (
            <h1 className="text-center text-20[px]">
              Order Refund Request has Rejected!!
            </h1>
          )}
        </div>
      )}
    </>
  );
};

export default OrderTrack;
