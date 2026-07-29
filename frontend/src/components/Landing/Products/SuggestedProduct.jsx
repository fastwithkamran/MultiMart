import { productData } from "../../../static/data";
import styles from "../../../styles/styles";
import ProductCard from "./ProductCard";

const SuggestedProduct = ({ data }) => {
  const products =
    productData && productData.filter((i) => i.category === data.category);
  return (
    <div>
      {data && (
        <div className={`p-4 w-full`}>
          <h2
            className={`${styles.heading} text-[25px] font-medium border-b mb-5`}
          >
            Related Product
          </h2>
          <div className="grid grid-cols-1 gap-1.5 md:grid-cols-2 md:gap-3 lg:grid-cols-4 lg:gap-10 xl:grid-cols-5 xl:gap-16">
            {products &&
              products.map((i, index) => <ProductCard data={i} key={index} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuggestedProduct;
