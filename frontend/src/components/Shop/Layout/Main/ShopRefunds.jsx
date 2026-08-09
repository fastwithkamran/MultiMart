import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Loader from "../../../Layout/Loader/Loader";
import { getAllShopOrders } from "../../../../redux/actions/order";
import { AiOutlineArrowRight } from "react-icons/ai";

function ShopRefunds() {
  const { seller } = useSelector((state) => state.seller);
  const { orders, isLoading } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!seller?._id) return;
    dispatch(getAllShopOrders(seller._id));
  }, [dispatch, seller?._id]);

  const refundOrders =
    orders && orders.filter((item) => item.status === "Processing refund" || item.status === "Refund approve" || item.status === "Refund reject");

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
          <Button to={`/order/${params.id}`} component={Link} variant="text">
            <AiOutlineArrowRight size={20} />
          </Button>
        );
      },
    },
  ];

  const row = [];

  refundOrders &&
    refundOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemQty: item.cart?.length,
        total: "US$" + item.totalPrice,
        status: item.status,
      });
    });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full pt-1 mt-2 sm:mt-6 lg:mt-10 bg-white overflow-hidden max-w-full rounded-md shadow-sm">
          <div className="w-full overflow-x-auto p-1">
            <DataGrid
              rows={row}
              columns={column}
              pageSize={10}
              disableRowSelectionOnClick
              autoHeight
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ShopRefunds;
