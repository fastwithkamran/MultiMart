import { useMemo } from "react";
import { Header, ProductCard } from "../../../components";
import { useSearchParams } from "react-router-dom";
import { productData } from "../../../static/data";

function ProductPage() {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");

  const products = useMemo(() => {
    if (categoryData === null) {
      return (
        productData &&
        [...productData].sort(
          (item1, item2) => item2.total_sell - item1.total_sell,
        )
      );
    } else {
      return (
        productData &&
        productData.filter((item) => item.category === categoryData)
      );
    }
  }, [categoryData]);

  return (
    <div>
      <Header activePage={3} />
      <div className="w-full p-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5 xl-gap-[30px] mb-12">
          {products &&
            products.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
        {products && products.length === 0 && (
          <h1 className="text-center w-full pb-28 text-[20px]">
            No Products Found!
          </h1>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
