import {
  DashboardHeader,
  DashboardSideBar,
  ShopWithdrawMoney,
} from "../../components";

function ShopWithdrawMoneyPage() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="md:w-80 w-20">
          <DashboardSideBar active={7} />
        </div>
        <div className="w-full justify-center flex">
          <ShopWithdrawMoney />
        </div>
      </div>
    </div>
  );
}

export default ShopWithdrawMoneyPage;
