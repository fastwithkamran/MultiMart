import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <nav className="mb-3"></nav>
      <main>
        <Outlet />
      </main>
      <footer className="mt-3"></footer>
    </>
  );
}

export default App;
