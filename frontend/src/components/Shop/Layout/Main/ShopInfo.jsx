import styles from "../../../../styles/styles";
import axios from "axios";
import { server } from "../../../../../server";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function ShopInfo({ isOwner }) {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => setData(res.data.shop))
      .catch((error) => toast.error(error.response.data.message));
  }, [id]);

  const handleLogOut = async (e) => {
    e.preventDefault();
    axios
      .get(`${server}/shop/logout`, { withCredentials: true })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div>
      <div className="w-full py-5">
        <div className="w-full flex items-center justify-center">
          <img
            alt="Image"
            src={`${data?.avatar?.url}`}
            className="w-16 h-16 md:w-32 md:h-32 rounded-full object-cover border-2 border-green-400"
          />
        </div>
        <h3 className="text-center py-2 text-[20px]">{data?.name}</h3>
        <p className="text-[16px] text-black/60 p-2.5 flex items-center">
          {data?.description}
        </p>
      </div>

      <div className="p-3">
        <h5 className="font-semibold">Address</h5>
        <h4 className="text-black/60">{data?.address}</h4>
      </div>

      <div className="p-3">
        <h5 className="font-semibold">Phone Number</h5>
        <h4 className="text-black/60">{data?.phoneNumber}</h4>
      </div>

      <div className="p-3">
        <h5 className="font-semibold">Total Products</h5>
        <h4 className="text-black/60">10</h4>
      </div>

      <div className="p-3">
        <h5 className="font-semibold">Shop Ratings</h5>
        <h4 className="text-black/60">4/5</h4>
      </div>

      <div className="p-3">
        <h5 className="font-semibold">Joined On</h5>
        <h4 className="text-black/60">{data?.createdAt?.slice(0, 10)}</h4>
      </div>

      {isOwner && (
        <div className="py-3 px-4">
          <div className={`${styles.button} w-full! h-10! rounded-sm!`}>
            <span className="text-white text-center text-sm md:text">
              Edit Shop
            </span>
          </div>
          <div
            className={`${styles.button} w-full! h-10! rounded-sm!`}
            onClick={(e) => handleLogOut(e)}
          >
            <span className="text-white text-center text-sm md:text">
              Log Out
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShopInfo;
