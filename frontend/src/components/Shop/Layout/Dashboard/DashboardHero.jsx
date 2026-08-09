import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../../../styles/styles";
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
    <div className="w-full p-8">
      <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>

      <div className="w-full block md:flex items-center justify-between">
        <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="grid grid-rows-2">
            <div className="flex items-center">
              <AiOutlineMoneyCollect
                size={30}
                className="mr-2"
                fill="#00000085"
              />
              <h3
                className={`${styles.productTitle} text-[18px]! leading-5 font-400 text-black/60`}
              >
                Account Balance
                <div className="text-[12px]"> (with 10% service charge)</div>
              </h3>
            </div>
            <div>
              <h5 className="pt-2 pl-9 text-[22px] font-medium">
                ${availableBalance.toFixed(2)}
              </h5>
              <Link to="/dashboard-withdraw-money">
                <h5 className="pt-4 pl-2 text-[#077f9c]">Withdraw Money</h5>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="grid grid-rows-2">
            <div className="flex items-center">
              <MdBorderClear size={30} className="mr-2" fill="#00000085" />
              <h3
                className={`${styles.productTitle} text-[18px]! leading-5 font-400 text-black/60`}
              >
                All Orders
              </h3>
            </div>
            <div>
              <h5 className="pt-2 pl-9 text-[22px] font-medium">
                {orders && orders.length}
              </h5>
              <Link to="/dashboard-orders">
                <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="grid grid-rows-2">
            <div className="flex items-center">
              <FiPackage size={30} className="mr-2" fill="#00000085" />
              <h3
                className={`${styles.productTitle} text-[18px]! leading-5 font-400 text-black/60`}
              >
                All Products
              </h3>
            </div>
            <div>
              <h5 className="pt-2 pl-9 text-[22px] font-medium">
                {products && products.length}
              </h5>
              <Link to="/dashboard-products">
                <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
              </Link>
            </div>
          </div>
        </div>

        <br />
      </div>

      <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
      <div className="w-full min-h-[45vh] bg-white rounded p-1">
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
