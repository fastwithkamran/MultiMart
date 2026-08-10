import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getAllShopOrders } from "../../../../redux/actions/order";
import { getAllProductsShop } from "../../../../redux/actions/product";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllShopOrders(seller._id));
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller._id]);

  const deliveredOrders =
    orders && orders.filter((item) => item.status === "Delivered");

  const totalEarningsWithoutTax =
    deliveredOrders &&
    deliveredOrders.reduce((sum, item) => sum + item.totalPrice, 0);

  const serviceCharge = totalEarningsWithoutTax * 0.1;

  const availableBalance = totalEarningsWithoutTax - serviceCharge;

  const column = [
    {
      field: "id",
      headerName: "Order Id",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemQty",
      headerName: "Items Qty",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total Price",
      minWidth: 150,
      flex: 0.7,
      sortable: false,
    },
    {
      field: " ",
      headerName: "",
      minWidth: 150,
      flex: 1,
      align: "right",
      renderCell: (params) => {
        return (
          <Button
            to={`/dashboard/order/${params.id}`}
            component={Link}
            variant="text"
          >
            <AiOutlineArrowRight size={20} />
          </Button>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemQty: item.cart?.length,
        total: "US$" + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      <h3 className="pb-4 text-[22px] font-Poppins">Overview</h3>

      <div className="mb-8 grid gap-4 lg:grid-cols-3">
        <div className="min-h-[20vh] rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-start">
              <AiOutlineMoneyCollect
                size={30}
                className="mr-3 shrink-0"
                fill="#00000085"
              />
              <div>
                <h3 className="text-[18px] font-400 leading-5 text-black/70">
                  Account Balance
                </h3>
                <div className="mt-1 text-[12px] text-slate-500">
                  (with 10% service charge)
                </div>
              </div>
            </div>
            <div>
              <h5 className="pt-4 pl-9 text-[22px] font-medium">
                ${availableBalance.toFixed(2)}
              </h5>
              <Link to="/dashboard-withdraw-money" className="mt-4 inline-block pl-2 text-[#077f9c]">
                Withdraw Money
              </Link>
            </div>
          </div>
        </div>

        <div className="min-h-[20vh] rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-start">
              <MdBorderClear size={30} className="mr-3 shrink-0" fill="#00000085" />
              <h3 className="text-[18px] font-400 leading-5 text-black/70">
                All Orders
              </h3>
            </div>
            <div>
              <h5 className="pt-4 pl-9 text-[22px] font-medium">
                {orders && orders.length}
              </h5>
              <Link to="/dashboard-orders" className="mt-4 inline-block pl-2 text-[#077f9c]">
                View Orders
              </Link>
            </div>
          </div>
        </div>

        <div className="min-h-[20vh] rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-start">
              <FiPackage size={30} className="mr-3 shrink-0" fill="#00000085" />
              <h3 className="text-[18px] font-400 leading-5 text-black/70">
                All Products
              </h3>
            </div>
            <div>
              <h5 className="pt-4 pl-9 text-[22px] font-medium">
                {products && products.length}
              </h5>
              <Link to="/dashboard-products" className="mt-4 inline-block pl-2 text-[#077f9c]">
                View Products
              </Link>
            </div>
          </div>
        </div>
      </div>

      <h3 className="pb-4 text-[22px] font-Poppins">Latest Orders</h3>
      <div className="min-h-[40vh] overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
        <DataGrid
          rows={row}
          columns={column}
          pageSize={10}
          disableRowSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
};

export default DashboardHero;
