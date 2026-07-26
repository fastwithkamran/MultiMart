import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import { useState } from "react";
import { HiPlus, HiOutlineMinus } from "react-icons/hi";
import { Link } from "react-router-dom";

const Cart = ({ setOpenCart }) => {
  const cartData = [
    {
      name: "Iphone 14 pro max256 gb ssd 8gb ram silver color",
      description: "test",
      price: 999,
    },
    {
      name: "Iphone 14 pro max256 gb ssd 8gb ram silver color",
      description: "test",
      price: 888,
    },
    {
      name: "Iphone 14 pro max256 gb ssd 8gb ram silver color",
      description: "test",
      price: 777,
    },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-black/30 h-screen z-10 flex justify-end">
        <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
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
              <h5 className="pl-2 text-[20px] font-medium">3 items</h5>
            </div>

            {/* Cart Item */}
            <div className="w-full border-t overflow-y-auto flex-1 max-h-[calc(100vh-200px)]">
              {cartData &&
                cartData.map((items, index) => (
                  <CartSingle data={items} key={index} />
                ))}
            </div>
          </div>
          <div className="px-5 mb-3">
            {/* checkout button */}
            <Link>
              <div className="h-9 flex items-center justify-center w-full bg-red-500 rounded-[5px] mt-3">
                <h1 className="text-white font-medium text-sm text-center">
                  Checkout Now (USD$1080)
                </h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;
  return (
    <>
      <div className="border-b p-4">
        <div className="w-full flex items-center">
          <div>
            <div
              className={`${styles.normalFlex} justify-center bg-orange-600 border border-[#e4434373] rounded-full w-6 h-6`}
              onClick={() => setValue(value + 1)}
            >
              <HiPlus size={18} className="text-white" />
            </div>
            <span className="pl-2.5">{value}</span>
            <div
              className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
              onClick={() => setValue(value === 1 ? 1 : value - 1)}
            >
              <HiOutlineMinus size={18} className="text-gray-600" />
            </div>
          </div>

          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0kASfr04za26DKrgn7bZ2aIRB1Kflvcp60Aqeo50doA&s"
            alt="itemsImage"
            className="w-20 h-20 object-cover ml-2"
          />

          <div className="pl-2">
            <h1>{data.name}</h1>
            <h4 className="font-medium text-[15px] text-gray-600">
              ${data.price} * {value}
            </h4>
            <h4 className="font-medium text-[17px] pt-1.5 text-red-500 font-Roboto">
              US${totalPrice}
            </h4>
          </div>
          <RxCross1 className="cursor-pointer" />
        </div>
      </div>
    </>
  );
};

export default Cart;
