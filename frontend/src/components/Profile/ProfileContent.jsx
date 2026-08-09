import { AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { MdTrackChanges } from "react-icons/md";
import {
  deleteUserAddress,
  updateUserAddress,
  updateUserInformation,
} from "../../redux/actions/user";
import { toast } from "react-toastify";
import { server } from "../../../server";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { City, Country, State } from "country-state-city";
import {
  clearAddAddressErrors,
  clearUpdateProfileErrors,
  resetUpdateProfileSuccess,
  resetAddAddressSuccess,
  clearDeleteAddressErrors,
  resetDeleteAddressSuccess,
} from "../../redux/reducers/user";
import { getAllUserOrders } from "../../redux/actions/order";

function ProfileContent({ active, setActive }) {
  const {
    isAuthenticated,
    user,
    updateProfileError,
    addAddressError,
    deleteAddressError,
    updateProfileSuccess,
    addAddressSuccess,
    deleteAddressSuccess,
  } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (updateProfileError) {
      toast.error(updateProfileError);
      dispatch(clearUpdateProfileErrors());
    }
    if (updateProfileSuccess) {
      toast.success("Profile Updated");
      dispatch(resetUpdateProfileSuccess());
    }
    if (addAddressError) {
      toast.error(addAddressError);
      dispatch(clearAddAddressErrors());
      setActive(7);
    }
    if (addAddressSuccess) {
      setActive(7);
      toast.success("Addresses Updated");
      dispatch(resetAddAddressSuccess());
    }
    if (deleteAddressError) {
      setActive(7);
      toast.success(deleteAddressError);
      dispatch(clearDeleteAddressErrors());
    }
    if (deleteAddressSuccess) {
      setActive(7);
      toast.success("Addresses Updated");
      dispatch(resetDeleteAddressSuccess());
    }
  }, [
    addAddressError,
    updateProfileError,
    deleteAddressError,
    updateProfileSuccess,
    addAddressSuccess,
    deleteAddressSuccess,
    dispatch,
    setActive,
  ]);

  const handleImageChange = async (e) => {
    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/user/update-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then(() => window.location.reload())
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  return (
    <div className="w-full min-w-0 max-w-full">
      {/* Profile */}
      {active === 1 && (
        <>
          {isAuthenticated && (
            <div className="flex justify-center w-full">
              <div className="relative">
                <img
                  alt="Image"
                  src={user && user.avatar.url}
                  className="w-30 h-30 rounded-full object-cover border-[3px] border-green-400"
                />
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center cursor-pointer absolute bottom-1.5 right-1.5">
                  <input
                    type="file"
                    id="image"
                    className="hidden"
                    onChange={(e) => handleImageChange(e)}
                  />
                  <label htmlFor="image">
                    <AiOutlineCamera />
                  </label>
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
              <div className="w-full flex md:flex-row flex-col pb-3">
                <div className="w-full md:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} w-[95%]!`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <div className={`bg-gray-400 ${styles.input} w-[95%]!`}>
                    {email}
                  </div>
                </div>
              </div>

              <div className="w-full flex pb-3 md:flex-row flex-col">
                <div className="w-full md:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} w-[95%]!`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="w-full md:w-[50%]">
                  <label className="block pb-2">
                    Enter your Original Password
                  </label>
                  <input
                    type="password"
                    className={`${styles.input} w-[95%]!`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

      {/* Change Password */}
      {active === 6 && (
        <div>
          <ChangePassword />
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
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserOrders(user._id));
  }, [dispatch, user._id]);

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
            to={`/user/order/${params.id}`}
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
    <div className="pl-8 pt-1 overflow-hidden w-full max-w-full">
      <div className="w-full overflow-x-auto">
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

const AllRefundOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserOrders(user._id));
  }, [dispatch, user._id]);

  const eligibleOrders =
    orders &&
    orders.filter(
      (item) =>
        item.status === "Processing refund" ||
        item.status === "Refund approve" ||
        item.status === "Refund reject",
    );

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
            to={`/user/order/${params.id}`}
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

  eligibleOrders &&
    eligibleOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemQty: item.cart?.length,
        total: "US$" + item.totalPrice,
        status: item.status,
      });
    });
  return (
    <div className="pl-8 pt-1 overflow-hidden w-full max-w-full">
      <div className="w-full overflow-x-auto">
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

const TrackOrder = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserOrders(user._id));
  }, [dispatch, user._id]);

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
            to={`/user/track-order/${params.id}`}
            component={Link}
            variant="text"
          >
            <MdTrackChanges size={20} />
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
    <div className="pl-8 pt-1 overflow-hidden w-full max-w-full">
      <div className="w-full overflow-x-auto">
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

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword)
      toast.error("Confirm password does not match!!");

    await axios
      .put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true },
      )
      .then(() => toast.success("Password Updated"))
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full px-5">
      <h1 className="text-[18px] sm:text-[25px] font-medium text-black/63 ">
        Change Password
      </h1>
      <div className="w-full mt-10">
        <form
          aria-required
          onSubmit={handleChangePassword}
          className="flex flex-col items-center"
        >
          <div className="w-full md:w-[50%]">
            <label className="block pb-2">Enter your old password</label>
            <input
              type="password"
              className={`${styles.input} w-[95%]!`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <label className="block mt-4 pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} w-[95%]!`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label className="block mt-4 pb-2">Confirm your new password</label>
            <input
              type="password"
              className={`${styles.input} w-[95%]!`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              type="submit"
              required
              value="Update"
              className="w-[95%]! h-8 border border-blue-800 text-center text-blue-700 rounded-sm mt-8 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address, setAddress] = useState("");
  const [addressType, setAddressType] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      addressType === "" ||
      country === "" ||
      city === "" ||
      state === "" ||
      zipCode === "" ||
      address === ""
    ) {
      toast.error("Please fill all the fields");
    } else {
      dispatch(
        updateUserAddress(country, state, city, address, zipCode, addressType),
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setState("");
      setAddress("");
      setAddressType("");
      setZipCode("");
    }
  };

  const handleDeleteAddress = async (item) => {
    dispatch(deleteUserAddress(item._id));
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="flex fixed w-full h-screen bg-black/40 top-0 left-0 items-center justify-center">
          <div className="w-[90%] md:w-[50%] h-[80vh] bg-white rounded shadow relative overflow-y-auto">
            <div className="w-full flex justify-end p-2">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-[25px] font-Poppins text-center ">
              Add New Addresses
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  {/* Choose country */}
                  <div className="w-full pb-2">
                    <label className="block pb-2">Country</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-[95%] border border-sm h-8"
                    >
                      <option value="" className="block pb-2">
                        Choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Choose state */}
                  <div className="w-full pb-2">
                    <label className="block pb-2">State</label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-[95%] border border-sm h-8"
                    >
                      <option value="" className="block pb-2">
                        Choose your state
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Choose city */}
                  <div className="w-full pb-2">
                    <label className="block pb-2">City</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-[95%] border border-sm h-8"
                    >
                      <option value="" className="block pb-2">
                        Choose your city
                      </option>
                      {City &&
                        City.getCitiesOfState(country, state).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Address */}
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address</label>
                    <input
                      type="text"
                      required
                      className={`${styles.input}`}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  {/* Zip Code */}
                  <div className="w-full pb-2">
                    <label className="block pb-2">ZipCode</label>
                    <input
                      type="number"
                      required
                      className={`${styles.input}`}
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>

                  {/* Address Type */}
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address Type</label>
                    <select
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-[95%] border border-sm h-8"
                    >
                      <option value="" className="block pb-2">
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Submit button */}
                  <div className="w-full pb-2">
                    <input
                      type="submit"
                      className={`${styles.input} mt-5 cursor-pointer`}
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row w-full items-center justify-between">
        <h1 className="text-[18px] sm:text-[25px] font-medium text-black/63 ">
          My Addresses
        </h1>
        <div
          className={`${styles.button} rounded-md! p-3`}
          onClick={() => setOpen(true)}
        >
          <span className="text-white">Add New</span>
        </div>
      </div>
      <br />
      {user &&
        user.addresses.map((item, index) => (
          <div
            key={index}
            className="w-full bg-white flex flex-col md:flex-row items-center p-3 mt-5 shadow justify-between "
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-semibold">{item.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center mt-6 md:mt-0">
              <h6>{item.address}</h6>
            </div>
            <div className="pl-8 flex items-center mt-6 md:mt-0">
              <h6>{user && user.phoneNumber}</h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8 mt-6 md:mt-0">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDeleteAddress(item)}
              />
            </div>
          </div>
        ))}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-5 text-[18px]">
          You not have any saved address!
        </h5>
      )}
    </div>
  );
};

export default ProfileContent;
