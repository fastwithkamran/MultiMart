import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUser } from "../redux/actions/user";

function ActivationPage() {
  const { activation_token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(
            `${server}/user/activation`,
            {
              activation_token,
            },
            { withCredentials: true },
          );

          if (res.data.success) {
            toast.success("Account Created Successfully");
            dispatch(loadUser());
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
  }, [activation_token, navigate, dispatch]);
}

export default ActivationPage;
