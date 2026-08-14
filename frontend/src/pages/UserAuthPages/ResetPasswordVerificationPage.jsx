import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../../../server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { Loader } from "../../components";

function ResetPasswordVerificationPage() {
  const { activation_token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (activation_token) {
      const activationEmail = async () => {
        setLoading(true);
        try {
          const res = await axios.post(`${server}/user/reset-forget-password`, {
            activation_token,
          });

          if (res.data.success) {
            navigate("/login");
            toast.success("Password has been Reset!!");
          }
        } catch (error) {
          setError(true);
          toast.error(error.response?.data?.message || error.message);
        } finally {
          setLoading(false);
        }
      };
      activationEmail();
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : !error ? (
        <div className="flex flex-col w-full h-screen items-center justify-center text-2xl text-red-400">
          <div
            className={`${styles.button} text-white p-3 shadow-2xl shadow-red-400`}
            onClick={handleSubmit}
          >
            Click Here to Reset Password
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full h-screen items-center justify-center text-2xl text-red-400 whitespace-pre-wrap">
          <p className="whitespace-pre-wrap p-3 text-center">
            Your Email Verification Code Has Expired. Try Reset Password Again!
          </p>
          <Link to={"/forget-password"}>
            <div
              className={`${styles.button} text-white p-3 shadow-2xl shadow-red-500`}
            >
              Reset Password
            </div>
          </Link>
        </div>
      )}
    </>
  );
}

export default ResetPasswordVerificationPage;
