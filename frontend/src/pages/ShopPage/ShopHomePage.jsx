import { ShopInfo, ShopProfileData } from "../../components";

const ShopHomePage = () => {
  return (
    <div className="w-full bg-[#f5f5f5] h-screen p-5">
      <div className="w-full flex justify-between">
        <div className="w-[25%] bg-white rounded-sm shadow-sm overflow-y-auto h-[90vh] sticky top-2 left-0 z-10">
          <ShopInfo isOwner={true} />
        </div>
        <div className="w-[72%] rounded-sm">
          <ShopProfileData isOwner={true} />
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;
