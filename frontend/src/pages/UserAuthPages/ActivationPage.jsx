import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../../../server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUser } from "../../redux/actions/user";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { Loader } from "../../components";

function ActivationPage() {
  const { activation_token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        setLoading(true);
        try {
          const res = await axios.post(
            `${server}/user/activation`,
            {
              activation_token,
            },
            { withCredentials: true },
          );

          if (res.data.success) {
            dispatch(loadUser())
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
          <Link to={"/login"}>
            <div className={`${styles.button} text-white p-3`}>Go To Login</div>
          </Link>
        </div>
      )}
    </>
  );
}

export default ActivationPage;
