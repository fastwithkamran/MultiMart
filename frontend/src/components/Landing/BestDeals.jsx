import { productData } from "../../static/data";
import styles from "../../styles/styles";
import ProductCard from "./ProductCard";

const BestDeals = () => {
  const bestDeals =
    productData &&
    [...productData]
      .sort((item1, item2) => item2.total_sell - item1.total_sell)
      .slice(0, 5);

  return (
    <>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="p-5">
          <div
            className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
            id="categories"
          >
            <div className="grid grid-cols-1 gap-1.5 md:grid-cols-2 md:gap-3 lg:grid-cols-4 lg:gap-10 xl:grid-cols-5 xl:gap-16">
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
