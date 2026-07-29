import { useMemo } from "react";
import { Header, ProductCard } from "../../components";
import { productData } from "../../static/data";

function BestSellingPage() {
  const products = useMemo(() => {
    return (
      productData &&
      [...productData].sort(
        (item1, item2) => item2.total_sell - item1.total_sell,
      )
    );
  }, []);

  return (
    <div>
      <Header activePage={2} />
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

export default BestSellingPage;
