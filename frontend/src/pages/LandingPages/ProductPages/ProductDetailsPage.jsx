import { Header, Footer, ProductDetails, SuggestedProduct } from "../../../components";
import { useParams } from "react-router-dom";
import { productData } from "../../../static/data";

const ProductDetailsPage = () => {
  const { name } = useParams();
  // replaces spaces with - for SEO friendly
  const productName = name.replace(/-/g, " ");

  const data = [...productData].find((i) => i.name === productName);

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
