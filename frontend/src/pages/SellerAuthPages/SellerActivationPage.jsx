import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { server } from "../../../server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SellerActivationPage() {
  const { activation_token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
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
            navigate("/");
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          console.error(error.response.data.message);
        }
      };
      activationEmail();
    }
  }, [activation_token, navigate]);
}

export default SellerActivationPage;
