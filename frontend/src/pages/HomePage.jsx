import { Header, Hero, Categories, BestDeals } from "../components";

function HomePage() {
  return (
    <div>
      <Header activePage={1} />
      <Hero />
      <Categories />
      <BestDeals />
    </div>
  );
}

export default HomePage;
