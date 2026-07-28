import { AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { MdOutlineTrackChanges } from "react-icons/md";

function ProfileContent({ active }) {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [ZipCode, setZipCode] = useState(null);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full">
      {/* Profile */}
      {active === 1 && (
        <>
          {isAuthenticated && (
            <div className="flex justify-center w-full">
              <div className="relative">
                <img
                  alt="Image"
                  src={`${user.avatar.url}`}
                  className="w-30 h-30 rounded-full object-cover border-[3px] border-green-400"
                />
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center cursor-pointer absolute bottom-1.5 right-1.5">
                  <AiOutlineCamera />
                </div>
              </div>
            </div>
          )}
          <div>
            <form
              className="w-full px-5 mt-8"
              onSubmit={handleSubmit}
              aria-required={true}
            >
              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} w-[95%]!`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="email"
                    className={`${styles.input} w-[95%]!`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} w-[95%]!`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Zip Code</label>
                  <input
                    type="number"
                    className={`${styles.input} w-[95%]!`}
                    required
                    value={ZipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Address 1</label>
                  <input
                    type="text"
                    className={`${styles.input} w-[95%]!`}
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Address 2</label>
                  <input
                    type="text"
                    className={`${styles.input} w-[95%]!`}
                    required
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
              </div>
              <input
                type="submit"
                required
                value="Update"
                className="w-64 h-8 border border-blue-800 text-center text-blue-700 rounded-sm mt-8 cursor-pointer"
              />
            </form>
          </div>
        </>
      )}

      {/* Order Page */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* Refund */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* Track Order */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/* Payment Method */}
      {active === 6 && (
        <div>
          <PaymentMethod />
        </div>
      )}

      {/* Address */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
}

const AllOrders = () => {
  const orders = [
    {
      _id: "34234234",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

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

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemQty: item.orderItems.length,
        total: "US$" + item.totalPrice,
        status: item.orderStatus,
      });
    });
  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={column}
        pageSize={10}
        disableRowSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const orders = [
    {
      _id: "34234234",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

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

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemQty: item.orderItems.length,
        total: "US$" + item.totalPrice,
        status: item.orderStatus,
      });
    });
  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={column}
        pageSize={10}
        autoHeight
        disableRowSelectionOnClick
      ></DataGrid>
    </div>
  );
};

const TrackOrder = () => {
  const orders = [
    {
      _id: "34234234",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const column = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

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
            <MdOutlineTrackChanges size={20} />
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
        itemQty: item.orderItems.length,
        total: "US$" + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={column}
        pageSize={10}
        autoHeight
        disableRowSelectionOnClick
      ></DataGrid>
    </div>
  );
};

const PaymentMethod = () => {
  return (
    <div className="w-full px-5">
      <div className="flex flex-col md:flex-row w-full items-center justify-between">
        <h1 className="text-[18px] sm:text-[25px] font-medium text-black/63 ">
          Payment Methods
        </h1>
        <div className={`${styles.button} rounded-md! p-3`}>
          <span className="text-white">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white flex flex-col md:flex-row items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV07yhKXZ1S8pQJ984d281j6woJ0cE8UBN0077uuZaXQ&s=10"
            alt="PaymentCards"
            className="object-cover w-8 h-4"
          />
          <h5 className="pl-5 font-semibold">Kamran Ayaz</h5>
        </div>
        <div className="pl-8 flex items-center mt-6 md:mt-0">
          <h6>*****34234324**</h6>
          <h5 className="pl-6">08/2026</h5>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8 mt-6 md:mt-0">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

const Address = () => {
  return (
    <div className="w-full px-5">
      <div className="flex flex-col md:flex-row w-full items-center justify-between">
        <h1 className="text-[18px] sm:text-[25px] font-medium text-black/63 ">
          My Addresses
        </h1>
        <div className={`${styles.button} rounded-md! p-3`}>
          <span className="text-white">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-16 flex flex-col md:flex-row items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <h5 className="pl-5 font-semibold">Default</h5>
        </div>
        <div className="pl-8 flex items-center mt-6 md:mt-0">
          <h6>Marston Road, Saddar, Karachi</h6>
        </div>
        <div className="pl-8 flex items-center mt-6 md:mt-0">
          <h6>+92 3213456132</h6>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8 mt-6 md:mt-0">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
