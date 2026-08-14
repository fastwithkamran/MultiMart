import { useSelector } from "react-redux";
import { ForgetPassword } from "../../components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ForgetPasswordPage() {
  const navigate = useNavigate();
  const {isAuthenticated} = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated === true) navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <ForgetPassword />
    </div>
  );
}

export default ForgetPasswordPage;
