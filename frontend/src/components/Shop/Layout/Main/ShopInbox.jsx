import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../../../../server";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import styles from "../../../../styles/styles";

const ShopInbox = () => {
  const { seller } = useSelector((state) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversations = async () => {
      await axios
        .get(
          `${server}/conversation/get-all-seller-conversations/${seller._id}`,
          { withCredentials: true },
        )
        .then((res) => setConversations(res.data.conversations))
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };

    fetchConversations();
  }, [seller._id]);

  const handleNavigateToChat = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };

  return (
    <div className="w-[90%] bg-white m-4 h-[85vh] overflow-y-auto rounded">
      {/* All Chats */}
      {!open && (
        <h1 className="text-center text-[30px] py-3 font-Poppins">All Chats</h1>
      )}

      {/* All conversations list */}
      {!open &&
        conversations &&
        conversations.map((data, index) => (
          <div
            key={index}
            className={`w-full flex p-2 px-3 bg-slate-200 cursor-pointer ${active === index ? "bg-black/50" : "bg-transparent"}`}
            onClick={() => setActive(index) || handleNavigateToChat(data._id)}
          >
            <div className="relative">
              <img
                src={`http://localhost:8000/Kamran-1786270969732-857867360.png`}
                alt="customerAvatar"
                className="w-12 h-12 rounded-full"
              />
              <div className="w-3 h-3 bg-green-500 rounded-full absolute top-0 right-0.5" />
            </div>
            <div className="pl-3">
              <h1 className="text-[18px]">Kamran Ayaz</h1>
              <p className="text-[16px] text-black">
                You: Yeah I am trying hard
              </p>
            </div>
          </div>
        ))}

      {/* Customer and Seller Messages */}
      {open && (
        <div className="w-full min-h-full flex flex-col justify-between">
          {/* Header */}
          <div className="w-full p-1 flex items-center justify-between bg-blue-200">
            <div className="flex">
              <img
                src="http://localhost:8000/Kamran-1786270969732-857867360.png"
                alt="CustomerImage"
                className="w-12 h-12 object-cover rounded-full"
              />
              <div className="pl-2">
                <h1 className="text-[18px] font-semibold">Kamran Ayaz</h1>
                <h1 className="text-[14px]">Active Now</h1>
              </div>
            </div>
            <div onClick={() => setOpen(false)} className="cursor-pointer">
              <AiOutlineArrowRight size={20} />
            </div>
          </div>

          {/* messages */}
          <div className="p-2 bg-slate-200 h-[70vh]">
            <div className="flex w-full my-2">
              <img
                src="http://localhost:8000/Kamran-1786270969732-857867360.png"
                alt="customerImage"
                className="w-9 h-9 rounded-full mr-3"
              />
              <div className="w-max bg-slate-400 h-min p-2 rounded-md">
                <p>Hello there!</p>
              </div>
            </div>
          
            <div className="flex w-full my-2 justify-end">
              <div className="w-max bg-slate-400 h-min p-2 rounded-md">
                <p>Hi!</p>
              </div>
            </div>
          </div>

          {/* send message input */}
          <form
            aria-required={true}
            className="p-3 relative w-full flex justify-between items-center"
          >
            <div className="w-[3%] pr-2">
              <TfiGallery size={15} />
            </div>
            <div className="w-[90%] sm:w-[92%] md:w-[95%] lg:w-[97%]">
              <input
                type="text"
                placeholder="Enter your message..."
                className={`${styles.input}`}
                required
              />
              <input
                type="submit"
                value={"Send"}
                className="hidden"
                id="send"
              />
              <label htmlFor="send">
                <AiOutlineSend
                  size={20}
                  className="absolute top-5 right-4 cursor-pointer"
                />
              </label>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ShopInbox;
