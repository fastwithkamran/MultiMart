import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../../../../server";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import styles from "../../../../styles/styles";
import { format } from "timeago.js";

import socketIO from "socket.io-client";
const ENDPOINT = import.meta.env.VITE_Socket_API;
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const ShopInbox = () => {
  const { seller } = useSelector((state) => state.seller);
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);

  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // receiving new messages in real-time from socket
  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  // pushes the incoming message into your active chat bubble
  useEffect(() => {
    const GetLiveMessages = () => {
      arrivalMessage &&
        currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage]);
    };
    GetLiveMessages();
  }, [arrivalMessage, currentChat]);

  // get all messages
  useEffect(() => {
    if (open) {
      const GetMessages = async () => {
        try {
          const res = await axios.get(
            `${server}/message/get-all-messages/${currentChat?._id}`,
          );
          setMessages(res.data.messages);
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
        }
      };

      GetMessages();
    }
  }, [currentChat, open]);

  // create | sending message to customer
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    // message object
    const message = {
      sender: seller._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (memberId) => memberId !== seller._id,
    );

    // transmits the text to socket so that customer can receive the message instantly
    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      text: newMessage,
      images: [],
    });

    // update the new message in database
    try {
      if (newMessage !== "") {
        const res = await axios.post(
          `${server}/message/create-new-message`,
          message,
        );

        setMessages([...messages, res.data.message]);
        updateLastMessage();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // to update the last message both in database and socket
  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: seller._id,
    });

    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: seller._id,
      })
      .then(() => {
        setNewMessage("");
      })
      .catch((error) => toast.error(error.response?.data?.message));
  };

  // add seller to the socket and get active users from socket
  useEffect(() => {
    if (seller) {
      const userId = seller?._id;
      socketId.emit("addUser", userId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [seller]);

  const isOnline = (chat) => {
    const chatMembersId = chat.members.find((member) => member !== seller._id);
    const online = onlineUsers.map((user) => user.userId === chatMembersId);

    return online[0] ? true : false;
  };

  // get all seller conversations
  useEffect(() => {
    const fetchConversations = async () => {
      await axios
        .get(
          `${server}/conversation/get-all-seller-conversations/${seller._id}`,
          { withCredentials: true },
        )
        .then((res) => {
          setConversations(res.data.conversations);
        })
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
          <ConversationItem
            key={index}
            data={data}
            index={index}
            seller={seller}
            userData={userData}
            setUserData={setUserData}
            active={active}
            setActive={setActive}
            handleNavigateToChat={handleNavigateToChat}
            setCurrentChat={setCurrentChat}
            online={isOnline(data)}
            activeStatus={activeStatus}
            setActiveStatus={setActiveStatus}
          />
        ))}

      {/* Customer and Seller Messages */}
      {open && (
        <ChatBox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          seller={seller}
          userData={userData}
          activeStatus={activeStatus}
        />
      )}
    </div>
  );
};

const ConversationItem = ({
  index,
  data,
  seller,
  userData,
  setUserData,
  active,
  setActive,
  handleNavigateToChat,
  setCurrentChat,
  online,
  activeStatus,
  setActiveStatus,
}) => {
  setActiveStatus(online);
  // get the user information whom the seller chatting with
  useEffect(() => {
    const GetUser = async () => {
      const userId = data?.members?.find((id) => id !== seller._id);

      try {
        const res = await axios.get(`${server}/user/user-info/${userId}`);
        setUserData(res.data.user);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    };
    GetUser();
  }, [data?.members, seller?._id, setUserData]);

  return (
    <div
      key={index}
      className={`w-full flex p-2 px-3 bg-slate-200 cursor-pointer ${active === index ? "bg-black/50" : "bg-transparent"}`}
      onClick={() =>
        setActive(index) ||
        handleNavigateToChat(data?._id) ||
        setCurrentChat(data)
      }
    >
      <div className="relative">
        <img
          src={userData?.avatar?.url}
          alt="customerAvatar"
          className="w-12 h-12 rounded-full"
        />
        <div
          className={`w-3 h-3 rounded-full absolute top-0 right-0.5 ${activeStatus ? "bg-green-500" : "bg-gray-400"}`}
        />
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">{userData?.name}</h1>
        <p className="text-[16px] text-black">
          <span>
            {data?.lastMessageId !== userData?._id
              ? "You: "
              : userData?.name.split(" ")[0] + ": "}
          </span>
          <span>
            {data?.lastMessage ? `${data?.lastMessage}` : "No messages yet"}
          </span>
        </p>
      </div>
    </div>
  );
};

const ChatBox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  seller,
  userData,
  activeStatus,
}) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      {/* Header */}
      <div className="w-full p-1 flex items-center justify-between bg-blue-200">
        <div className="flex">
          <img
            src={userData.avatar.url}
            alt="CustomerImage"
            className="w-12 h-12 object-cover rounded-full"
          />
          <div className="pl-2">
            <h1 className="text-[18px] font-semibold">{userData?.name}</h1>
            <h1 className="text-[14px]">
              {activeStatus ? "Online" : "Offline"}
            </h1>
          </div>
        </div>
        <div onClick={() => setOpen(false)} className="cursor-pointer">
          <AiOutlineArrowRight size={20} />
        </div>
      </div>

      {/* messages */}
      <div className="p-2 bg-slate-200 h-[70vh]">
        {messages &&
          messages.map((item, index) => (
            <div
              key={index}
              className={`flex w-full my-2 ${item.sender === seller._id ? "justify-end" : "justify-start"}`}
            >
              <img
                src="http://localhost:8000/Kamran-1786270969732-857867360.png"
                alt="customerImage"
                className={`w-9 h-9 rounded-full mr-3 ${item.sender === seller._id ? "hidden" : ""}`}
              />
              <div>
                <div className="w-max bg-slate-400 h-min p-2 rounded-md">
                  <p>{item.text}</p>
                </div>
                <p className="text-[12px] text-cyan-500 pt-1">
                  {format(item.createdAt)}
                </p>
              </div>
            </div>
          ))}
      </div>

      {/* send message input */}
      <form
        aria-required={true}
        onSubmit={sendMessageHandler}
        className="p-3 relative w-full flex justify-between items-center"
      >
        <div className="w-[3%] pr-2">
          <TfiGallery size={15} />
        </div>
        <div className="w-[90%] sm:w-[92%] md:w-[95%] lg:w-[97%]">
          <input
            type="text"
            placeholder="Enter your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className={`${styles.input}`}
            required
          />
          <input type="submit" value={"Send"} className="hidden" id="send" />
          <label htmlFor="send">
            <AiOutlineSend
              size={20}
              className="absolute top-5 right-4 cursor-pointer"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default ShopInbox;
