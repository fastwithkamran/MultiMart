import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProductsShop,
} from "../../../../redux/actions/product";
import { resetSuccess, clearErrors } from "../../../../redux/reducers/product";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Loader from "../../../Layout/Loader/Loader";
import { toast } from "react-toastify";
import styles from "../../../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../../../../server";

function ShopAllCoupons() {
  const { seller } = useSelector((state) => state.seller);
  const { products, isLoading, message, error, success } = useSelector(
    (state) => state.product,
  );
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState(null);
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/couponCode/create-coupon-code`,
        {
          name,
          minAmount,
          maxAmount,
          value,
          shop: seller,
          selectedProducts,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success(message);
      dispatch(resetSuccess());
      dispatch(getAllProductsShop(seller._id));
    }
  }, [error, success, dispatch, message, seller._id]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteProduct(id));
  };

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
        sold: 10,
      });
    });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full pt-1 mt-2 sm:mt-6 lg:mt-10 bg-white overflow-hidden max-w-full rounded-md shadow-sm">
          <div className="p-3" onClick={() => setOpen(true)}>
            <div className={`${styles.button}`}>
              <span className="text-white">Create Coupon Code</span>
            </div>
          </div>
          <div className="w-full overflow-x-auto p-1">
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={10}
              disableRowSelectionOnClick
              autoHeight
            />
            {open && (
              <div className="fixed top-0 left-0 w-full h-screen bg-black/40 z-2000 flex items-center justify-center">
                <div className="p-3 w-[90%] md:w-[40%] h-[80vh] bg-white rounded-md shadow">
                  <div className="w-full flex justify-end">
                    <RxCross1
                      size={30}
                      className="cursor-pointer"
                      onClick={() => setOpen(false)}
                    />
                  </div>
                  <h5 className="text-[30px] font-Poppins text-center">
                    Create Coupon Code
                  </h5>
                  {/* Create Coupon Code */}
                  <form onSubmit={handleSubmit} aria-required={true}>
                    {/* Name */}
                    <br />
                    <div>
                      <label className="pb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="bg-slate-200 appearance-none mt-2 block w-full h-7 border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm px-3"
                        type="text"
                        required
                        placeholder="Enter your coupon Code name..."
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    {/* Discount Percentage */}
                    <br />
                    <div>
                      <label className="pb-2">
                        Discount Percentage
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="bg-slate-200 appearance-none mt-2 block w-full h-7 border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm px-3"
                        type="number"
                        placeholder="Enter your coupon discount percentage..."
                        name="price"
                        required
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                      />
                    </div>

                    {/* Max amount */}
                    <br />
                    <div>
                      <label className="pb-2">Maximum Amount</label>
                      <input
                        className="bg-slate-200 appearance-none mt-2 block w-full h-7 border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm px-3"
                        type="number"
                        placeholder="Enter maximum purchase amount to apply..."
                        name="price"
                        value={maxAmount}
                        onChange={(e) => setMaxAmount(e.target.value)}
                      />
                    </div>

                    {/* Min Amount */}
                    <br />
                    <div>
                      <label className="pb-2">Minimum Amount</label>
                      <input
                        className="bg-slate-200 appearance-none mt-2 block w-full h-7 border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm px-3"
                        type="number"
                        placeholder="Enter minimum purchase amount to apply..."
                        name="price"
                        value={minAmount}
                        onChange={(e) => setMinAmount(e.target.value)}
                      />
                    </div>

                    {/* Selected Products */}
                    <br />
                    <div>
                      <label className="pb-2">
                        Selected Products
                      </label>
                      <select
                        className="w-full mt-2 border h-8 rounded-sm"
                        value={selectedProducts}
                        onChange={(e) => setSelectedProducts(e.target.value)}
                      >
                        <option value="Select Products to Apply Coupon">
                          Select Products to Apply Coupon
                        </option>
                        {products &&
                          products.map((i) => (
                            <option value={i.name} key={i.name}>
                              {i.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    {/* Button */}
                    <br />
                    <div>
                      <input
                        className="bg-slate-200 appearance-none mt-2 block w-full h-7 border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm px-3"
                        type="submit"
                        value="Create"
                      />
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ShopAllCoupons;
