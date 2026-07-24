import {
  Header,
  Hero,
  Categories,
  BestDeals,
  Events,
  FeaturedProducts,
  Sponsored,
} from "../components";

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
    </div>
  );
}

export default HomePage;
