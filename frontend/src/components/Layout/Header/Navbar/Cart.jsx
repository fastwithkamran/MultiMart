import { RxCross1 } from "react-icons/rx";
import styles from "../../../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import { useState } from "react";
import { HiPlus, HiOutlineMinus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../../../redux/actions/cart";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0,
  );

  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-black/30 h-screen z-10 flex justify-end">
        <div className="fixed top-0 right-0 min-h-full w-[75%] sm:w-[50%] md:w-[35%] xl:w-[25%] bg-white flex flex-col justify-between shadow-sm">
          {cart && cart.length === 0 ? (
            <div className="w-full h-screen flex items-center justify-center">
              <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              <h5>Cart Items is empty</h5>
            </div>
          ) : (
            <>
              <div>
                <div className="flex w-full justify-end pt-5 pr-5">
                  <RxCross1
                    size={25}
                    className="cursor-pointer"
                    onClick={() => setOpenCart(false)}
                  />
                </div>

                {/* Items length */}
                <div className={`${styles.normalFlex} p-4`}>
                  <IoBagHandleOutline size={25} />
                  <h5 className="pl-2 text-[20px] font-medium">
                    {cart && cart.length} items
                  </h5>
                </div>

                {/* Cart Item */}
                <div className="w-full border-t overflow-y-auto flex-1 max-h-[calc(100vh-200px)]">
                  {cart &&
                    cart.map((items, index) => (
                      <CartSingle
                        data={items}
                        key={index}
                        quantityChangeHandler={quantityChangeHandler}
                        removeFromCartHandler={removeFromCartHandler}
                      />
                    ))}
                </div>
              </div>
              <div className="px-5 mb-3">
                {/* checkout button */}
                <Link to={"/checkout"}>
                  <div className="h-9 flex items-center justify-center w-full bg-red-500 rounded-[5px] mt-3">
                    <h1 className="text-white font-medium text-sm text-center">
                      Checkout Now (USD${totalPrice})
                    </h1>
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) toast.error("Product stock limited!");
    else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    if (value !== 1) {
      const updateCartData = { ...data, qty: value - 1 };
      quantityChangeHandler(updateCartData);
    }
  };
  return (
    <>
      <div className="border-b p-4">
        <div className="w-full flex items-center">
          <div>
            <div
              className={`${styles.normalFlex} justify-center bg-orange-600 border border-[#e4434373] rounded-full w-6 h-6`}
              onClick={() => increment(data)}
            >
              <HiPlus size={18} className="text-white" />
            </div>
            <span className="pl-2.5">{data.qty}</span>
            <div
              className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
              onClick={() => decrement(data)}
            >
              <HiOutlineMinus size={18} className="text-gray-600" />
            </div>
          </div>

          <img
            src={data?.images[0].url}
            alt="itemsImage"
            className="w-20 h-min object-cover ml-2 mr-4 rounded-sm"
          />

          <div className="pl-2">
            <h1>{data.name}</h1>
            <h4 className="font-medium text-[15px] text-gray-600">
              ${data.discountPrice} * {value}
            </h4>
            <h4 className="font-medium text-[17px] pt-1.5 text-red-500 font-Roboto">
              US${totalPrice}
            </h4>
          </div>
          <div className="ml-auto" onClick={() => removeFromCartHandler(data)}>
            <RxCross1 className="cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
