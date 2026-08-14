import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProducts,
  getAllProductsShop,
} from "../../../../redux/actions/product";
import { resetSuccess, clearErrors } from "../../../../redux/reducers/product";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Loader from "../../../Layout/Loader/Loader";
import { toast } from "react-toastify";

function ShopAllProducts() {
  const { seller } = useSelector((state) => state.seller);
  const { products, isLoading, message, error, success } = useSelector(
    (state) => state.product,
  );
  const dispatch = useDispatch();
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    let timerId;

    if (error) {
      toast.error(error.response?.data?.message || error.message);
      timerId = setTimeout(() => {
        dispatch(clearErrors());
      }, 10000);
    }
    if (success) {
      toast.success(message);
      dispatch(resetSuccess());
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [error, success, dispatch, message, seller._id]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    setIsDelete(true);
    dispatch(deleteProduct(id)).then(() => setIsDelete(false));
  };

  useEffect(() => {
    if (!seller?._id) return;
    if (!isDelete) {
      dispatch(getAllProductsShop(seller._id));
      dispatch(getAllProducts());
    }
  }, [dispatch, seller?._id, isDelete]);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 80,
      type: "number",
      flex: 0.5,
    },
    {
      field: "sold",
      headerName: "Sold out",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "preview",
      headerName: "",
      minWidth: 100,
      flex: 0.8,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const id = params.row.id;
        return (
          <>
            <Link to={`/product/${id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "delete",
      headerName: "",
      minWidth: 100,
      flex: 0.8,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const id = params.row.id;
        return (
          <>
            <Link to={`/product/${id}`}>
              <Button onClick={(e) => handleDelete(e, params.id)}>
                <AiOutlineDelete size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$" + item.discountPrice,
        stock: item.stock,
        sold: item.sold_out,
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
              columns={columns}
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

export default ShopAllProducts;
