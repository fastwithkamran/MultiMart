import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../../server";

function Payment() {
  const orderData = useState(JSON.parse(localStorage.getItem("latestOrder")));

  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [open, setOpen] = useState(false);

  // Paypal Payment Handlers
  const createOrder = (data, actions) => {};

  const onApprove = (data, actions) => {};

  const paypalPaymentHandler = async (paymentInfo) => {};

  // cash on delivery
  const cashOnDeliveryHandler = async () => {};

  const paymentData = {
    amount: Math.round(orderData[0]?.totalPrice * 100),
  };

  const order = {
    cart: orderData[0]?.cart,
    shippingAddress: orderData[0]?.shippingAddress,
    user: user && user,
    totalPrice: orderData[0]?.totalPrice,
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${server}/payment/process`,
        paymentData,
        config,
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) toast.error(result.error.message);
      else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          };
        }

        await axios
          .post(`${server}/order/create-order`, order, config)
          .then(() => {
            setOpen(false);
            navigate("/order/success");
            localStorage.setItem("cartItems", JSON.stringify([]));
            localStorage.setItem("latestOrder", JSON.stringify([]));
            toast.success("Order successful!");
          });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] lg:w-[70%] block md:flex">
        <div className="w-full md:w-[65%]">
          <PaymentInfo
            user={user}
            open={open}
            setOpen={setOpen}
            onApprove={onApprove}
            createOrder={createOrder}
            paymentHandler={paymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
          />
        </div>
        <div className="w-full md:w-[35%] md:mt-0 mt-8">
          <CartData orderData={orderData[0]} />
        </div>
      </div>
    </div>
  );
}

const PaymentInfo = ({
  user,
  open,
  setOpen,
  onApprove,
  createOrder,
  paymentHandler,
  cashOnDeliveryHandler,
}) => {
  const [select, setSelect] = useState(1);

  return (
    <div className="w-full md:w-[95%] bg-white rounded-md p-5 pb-8">
      {/* select buttons */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-6 h-6 rounded-full bg-transparent border-2 border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(1)}
          >
            {select === 1 && (
              <div className="w-3 h-3 bg-[#1d1a1acb] rounded-full"></div>
            )}
          </div>
          <h4 className="text-[18px] pl-2 font-medium text-black">
            Pay with Debit/Credit card
          </h4>
        </div>

        {/* Pay with card */}
        {select === 1 ? (
          <div className="w-full flex border-b">
            <form className="w-full" onSubmit={paymentHandler}>
              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Name on Card</label>
                  <input
                    required
                    placeholder={user && user.name}
                    value={user && user.name}
                    className={`${styles.input} w-[95%]!`}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Exp Date</label>
                  <CardExpiryElement
                    className={`${styles.input} h-8!`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Card Number</label>
                  <CardNumberElement
                    className={`${styles.input} h-8! w-[95%]!`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Billing Address</label>
                  <CardCvcElement
                    className={`${styles.input} h-8!`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <input
                type="submit"
                value={"Submit"}
                className={`${styles.button} bg-[#f63b60]! text-white h-8 rounded-sm cursor-pointer text-[18px] font-medium p-3`}
              />
            </form>
          </div>
        ) : null}
      </div>

      {/* pay with EasyPaisa */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2 mt-4">
          <div
            className="w-6 h-6 rounded-full bg-transparent border-2 border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(2)}
          >
            {select === 2 && (
              <div className="w-3 h-3 bg-[#1d1a1acb] rounded-full"></div>
            )}
          </div>
          <h4 className="text-[18px] pl-2 font-medium text-black">
            Pay with EasyPaisa
          </h4>
        </div>

        {select === 2 && (
          <div className="w-full flex border-b">
            <form className="w-full" onSubmit={paymentHandler}>
              <div className="w-full flex pb-3">
                <div className="w-full">
                  <label className="block pb-2">EasyPaisa Number</label>
                  <input type="number" required className={`${styles.input}`} />
                </div>
              </div>
              <input
                type="submit"
                value={"Submit"}
                className={`${styles.button} p-3 bg-[#f63b60]! text-white h-8 rounded-sm cursor-pointer text-[18px] font-medium`}
              />
            </form>
          </div>
        )}
      </div>

      {/* cash on delivery */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2 mt-4">
          <div
            className="w-6 h-6 rounded-full bg-transparent border-2 border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(3)}
          >
            {select === 3 && (
              <div className="w-3 h-3 bg-[#1d1a1acb] rounded-full"></div>
            )}
          </div>
          <h4 className="text-[18px] pl-2 font-medium text-black">
            Cash on Delivery
          </h4>
        </div>

        {select === 3 && (
          <div className="w-full flex">
            <form className="w-full" onSubmit={paymentHandler}>
              <input
                type="submit"
                value={"Confirm"}
                className={`${styles.button} p-3 bg-[#f63b60]! text-white h-8 rounded-sm cursor-pointer text-[18px] font-medium`}
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const CartData = ({ orderData }) => {
  return (
    <div className="w-full bg-white rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-medium text-black">Subtotal:</h3>
        <h5 className="text-[18px] font-medium">${orderData?.subTotalPrice}</h5>
      </div>
      <div className="flex justify-between">
        <h3 className="text-[16px] font-medium text-black">Shipping fees:</h3>
        <h5 className="text-[18px] font-medium">
          ${orderData?.shippingCharge}
        </h5>
      </div>
      <div className="flex justify-between border-b pb-3 mt-2">
        <h3 className="text-[16px] font-medium text-black">Discount:</h3>
        <h5 className="text-[18px] font-medium">
          ${orderData?.discountPrice ? orderData?.discountPrice : 0}
        </h5>
      </div>
      <h5 className="text-[18px] font-semibold text-end pt-3">
        ${orderData?.totalPrice}
      </h5>
      <form className="mt-2">
        <input
          type="text"
          className={`${styles.input} h-8 pl-2`}
          placeholder="Coupon code"
          required
        />
        <input
          type="submit"
          value={"Apply Code"}
          required
          className="w-full h-8 border border-[#f63b60] text-center text-[#f63b60] rounded-sm mt-8 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Payment;
