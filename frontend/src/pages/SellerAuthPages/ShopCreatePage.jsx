import { ShopCreate } from "../../components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function ShopCreatePage() {
  const navigate = useNavigate();
  const { isSeller, seller } = useSelector((state) => state.seller);
  useEffect(() => {
    if (isSeller === true) navigate(`/dashboard`);
  }, [isSeller, navigate, seller]);
  return (
    <div>
      <ShopCreate />
    </div>
  );
}

export default ShopCreatePage;
