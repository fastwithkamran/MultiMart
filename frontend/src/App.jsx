import { Outlet } from "react-router";

function App() {
  return (
    <>
      <nav className="mb-3"></nav>
      <main>
        <Outlet />
      </main>
      <footer className="mt-3"></footer>
    </>
  );
}

export default App;
