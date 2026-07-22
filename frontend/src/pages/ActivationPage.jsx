import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../../server";
import { toast } from "react-toastify";

function ActivationPage() {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          setError(false);
          const res = await axios.post(
            `${server}/user/activation`,
            {
              activation_token,
            },
            { withCredentials: true },
          );

          if (res.data.success) {
            toast.success("Account Created Successfully");
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          setError(true);
          console.error(error.response.data.message);
        }
      };
      activationEmail();
    }
  }, [activation_token]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      {error ? (
        <p>Your token is expired</p>
      ) : (
        <p>Your account had been created successfully</p>
      )}
    </div>
  );
}

export default ActivationPage;
