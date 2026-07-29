import { ShopLogin } from "../../components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function ShopLoginPage() {
  const navigate = useNavigate();
  const { isSeller, isLoading } = useSelector((state) => state.seller);
  useEffect(() => {
    if (isSeller === true) navigate(`/dashboard`);
  }, [isSeller, navigate, isLoading]);
  return (
    <div>
      <ShopLogin />
    </div>
  );
}

export default ShopLoginPage;
