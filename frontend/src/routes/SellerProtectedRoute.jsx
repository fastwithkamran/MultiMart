import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SellerProtectedRoute = ({ children }) => {
  const { isLoading, isSeller } = useSelector((state) => state.seller);
  if (!isLoading && !isSeller) {
    return <Navigate to={`/dashboard`} replace />;
  }
  return children;
};

export default SellerProtectedRoute;
