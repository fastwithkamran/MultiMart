import ShopLogin from "../../components/Shop/ShopLogin";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function ShopLoginPage() {
  const navigate = useNavigate();
  const { isSeller, seller } = useSelector((state) => state.seller);
  useEffect(() => {
    if (isSeller === true) navigate(`/shop/${seller._id}`);
  }, [isSeller, navigate, seller]);
  return (
    <div>
      <ShopLogin />
    </div>
  );
}

export default ShopLoginPage;
