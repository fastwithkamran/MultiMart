import {
  DashboardHeader,
  DashboardSideBar,
  ShopAllOrders,
} from "../../components";

function ShopAllOrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="flex w-full">
        <div className="w-20 sm:w-24 md:w-72 lg:w-80 shrink-0">
          <DashboardSideBar active={2} />
        </div>
        <div className="flex-1 min-w-0 px-2 sm:px-4 lg:px-6 py-2 sm:py-4">
          <div className="w-full max-w-full">
            <ShopAllOrders />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopAllOrdersPage;
