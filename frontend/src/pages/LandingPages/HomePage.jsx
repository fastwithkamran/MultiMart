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
