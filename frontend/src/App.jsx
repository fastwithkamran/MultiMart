import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { loadUser, loadSeller } from "./redux/actions/user";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "./components";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.seller);
  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadSeller());
  }, [dispatch]);

  if (loading || isLoading) {
    return <Loader />;
  }

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

      <Outlet />
    </>
  );
}

export default App;
