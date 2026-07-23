import { Header, Hero, Categories } from "../components";

function HomePage() {
  return (
    <div>
      <Header activePage={1} />
      <Hero />
      <Categories />
    </div>
  );
}

export default HomePage;
