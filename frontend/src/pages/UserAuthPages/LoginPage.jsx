import { useSelector } from "react-redux";
import { Login } from "../../components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const {isAuthenticated} = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated === true) navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <Login />
    </div>
  );
}

export default LoginPage;
