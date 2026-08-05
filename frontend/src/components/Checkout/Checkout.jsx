import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "../../styles/styles";
import axios from "axios";
import { server } from "../../../server";

function Checkout() {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState("");
  const [discountPrice, setDiscountPrice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paymentSubmit = () => {
    if (
      address === "" ||
      zipCode === null ||
      country === "" ||
      city === ""
    ) {
      toast.error("Please Choose your delivery address");
    } else {
      const shippingAddress = {
        address,
        zipCode,
        country,
        city,
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        user,
      };

      //   updating local storage with updated order array
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0,
  );

  // shipping cost variable
  const shipping = subTotalPrice * 0.1;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .get(`${server}/coupon/get-coupon-value/${couponCode}`)
      .then((res) => {
        const shopId = res.data.couponCode?.shopId;
        const couponCodeValue = res.data.couponCode?.value;
        if (res.data.couponCode !== null) {
          const isCouponValid =
            cart && cart.filter((item) => item.shopId === shopId);

          if (isCouponValid.length === 0) {
            toast.error("Coupon code is not valid for this shop");
            setCouponCode("");
          } else {
            const eligiblePrice = isCouponValid.reduce(
              (acc, item) => acc + item.qty * item.discountPrice,
              0,
            );

            const discountPrice = (eligiblePrice * couponCodeValue) / 100;
            setDiscountPrice(discountPrice);
            setCouponCodeData(res.data.couponCode);
            setCouponCode("");
          }
        }

        if (res.data.couponCode === null) {
          toast.error("Coupon code doesnt exists!");
          setCouponCode("");
        }
      });
  };

  const discountPercentage = couponCodeData ? discountPrice : "";

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentage).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] lg:w-[70%] block md:flex">
        <div className="w-full md:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address={address}
            setAddress={setAddress}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </div>

        <div className="w-full md:w-[35%] md:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentage={discountPercentage}
          />
        </div>
      </div>

      <div
        className={`${styles.button} w-36 md:w-70 mt-10`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Go to Payment</h5>
      </div>
    </div>
  );
}

// Shipping Info component
const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address,
  setAddress,
  zipCode,
  setZipCode,
}) => {
  return (
    <div className="w-full md:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] fone-medium">Shipping Address</h5>

      <form>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Full Name</label>
            <input
              type="text"
              value={user && user.name}
              required
              className={`${styles.input} w-[95%]!`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Email Address</label>
            <input
              type="email"
              value={user && user.email}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Phone Number</label>
            <input
              type="number"
              required
              value={user && user.phoneNumber}
              className={`${styles.input} w-[95%]!`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Zip Code</label>
            <input
              type="number"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Country</label>
            <select
              className="w-[95%] border h-10 rounded-[5px]"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option>Choose Your Country</option>
              {Country &&
                Country.getAllCountries().map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="w-[50%]">
            <label className="block pb-2">City</label>
            <select
              className="w-[95%] border h-10 rounded-[5px]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option className="block pb-2">Choose Your City</option>

              {State &&
                State.getStatesOfCountry(country).map((city) => (
                  <option key={city.isoCode} value={city.isoCode}>
                    {city.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="w-full flex pb-3">
            <div className="w-full">
              <label className="block pb-2">Address</label>
              <input
                type="address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`${styles.input} h-10`}
              />
            </div>
          </div>
        </div>
      </form>

      <h5
        className="text-[18px] cursor-pointer inline-block"
        onClick={() => setUserInfo(!userInfo)}
      >
        Choose from Saved Addresses
      </h5>
      {userInfo && (
        <div>
          {user &&
            user.addresses.map((item) => (
              <div className="flex w-full mt-1">
                <input
                  type="checkbox"
                  className="mr-3"
                  value={item.addressType}
                  onClick={() =>
                    setAddress(item.address) ||
                    setZipCode(item.zipCode) ||
                    setCountry(item.setCountry) ||
                    setCity(item.setCity)
                  }
                />
                <h2>{item.addressType}</h2>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

// Cart Data Info
const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  couponCode,
  setCouponCode,
  discountPercentage,
}) => {
  return (
    <div className="w-full bg-white rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-medium text-[#000000a4]">Shipping:</h3>
        <h5 className="text-[18px] font-medium">${shipping.toFixed(2)}</h5>
      </div>

      <div className="mt-2 flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-medium text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-medium">
          -{discountPercentage ? "$" + discountPercentage.toString() : null}
        </h5>
      </div>

      <h5 className="text-[18px] font-medium text-end pt-3">${totalPrice}</h5>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.input} h-8 pl-2`}
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <input
          type="submit"
          required
          value="Apply Code"
          className="w-full h-8 border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Checkout;
