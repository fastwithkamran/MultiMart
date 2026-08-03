import { ShopInfo, ShopProfileData } from "../../components";

const ShopPreviewPage = () => {
  return (
    <div className="w-full bg-white">
      <div className="w-full flex py-10 justify-between">
        <div className="w-[25%] bg-white rounded-sm shadow-sm overflow-y-auto h-[90vh] sticky top-10 left-0 z-10">
          <ShopInfo isOwner={false} />
        </div>
        <div className="w-[72%] rounded-sm">
          <ShopProfileData isOwner={false} />
        </div>
      </div>
    </div>
  );
};

export default ShopPreviewPage;
