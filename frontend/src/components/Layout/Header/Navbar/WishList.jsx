import { RxCross1 } from "react-icons/rx";
import styles from "../../../../styles/styles";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addToCart } from "../../../../redux/actions/cart";

const WishList = ({ setOpenWishList }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCardHandler = (data) => {
    const isItemExist = cart && cart.find((i) => i._id === data._id);
    if (isItemExist) toast.error("Item already in cart!");
    else {
      const cartData = { ...data, qty: 1 };
      dispatch(addToCart(cartData));
      setOpenWishList(false);
      toast.success("Item added to cart successfully!");
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-black/30 h-screen z-10 flex justify-end">
        <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
          {wishlist && wishlist.length === 0 ? (
            <div className="w-full h-screen flex items-center justify-center">
              <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishList(false)}
                />
              </div>
              <h5>Wishlist Items is empty</h5>
            </div>
          ) : (
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
                <h5 className="pl-2 text-[20px] font-medium">
                  {wishlist && wishlist.length} Items
                </h5>
              </div>

              {/* WIshlist item Item */}
              <div className="w-full border-t overflow-y-auto flex-1 max-h-[calc(100vh-200px)]">
                {wishlist &&
                  wishlist.map((items, index) => (
                    <WishlistSingle
                      data={items}
                      key={index}
                      removeFromWishlistHandler={removeFromWishlistHandler}
                      addToCardHandler={addToCardHandler}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const WishlistSingle = ({
  data,
  removeFromWishlistHandler,
  addToCardHandler,
}) => {
  return (
    <>
      <div className="border-b p-4">
        <div className="w-full flex items-center">
          <RxCross1
            size={20}
            className="cursor-pointer"
            onClick={() => removeFromWishlistHandler(data)}
          />
          <img
            src={data?.images[0]}
            alt="itemsImage"
            className="w-20 h-20 object-cover ml-4"
          />

          <div className="pl-2">
            <h1>{data.name}</h1>
            <h4 className="font-medium text-[17px] pt-1.5 text-red-500 font-Roboto">
              US${data.discountPrice}
            </h4>
          </div>

          <BsCartPlus
            size={20}
            className="cursor-pointer ml-auto"
            title="Add to Cart"
            onClick={() => addToCardHandler(data)}
          />
        </div>
      </div>
    </>
  );
};

export default WishList;
