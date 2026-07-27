import { AiOutlineCamera } from "react-icons/ai";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import { useState } from "react";
function ProfileContent({ active }) {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [ZipCode, setZipCode] = useState(null);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full">
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                alt="Image"
                src={`${user.avatar.url}`}
                className="w-30 h-30 rounded-full object-cover border-[3px] border-green-400"
              />
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center cursor-pointer absolute bottom-1.5 right-1.5">
                <AiOutlineCamera />
              </div>
            </div>
          </div>
          <div>
            <form
              className="w-full px-5 mt-8"
              onSubmit={handleSubmit}
              aria-required={true}
            >
              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} w-[95%]!`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="email"
                    className={`${styles.input} w-[95%]!`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} w-[95%]!`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Zip Code</label>
                  <input
                    type="number"
                    className={`${styles.input} w-[95%]!`}
                    required
                    value={ZipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Address 1</label>
                  <input
                    type="text"
                    className={`${styles.input} w-[95%]!`}
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Address 2</label>
                  <input
                    type="text"
                    className={`${styles.input} w-[95%]!`}
                    required
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
              </div>
              <input
                type="submit"
                required
                value="Update"
                className="w-64 h-8 border border-blue-800 text-center text-blue-700 rounded-sm mt-8 cursor-pointer"
              />
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfileContent;
