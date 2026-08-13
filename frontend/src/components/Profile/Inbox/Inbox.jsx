import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { format } from "timeago.js";
import socketIO from "socket.io-client";
import { toast } from "react-toastify";
import { server } from "../../../../server";
import axios from "axios";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import styles from "../../../styles/styles";

const Inbox = () => {
  const { user } = useSelector((state) => state.user);
  const [chatSellerData, setChatSellerData] = useState(null);
  const [onlineSellers, setOnlineSellers] = useState([]);

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef(null);
  const currentChatRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // connect to socket
  useEffect(() => {
    const EndPoint = import.meta.env.VITE_SOCKET_API;
    if (!EndPoint) return;

    socketRef.current = socketIO(EndPoint, { transports: ["websocket"] });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  // receiving new messages in real-time from socket
  useEffect(() => {
    socketRef.current?.on("getMessage", (data) => {
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

  // fetch selected chat seller data
  useEffect(() => {
    if (!currentChat?._id) return;

    const fetchChatSeller = async () => {
      const sellerId = currentChat.members.find((id) => id !== user._id);
      try {
        const res = await axios.get(`${server}/shop/get-shop-info/${sellerId}`);
        setChatSellerData(res.data.shop);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    };

    fetchChatSeller();
  }, [currentChat, user._id]);

  // create | sending message to customer
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    if (!newMessage.trim() || !currentChat?._id) return;

    const message = {
      sender: user._id,
      text: newMessage.trim(),
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (memberId) => memberId !== user._id,
    );

    socketRef.current?.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: message.text,
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
    socketRef.current?.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: user._id,
    });

    try {
      await axios.put(
        `${server}/conversation/update-last-message/${currentChat._id}`,
        {
          lastMessage: newMessage,
          lastMessageId: user._id,
        },
      );
      setNewMessage("");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // add user to the socket and get active users from socket
  useEffect(() => {
    if (user) {
      const userId = user._id;
      socketRef.current?.emit("addUser", userId);
      socketRef.current?.on("getUsers", (data) => {
        setOnlineSellers(data);
      });
    }
  }, [user]);

  const isOnline = (chat) => {
    const chatMembersId = chat.members.find((member) => member !== user._id);
    return onlineSellers.some(
      (socketUser) => socketUser.userId === chatMembersId,
    );
  };

  // get all user conversations
  useEffect(() => {
    const fetchConversations = async () => {
      await axios
        .get(
          `${server}/conversation/get-all-user-conversations/${user._id}`,
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
  }, [user._id]);

  const handleNavigateToChat = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };

  const closeChat = () => {
    setOpen(false);
    setCurrentChat(null);
    setMessages([]);
    setChatSellerData(null);
  };

  return (
    <div className="w-[90%] mx-auto my-4 h-[70vh] overflow-hidden rounded shadow-sm bg-white">
      {!open ? (
        <div className="h-full overflow-y-auto">
          <h1 className="text-center text-[30px] py-4 font-Poppins border-b border-slate-200">
            All Chats
          </h1>
          <div className="p-3 space-y-2">
            {conversations?.length ? (
              conversations.map((data, index) => (
                <ConversationLists
                  key={data._id || index}
                  data={data}
                  index={index}
                  user={user}
                  handleNavigateToChat={handleNavigateToChat}
                  setCurrentChat={setCurrentChat}
                  online={isOnline(data)}
                />
              ))
            ) : (
              <div className="text-center text-slate-500 py-10">
                No conversations found.
              </div>
            )}
          </div>
        </div>
      ) : (
        <ChatBox
          messagesContainerRef={messagesContainerRef}
          closeChat={closeChat}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          user={user}
          sellerData={chatSellerData}
          online={isOnline(currentChat)}
        />
      )}
    </div>
  );
};

const ConversationLists = ({
  index,
  data,
  user,
  handleNavigateToChat,
  setCurrentChat,
  online,
}) => {
  const [conversationSeller, setConversationSeller] = useState(null);

  useEffect(() => {
    const GetSeller = async () => {
      const sellerId = data?.members?.find((id) => id !== user._id);
      if (!sellerId) return;

      try {
        const res = await axios.get(`${server}/shop/get-shop-info/${sellerId}`);
        setConversationSeller(res.data.shop);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    };
    GetSeller();
  }, [data?.members, user?._id]);

  return (
    <div
      key={index}
      className={`w-full flex items-center gap-4 p-3 rounded-xl border transition-colors cursor-pointerbg-slate-100 border-slate-300`}
      onClick={() => {
        handleNavigateToChat(data?._id);
        setCurrentChat(data);
      }}
    >
      <div className="relative">
        <img
          src={conversationSeller?.avatar?.url}
          alt="customerAvatar"
          className="w-14 h-14 rounded-full object-cover"
        />
        <div
          className={`w-3 h-3 rounded-full absolute top-0 right-0 border border-white ${online ? "bg-green-500" : "bg-gray-400"}`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h1 className="text-[18px] font-semibold truncate">
          {conversationSeller?.name}
        </h1>
        <p className="text-[14px] text-slate-600 truncate">
          <span className="font-medium text-slate-900">
            {data?.lastMessageId !== conversationSeller?._id
              ? "You: "
              : `${conversationSeller?.name?.split(" ")[0]}: `}
          </span>
          <span>{data?.lastMessage || "No messages yet"}</span>
        </p>
      </div>
    </div>
  );
};

const ChatBox = ({
  messagesContainerRef,
  closeChat,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  user,
  sellerData,
  online,
}) => {
  useEffect(() => {
    if (!messagesContainerRef.current) return;
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  }, [messages, messagesContainerRef]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full p-4 flex items-center justify-between bg-blue-100 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <img
            src={sellerData?.avatar?.url}
            alt="CustomerImage"
            className="w-14 h-14 object-cover rounded-full"
          />
          <div>
            <h1 className="text-[18px] font-semibold">{sellerData?.name}</h1>
            <p className="text-[14px] text-slate-600">
              {online ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <button
          onClick={closeChat}
          className="rounded-full p-2 hover:bg-slate-200"
          type="button"
        >
          <AiOutlineArrowRight size={22} />
        </button>
      </div>

      <div
        ref={messagesContainerRef}
        className="flex-1 p-4 bg-slate-100 overflow-y-auto"
      >
        {messages?.length ? (
          messages.map((item, index) => {
            const isUser = item.sender === user._id;
            return (
              <div
                key={index}
                className={`flex gap-3 my-3 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <img
                    src={sellerData?.avatar?.url}
                    alt="customerImage"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                )}
                <div
                  className={`max-w-[75%] ${isUser ? "text-right" : "text-left"}`}
                >
                  <div
                    className={`inline-block px-4 py-2 rounded-2xl shadow-sm ${
                      isUser
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
          <div className="mt-10 text-center text-slate-500">
            No messages yet. Send the first one.
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

export default Inbox;
