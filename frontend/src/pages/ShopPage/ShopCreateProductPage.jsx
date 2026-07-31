import {
  DashboardHeader,
  DashboardSideBar,
  ShopCreateProduct,
} from "../../components";

function ShopCreateProductPage() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="md:w-80 w-20">
          <DashboardSideBar active={4} />
        </div>
        <div className="w-full justify-center flex">
          <ShopCreateProduct />
        </div>
      </div>
    </div>
  );
}

export default ShopCreateProductPage;
