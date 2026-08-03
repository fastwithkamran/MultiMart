import {
  Header,
  Footer,
  ProductDetails,
  SuggestedProduct,
} from "../../../components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.product);
  const { name } = useParams();
  // replaces spaces with - for SEO friendly
  const productName = name.replace(/-/g, " ");

  const data = allProducts?.find((i) => i.name === productName);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <ProductDetails data={data} />
      {data && <SuggestedProduct data={data} />}
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
