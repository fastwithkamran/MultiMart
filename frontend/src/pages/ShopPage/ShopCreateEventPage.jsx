import {
  DashboardHeader,
  DashboardSideBar,
  ShopCreateEvent,
} from "../../components";

function ShopCreateEventPage() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="md:w-80 w-20">
          <DashboardSideBar active={6} />
        </div>
        <div className="w-full justify-center flex">
          <ShopCreateEvent />
        </div>
      </div>
    </div>
  );
}

export default ShopCreateEventPage;
