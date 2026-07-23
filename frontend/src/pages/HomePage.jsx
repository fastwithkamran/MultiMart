import { Header, Hero } from "../components";

function HomePage() {
  return (
    <div>
      <Header activePage={1} />
      <Hero />
    </div>
  );
}

export default HomePage;
