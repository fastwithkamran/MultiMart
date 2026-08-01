import {
  DashboardHeader,
  DashboardSideBar,
  ShopAllProducts,
} from "../../components";

function ShopAllProductsPage() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="md:w-80 w-20">
          <DashboardSideBar active={3} />
        </div>
        <div className="w-full justify-center flex">
          <ShopAllProducts />
        </div>
      </div>
    </div>
  );
}

export default ShopAllProductsPage;
