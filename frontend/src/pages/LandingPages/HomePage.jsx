import { useEffect } from "react";
import {
  Header,
  Hero,
  Categories,
  BestDeals,
  Events,
  FeaturedProducts,
  Sponsored,
  Footer,
} from "../../components";

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header activePage={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProducts />
      <Sponsored />
      <Footer />
    </div>
  );
}

export default HomePage;
