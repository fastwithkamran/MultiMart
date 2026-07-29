import { RxCross1 } from "react-icons/rx";
import styles from "../../../../styles/styles";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";

const WishList = ({ setOpenWishList }) => {
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
                onClick={() => setOpenWishList(false)}
              />
            </div>

            {/* Items length */}
            <div className={`${styles.normalFlex} p-4`}>
              <AiOutlineHeart size={25} />
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
        </div>
      </div>
    </>
  );
};

const CartSingle = ({ data }) => {
  return (
    <>
      <div className="border-b p-4">
        <div className="w-full flex items-center">
          <RxCross1 size={20} className="cursor-pointer" />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0kASfr04za26DKrgn7bZ2aIRB1Kflvcp60Aqeo50doA&s"
            alt="itemsImage"
            className="w-20 h-20 object-cover ml-2"
          />

          <div className="pl-2">
            <h1>{data.name}</h1>
            <h4 className="font-medium text-[17px] pt-1.5 text-red-500 font-Roboto">
              US${data.price}
            </h4>
          </div>

          <BsCartPlus
            size={20}
            className="cursor-pointer"
            title="Add to Cart"
          />
        </div>
      </div>
    </>
  );
};

export default WishList;
