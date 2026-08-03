import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../Products/ProductCard";

const BestDeals = () => {
  const { allProducts } = useSelector((state) => state.product);

  const bestDeals =
    allProducts &&
    [...allProducts]
      .sort((item1, item2) => item2.sold_out - item1.sold_out)
      .slice(0, 5);

  return (
    <>
      <div className="w-full">
        <div className={`${styles.heading} ml-5`}>
          <h1>Best Deals</h1>
        </div>
        <div className="p-5">
          <div className="w-full bg-white p-6 rounded-lg mb-12" id="categories">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-7 xl:grid-cols-5 mb-12 border-0">
              {bestDeals &&
                bestDeals.map((product, index) => {
                  return <ProductCard data={product} key={index} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BestDeals;
