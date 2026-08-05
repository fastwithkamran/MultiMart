import { useNavigate } from "react-router-dom";
import { RxPerson } from "react-icons/rx";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import axios from "axios";
import { server } from "../../../server";
import { toast } from "react-toastify";

function ProfileSidebar({ active, setActive }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      axios
        .get(`${server}/user/logout`, { withCredentials: true })
        .then((res) => {
          toast.success(res.data.message);
          navigate("/login");
          window.location.reload();
        });
    } catch (error) {
      console.error(error.response.data.message);
      console.error(error);
      toast.error("Failed to fetch API Request");
    }
  };
  return (
    <div className="w-full bg-white shadow-sm rounded-sm pt-8 p-4">
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 1 ? "text-red-500" : ""} hidden md:block`}
        >
          Profile
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 2 ? "text-red-500" : ""} hidden md:block`}
        >
          Orders
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 3 ? "text-red-500" : ""} hidden md:block`}
        >
          Refunds
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4) || navigate("/inbox")}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 4 ? "text-red-500" : ""} hidden md:block`}
        >
          Inbox
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 5 ? "text-red-500" : ""} hidden md:block`}
        >
          Track Order
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine size={20} color={active === 6 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 6 ? "text-red-500" : ""} hidden md:block`}
        >
          Change Password
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 7 ? "text-red-500" : ""} hidden md:block`}
        >
          Address
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => {
          setActive(8);
          handleLogout();
        }}
      >
        <AiOutlineLogin size={20} color={active === 8 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 8 ? "text-red-500" : ""} hidden md:block`}
        >
          Log Out
        </span>
      </div>
    </div>
  );
}

export default ProfileSidebar;
