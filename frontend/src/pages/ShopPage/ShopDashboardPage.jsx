import { DashboardHeader, DashboardSideBar, DashboardHero } from "../../components";

function ShopDashboardPage() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="md:w-80 w-20">
          <DashboardSideBar active={1} />
        </div>
        <DashboardHero />
      </div>
    </div>
  );
}

export default ShopDashboardPage;
