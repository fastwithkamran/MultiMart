import {
  Header,
  Hero,
  Categories,
  BestDeals,
  Events,
  FeaturedProducts,
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
    </div>
  );
}

export default HomePage;
