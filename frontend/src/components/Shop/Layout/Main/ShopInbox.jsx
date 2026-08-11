import { useEffect, useRef, useState } from "react";
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
  const [chatUserData, setChatUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const currentChatRef = useRef(null);

  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // receive new messages in real-time from socket
  useEffect(() => {
    socketId.on("getMessage", (data) => {
      const message = {
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      };

      if (currentChatRef.current?.members?.includes(data.senderId)) {
        setMessages((prev) => [...prev, message]);
      }
    });
  }, []);

  useEffect(() => {
    currentChatRef.current = currentChat;
  }, [currentChat]);

  // get all messages
  useEffect(() => {
    if (open && currentChat?._id) {
      const GetMessages = async () => {
        try {
          const res = await axios.get(
            `${server}/message/get-all-messages/${currentChat._id}`,
          );
          setMessages(res.data.messages);
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
        }
      };

      GetMessages();
    }
  }, [currentChat, open]);

  // fetch selected chat user data
  useEffect(() => {
    if (!currentChat?._id) return;

    const fetchChatUser = async () => {
      const userId = currentChat.members.find((id) => id !== seller._id);
      try {
        const res = await axios.get(`${server}/user/user-info/${userId}`);
        setChatUserData(res.data.user);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    };

    fetchChatUser();
  }, [currentChat, seller._id]);

  // create | sending message to customer
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    if (!newMessage.trim() || !currentChat?._id) return;

    const message = {
      sender: seller._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (memberId) => memberId !== seller._id,
    );

    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      text: newMessage,
      images: [],
    });

    try {
      const res = await axios.post(
        `${server}/message/create-new-message`,
        message,
      );
      setMessages((prev) => [...prev, res.data.message]);
      await updateLastMessage();
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

    try {
      await axios.put(
        `${server}/conversation/update-last-message/${currentChat._id}`,
        {
          lastMessage: newMessage,
          lastMessageId: seller._id,
        },
      );
      setNewMessage("");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // add seller to the socket and get active users from socket
  useEffect(() => {
    if (!seller?._id) return;

    const userId = seller._id;
    socketId.emit("addUser", userId);
    socketId.on("getUsers", (data) => {
      setOnlineUsers(data);
    });
  }, [seller]);

  const isOnline = (chat) => {
    const chatMembersId = chat.members.find((member) => member !== seller._id);
    return onlineUsers.some((user) => user.userId === chatMembersId);
  };

  // get all seller conversations
  useEffect(() => {
    if (!seller?._id) return;

    const fetchConversations = async () => {
      try {
        const res = await axios.get(
          `${server}/conversation/get-all-seller-conversations/${seller._id}`,
          { withCredentials: true },
        );
        setConversations(res.data.conversations);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    };

    fetchConversations();
  }, [seller._id]);

  const activeStatus = currentChat
    ? onlineUsers.some(
        (user) =>
          currentChat.members.find((member) => member !== seller._id) ===
          user.userId,
      )
    : false;

  const handleNavigateToChat = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };

  const closeChat = () => {
    setOpen(false);
    setCurrentChat(null);
    setChatUserData(null);
    setMessages([]);
  };

  return (
    <div className="w-[90%] bg-white m-4 h-[85vh] overflow-hidden rounded shadow-sm">
      {!open && (
        <h1 className="text-center text-[30px] py-3 font-Poppins">All Chats</h1>
      )}

      {!open &&
        conversations?.map((data, index) => (
          <ConversationItem
            key={data._id || index}
            data={data}
            index={index}
            seller={seller}
            active={active}
            setActive={setActive}
            handleNavigateToChat={handleNavigateToChat}
            setCurrentChat={setCurrentChat}
            online={isOnline(data)}
          />
        ))}

      {open && (
        <ChatBox
          closeChat={closeChat}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          seller={seller}
          userData={chatUserData}
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
  active,
  setActive,
  handleNavigateToChat,
  setCurrentChat,
  online,
}) => {
  const [conversationUser, setConversationUser] = useState(null);

  useEffect(() => {
    const GetUser = async () => {
      const userId = data?.members?.find((id) => id !== seller._id);
      if (!userId) return;

      try {
        const res = await axios.get(`${server}/user/user-info/${userId}`);
        setConversationUser(res.data.user);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    };
    GetUser();
  }, [data?.members, seller?._id]);

  return (
    <div
      className={`w-full flex items-center p-3 gap-3 cursor-pointer border-b border-slate-200 ${
        active === index ? "bg-slate-100" : "bg-white"
      }`}
      onClick={() => {
        setActive(index);
        handleNavigateToChat(data?._id);
        setCurrentChat(data);
      }}
    >
      <div className="relative">
        <img
          src={conversationUser?.avatar?.url}
          alt="customerAvatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div
          className={`w-3 h-3 rounded-full absolute top-0 right-0.5 border border-white ${
            online ? "bg-green-500" : "bg-gray-400"
          }`}
        />
      </div>
      <div className="flex-1">
        <h1 className="text-[18px] font-medium">{conversationUser?.name}</h1>
        <p className="text-[15px] text-slate-600 truncate">
          <span className="font-semibold">
            {data?.lastMessageId !== conversationUser?._id
              ? "You: "
              : `${conversationUser?.name?.split(" ")[0]}: `}
          </span>
          <span>{data?.lastMessage || "No messages yet"}</span>
        </p>
      </div>
    </div>
  );
};

const ChatBox = ({
  closeChat,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  seller,
  userData,
  activeStatus,
}) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full p-3 flex items-center justify-between bg-blue-100 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <img
            src={userData?.avatar?.url}
            alt="CustomerImage"
            className="w-12 h-12 object-cover rounded-full"
          />
          <div>
            <h1 className="text-[18px] font-semibold">{userData?.name}</h1>
            <p className="text-[14px] text-slate-600">
              {activeStatus ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <div
          onClick={() => closeChat()}
          className="cursor-pointer p-2 hover:bg-slate-200 rounded-full"
        >
          <AiOutlineArrowRight size={22} />
        </div>
      </div>

      <div className="flex-1 p-4 bg-slate-100 overflow-y-auto">
        {messages?.length ? (
          messages.map((item, index) => {
            const isSeller = item.sender === seller._id;
            return (
              <div
                key={index}
                className={`flex gap-3 my-3 ${
                  isSeller ? "justify-end" : "justify-start"
                }`}
              >
                {!isSeller && (
                  <img
                    src={userData?.avatar?.url}
                    alt="customerImage"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                )}
                <div
                  className={`max-w-[75%] ${isSeller ? "text-right" : "text-left"}`}
                >
                  <div
                    className={`inline-block px-4 py-2 rounded-2xl shadow-sm ${
                      isSeller
                        ? "bg-blue-600 text-white"
                        : "bg-white text-slate-900"
                    }`}
                  >
                    <p>{item.text}</p>
                  </div>
                  <p className="text-[12px] text-slate-500 mt-1">
                    {format(item.createdAt)}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="mt-6 text-center text-slate-500">
            No messages yet. Start the conversation.
          </div>
        )}
      </div>

      <form
        onSubmit={sendMessageHandler}
        className="p-4 flex items-center gap-3 border-t border-slate-200 bg-white"
      >
        <button
          type="button"
          className="p-3 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200"
        >
          <TfiGallery size={16} />
        </button>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Enter your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className={`${styles.input} pr-14`}
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600"
          >
            <AiOutlineSend size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShopInbox;
