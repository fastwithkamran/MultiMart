import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../../../redux/actions/product";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Loader from "../../../Layout/Loader/Loader";

function ShopAllProducts() {
  const { seller } = useSelector((state) => state.seller);
  const { products, isLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!seller?._id) return;
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller?._id]);

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
        const d = params.row.name;
        const product_name = d.replace(/\s+/g, "-");
        return (
          <>
            <Link to={`/product/${product_name}`}>
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
        const d = params.row.name;
        const product_name = d.replace(/\s+/g, "-");
        return (
          <>
            <Link to={`/product/${product_name}`}>
              <Button>
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
        sold: 10,
      });
    });
  return (
    <>
      {" "}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableRowSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
}

export default ShopAllProducts;
