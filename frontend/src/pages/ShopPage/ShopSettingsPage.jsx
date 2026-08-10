import {
  DashboardHeader,
  DashboardSideBar,
  ShopSettings,
} from "../../components";

function ShopSettingsPage() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="md:w-80 w-20">
          <div className="fixed">
            <DashboardSideBar active={11} />
          </div>
        </div>
        <ShopSettings />
      </div>
    </div>
  );
}

export default ShopSettingsPage;
