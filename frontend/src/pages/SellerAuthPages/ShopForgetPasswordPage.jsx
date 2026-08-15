import { useSelector } from "react-redux";
import { ShopForgetPassword } from "../../components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ShopForgetPasswordPage() {
  const navigate = useNavigate();
  const { isSeller } = useSelector((state) => state.seller);
  useEffect(() => {
    if (isSeller === true) navigate("/dashboard");
  }, [isSeller, navigate]);

  return (
    <div>
      <ShopForgetPassword />
    </div>
  );
}

export default ShopForgetPasswordPage;
