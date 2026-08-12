import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { server } from "../../../server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Loader } from "../../components";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";

function SellerActivationPage() {
  const { activation_token } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        setLoading(true);
        try {
          const res = await axios.post(
            `${server}/shop/activation`,
            {
              activation_token,
            },
            { withCredentials: true },
          );

          if (res.data.success) {
            toast.success("Shop Created Successfully");
            navigate("/dashboard");
          } else {
            toast.error(res.data.message);
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
          toast.error(error.response.data.message);
          console.error(error.response.data.message);
        }
      };
      activationEmail();
    }
  }, [activation_token, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col w-full h-screen items-center justify-center text-2xl text-red-400">
          Your Email Verification Code Has Expired. Try again!
          <Link to={"/login"}>
            <div className={`${styles.button} text-white p-3`}>Go To Login</div>
          </Link>
        </div>
      )}
    </>
  );
}

export default SellerActivationPage;
