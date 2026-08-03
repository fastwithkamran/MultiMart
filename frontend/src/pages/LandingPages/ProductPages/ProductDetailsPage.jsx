import {
  Header,
  Footer,
  ProductDetails,
  SuggestedProduct,
} from "../../../components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.product);
  const { name } = useParams();
  // replaces spaces with - for SEO friendly
  const productName = name.replace(/-/g, " ");

  const data = allProducts?.find((i) => i.name === productName);

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
