import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

function Payment() {
  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] lg:w-[70%] block md:flex">
        <div className="w-full md:w-[65%]">
          <PaymentInfo />
        </div>
        <div className="w-full md:w-[35%] md:mt-0 mt-8">
          <CartData />
        </div>
      </div>
    </div>
  );
}

const PaymentInfo = () => {
  const [select, setSelect] = useState(1);
  const navigate = useNavigate();

  const paymentHandler = (e) => {
    e.preventDefault();
    navigate("order/success/34583457");
  };
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
                  <label className="block pb-2">Card Number</label>
                  <input required className={`${styles.input} w-[95%]!`} />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Exp Date</label>
                  <input type="number" className={`${styles.input}`} required />
                </div>
              </div>

              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Name on Card</label>
                  <input required className={`${styles.input} w-[95%]!`} />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Billing Address</label>
                  <input type="text" required className={`${styles.input}`} />
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

const CartData = () => {
  return (
    <div className="w-full bg-white rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-medium text-black">Subtotal:</h3>
        <h5 className="text-[18px] font-medium">$2323.00</h5>
      </div>
      <div className="flex justify-between border-b pb-3 mt-2">
        <h3 className="text-[16px] font-medium text-black">Discount:</h3>
        <h5 className="text-[18px] font-medium">-</h5>
      </div>
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
