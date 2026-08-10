const ShopInbox = () => {
  return (
    <div className="w-[90%] bg-white m-4 h-[85vh] overflow-y-auto rounded">
      <h1 className="text-center text-[30px] py-3 font-Poppins">
        All Messages
      </h1>

      {/* All messages list */}
      <div className="w-full flex p-2 px-3 bg-slate-200 cursor-pointer">
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
          <p className="text-[16px] text-black">You: Yeah I am trying hard</p>
        </div>
      </div>
    </div>
  );
};

export default ShopInbox;
