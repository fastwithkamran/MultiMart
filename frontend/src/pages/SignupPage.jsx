import { Signup } from "../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SignupPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated === true) navigate("/");
  }, [isAuthenticated, navigate]);
  return (
    <div>
      <Signup />
    </div>
  );
}

export default SignupPage;
