import DashboardHeader from "../../components/Shop/Layout/Dashboard/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/Dashboard/DashboardSideBar";

function ShopDashboardPage() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="md:w-80 w-20">
          <DashboardSideBar active={1} />
        </div>
      </div>
    </div>
  );
}

export default ShopDashboardPage;
