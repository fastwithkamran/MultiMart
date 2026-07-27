import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";

function ProductDetails({ data }) {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(1);
  const navigate = useNavigate();

  const handleMessageSubmit = () => {};
  return (
    <div className="bg-white">
      {data ? (
        <>
          <div className={`unset w-[90%] md:w-[80%]`}>
            {/* left col */}
            <div className="w-full py-5">
              <div className="block w-full md:flex">
                <div className="w-full md:w-[50%]">
                  <img src={data.image_Url[select].url} alt="productImage" />
                  <div className="w-full flex">
                    <div
                      className={`${select === 0 ? "border" : null} cursor-pointer`}
                    >
                      <img
                        src={data?.image_Url[0].url}
                        alt="productImage"
                        className="h-50"
                        onClick={() => setSelect(0)}
                      />
                    </div>
                    <div
                      className={`${select === 1 ? "border" : null} cursor-pointer`}
                    >
                      <img
                        src={data?.image_Url[1].url}
                        alt="productImage"
                        className="h-50"
                        onClick={() => setSelect(1)}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Col */}
                <div className="w-full md:w-[50%] mt-5 p-3">
                  <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                  <p>{data.description}</p>
                  <div className="flex mt-3">
                    <h4 className={`${styles.productDiscountPrice}`}>
                      {data.discount_price}$
                    </h4>
                    <h3 className={`${styles.price}`}>
                      {data.price ? data.price + "$" : null}
                    </h3>
                  </div>

                  <div
                    className={`${styles.normalFlex} mt-12 justify-between pr-12`}
                  >
                    <div>
                      <button
                        className="bg-linear-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={() =>
                          count === 1 ? setCount(1) : setCount(count - 1)
                        }
                      >
                        -
                      </button>
                      <span className="bg-gray-200 text-gray-800 font-medium px-4 py-2.5">
                        {count}
                      </span>
                      <button
                        className="bg-linear-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={() => setCount(count + 1)}
                      >
                        +
                      </button>
                    </div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>

                  <div
                    className={`${styles.button} mt-6 rounded h-11 flex items-center`}
                  >
                    <span className="text-white flex items-center">
                      Add to cart <AiOutlineShoppingCart className="ml-1" />
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center pt-8">
                      <img
                        src={data.shop.shop_avatar.url}
                        alt="shopImage"
                        className="w-12 h-12 rounded-full mr-2"
                      />
                      <div className="pr-8">
                        <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                          {data.shop.name}
                        </h3>
                        <h5 className="pb-3 text-[15px]">
                          ({data.shop.ratings}) Ratings
                        </h5>
                      </div>

                      <div
                        className={`${styles.button} bg-purple-700 text-white mt-4 rounded! h-11! p-3`}
                        onClick={handleMessageSubmit}
                      >
                        <span className="flex items-center">
                          Send Message <AiOutlineMessage className="ml-1" />
                        </span>
                      </div>
                    </div>
                  </div>

                  
                </div>
              </div>
            </div>

            <ProductDetailsInfo data={data}/>
          </div>
        </>
      ) : null}
    </div>
  );
}


const ProductDetailsInfo = () => {
  
}

export default ProductDetails;
