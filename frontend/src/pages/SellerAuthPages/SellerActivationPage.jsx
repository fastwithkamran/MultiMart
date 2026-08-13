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
import { useDispatch } from "react-redux";
import { loadSeller } from "../../redux/actions/user";

function SellerActivationPage() {
  const { activation_token } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
            dispatch(loadSeller())
              .then(() => {
                navigate("/");
                toast.success("Welcome to the MultiMart");
              })
              .catch((error) =>
                toast.error(error.response?.data?.message || error.message),
              );
          }
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
        } finally {
          setLoading(false);
        }
      };
      activationEmail();
    }
  }, [activation_token, navigate, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col w-full h-screen items-center justify-center text-2xl text-red-400">
          Your Email Verification Code Has Expired. Try again!
          <Link to={"/shop-login"}>
            <div className={`${styles.button} text-white p-3`}>Go To Login</div>
          </Link>
        </div>
      )}
    </>
  );
}

export default SellerActivationPage;
