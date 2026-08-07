import {
  Header,
  Footer,
  ProductDetails,
  SuggestedProduct,
} from "../../../components";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.product);
  const { allEvents } = useSelector((state) => state.event);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  let data;

  if (eventData !== null) {
    data = allEvents?.find((i) => i._id === id);
  } else {
    data = allProducts?.find((i) => i._id === id);
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <ProductDetails data={data} />
      {!eventData && data && <SuggestedProduct data={data} />}
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
