import axios from "axios";
import { AiOutlineCamera } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../../../../server";
import { toast } from "react-toastify";
import styles from "../../../../styles/styles";
import { loadSeller } from "../../../../redux/actions/user";
import { useState } from "react";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  const [name, setName] = useState(seller?.name || "");
  const [description, setDescription] = useState(seller?.description || "");
  const [address, setAddress] = useState(seller?.address || "");
  const [phoneNumber, setphoneNumber] = useState(seller?.phoneNumber || null);
  const [zipCode, setZipCode] = useState(seller?.zipCode || null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e) => {
    const formData = new FormData();
    setLoading(true);

    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/shop/update-shop-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then(() => {
        dispatch(loadSeller()).then(() =>
          toast.success("Avatar Updated Successfully"),
        );
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || error.message);
      })
      .finally(() => setLoading(false));
  };

  const handleUpdateShopInfo = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios
      .put(
        `${server}/shop/update-shop-info`,
        {
          name,
          address,
          description,
          zipCode,
          phoneNumber,
        },
        { withCredentials: true },
      )
      .then(() => {
        dispatch(loadSeller()).then(() =>
          toast.success("Shop Information Updated"),
        );
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full min-h-screen my-5 flex flex-col items-center">
      <div className="w-[80%] md:w-full flex flex-col justify-center">
        {/* Shop avatar */}
        <div className="w-full flex items-center justify-center mt-5">
          <div className="relative">
            <img
              src={seller.avatar.url}
              alt="shopImage"
              className="w-32 h-32 rounded-full cursor-pointer"
            />
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center cursor-pointer absolute bottom-2 right-2">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={(e) => handleImageChange(e)}
              />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>

        {/* Shop Information */}
        <form
          aria-required
          className="flex justify-center mt-5"
          onSubmit={handleUpdateShopInfo}
        >
          <div className="w-full md:w-[50%]">
            <label className="block pb-2 font-semibold">Shop Name</label>
            <input
              type="name"
              placeholder={name}
              value={name}
              className={`${styles.input} w-[95%]!`}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label className="block pb-2 font-semibold mt-5">Shop Email</label>
            <input
              type="email"
              placeholder={seller?.email}
              className={`${styles.input} w-[95%]!`}
              readOnly
              required
            />
            <label className="block pb-2 font-semibold mt-5">
              Shop Description
            </label>
            <textarea
              type="text"
              cols={20}
              rows={5}
              placeholder={
                seller?.description
                  ? seller?.description
                  : "Enter your shop description"
              }
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${styles.input} w-[95%]!`}
            />
            <label className="block pb-2 font-semibold mt-5">
              Shop Address
            </label>
            <input
              type="text"
              placeholder={
                seller?.address ? seller?.address : "Enter your shop address"
              }
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`${styles.input} w-[95%]!`}
              required
            />
            <label className="block pb-2 font-semibold mt-5">
              Shop Phone Number
            </label>
            <input
              type="number"
              placeholder={
                seller?.phoneNumber
                  ? seller?.phoneNumber
                  : "Enter your shop phone number"
              }
              value={phoneNumber}
              onChange={(e) => setphoneNumber(e.target.value)}
              className={`${styles.input} w-[95%]!`}
              required
            />
            <label className="block pb-2 font-semibold mt-5">
              Shop ZipCode
            </label>
            <input
              type="number"
              placeholder={
                seller?.zipCode ? seller?.zipCode : "Enter your shop zipCode"
              }
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className={`${styles.input} w-[95%]!`}
              required
            />
            <input
              disabled={loading}
              type="submit"
              required
              value={loading ? "Loading..." : "Update"}
              className="w-[95%]! h-8 border border-blue-800 text-center text-blue-700 rounded-sm mt-8 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
