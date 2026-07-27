import { useState } from "react";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";

function ProductDetails({ data }) {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(1);

  const handleMessageSubmit = () => {};
  return (
    <div className="bg-white">
      {data ? (
        <>
          <div className={`unset w-[90%] md:w-[80%] mx-auto`}>
            <div className="w-full py-5">
              {/* left col */}

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
            <ProductDetailsInfo data={data} />
            <br />
            <br />
          </div>
        </>
      ) : null}
    </div>
  );
}

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-slate-200 px-3 md:px-10 rounded py-2">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className="text-black text-[18px] px-1 leading-5 font-medium cursor-pointer md:text-[20px]"
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>

        <div className="relative">
          <h5
            className="text-black text-[18px] px-1 leading-5 font-medium cursor-pointer md:text-[20px]"
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>

        <div className="relative">
          <h5
            className="text-black text-[18px] px-1 leading-5 font-medium cursor-pointer md:text-[20px]"
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>

      <div>
        {active === 1 ? (
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
            necessitatibus suscipit saepe. Ratione delectus alias quas fuga
            soluta expedita repellat dolore, fugit aperiam amet! Iure harum
            error dolorem dicta nulla! Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. <br /> <br /> Aperiam ea facere maiores quae
            distinctio, accusamus minima laborum ullam? Officiis eveniet tempora
            cumque labore et qui quasi expedita obcaecati odio neque. Hic
            voluptatem, aut explicabo, vitae, magni impedit accusantium quos
            repellat aliquam corrupti veritatis cum doloribus ad ipsum
            consequuntur esse repudiandae dolorum quas. Pariatur unde ipsum
            repudiandae doloribus perspiciatis, inventore repellat est aliquid
            magni temporibus.
          </p>
        ) : null}
      </div>

      <div>
        {active === 2 ? (
          <p className="w-full justify-center items-center flex min-h-[40vh]">
            No Reviews Yet!
          </p>
        ) : null}
      </div>

      <div>
        {active === 3 ? (
          <div className="w-full block md:flex p-5">
            <div className="w-full md:w-[50%]">
              <div className="flex items-center">
                <img
                  src={data.shop.shop_avatar.url}
                  alt="ShopImage"
                  className="w-8 h-8 rounded-full"
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  <h5 className="pb-2 text-[15px]">
                    ({data.shop.ratings}) Ratings
                  </h5>
                </div>
              </div>
              <div>
                <p className="mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit quia sapiente libero provident, deleniti velit
                  laborum dignissimos fugiat asperiores, dolore accusantium eos
                  est, voluptatibus consequuntur neque. Eligendi placeat quam
                  deleniti.
                </p>
              </div>
            </div>

            <div className="w-full md:w-[50%] mt-5 md:mt-0 md:flex flex-col items-end">
              <div className="text-left">
                <h5 className="font-medium mb-3">
                  Joined on: <span>27 July, 2026</span>
                </h5>
                <h5 className="font-medium mb-3">
                  Total Products: <span>1,223</span>
                </h5>
                <h5 className="font-medium mb-3">
                  Total Reviews: <span>223</span>
                </h5>
                <Link to={"/"}>
                  <div className={`${styles.button} rounded-sm h-8 mt-3`}>
                    <h4 className="text-white">Visit Shop</h4>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProductDetails;
