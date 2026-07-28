import { useState } from "react";
import styles from "../../styles/styles.js";
import { Link } from "react-router";
import { categoriesData, productData } from "../../static/data.jsx";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar.jsx";
import { useSelector } from "react-redux";
import Cart from "./Cart.jsx";
import WishList from "./WishList.jsx";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activePage }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState("");
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts = productData.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase()),
    );

    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else setActive(false);
  });

  return (
    <>
      {/* Large Screen Header */}
      <div className="w-full hidden md:block">
        {/* Header */}
        <div className="h-fit flex items-center justify-between bg-slate-100 px-3">
          <div>
            <Link to="/">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5oWZDONBetL_aTOElWb_x6ECh9FPrnJr4vEAkyedUGQ&s=10"
                alt="Logo"
                className="m-1 h-15 w-30 object-cover mix-blend-multiply"
              />
            </Link>
          </div>
          {/* Search Box */}
          <div
            className="w-[50%] relative"
            onClick={() => setOpenSearch(!openSearch)}
          >
            <input
              type="text"
              placeholder="Search Product"
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-10 w-full px-2 border-blue-600 border-2 rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {openSearch && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-9 p-4">
                {searchData &&
                  searchData.map((product) => {
                    const name = product.name;

                    const ProductName = name.replace(/\s+/g, "-");
                    return (
                      <Link to={`/product/${ProductName}`}>
                        <div className="w-full flex items-start py-3">
                          <img
                            src={product.image_Url[0].url}
                            alt="Product image"
                            className="w-10 h-10 mr-2.5"
                          />
                          <h1>{product.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          {/* Seller Button */}
          <div className={`${styles.button}`}>
            <Link to={"/seller"}>
              <h1 className="text-amber-50 flex items-center p-3">
                Become Seller <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>

        {/* Navbar */}
        <div
          className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null} transition hidden md:flex items-center justify-between w-full bg-blue-700 h-16`}
        >
          {/* All Categories */}
          <div className="relative h-14 mt-2.5 w-64 ml-5 cursor-pointer">
            <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
            <button
              className={`h-full w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-medium select-none rounded-t-md`}
              onClick={() => setDropDown(!dropDown)}
            >
              All Categories
            </button>
            <IoIosArrowDown
              size={20}
              className="absolute right-2 top-5"
              onClick={() => setDropDown(!dropDown)}
            />

            {dropDown && (
              <DropDown
                categoriesData={categoriesData}
                setDropDown={setDropDown}
              />
            )}
          </div>

          {/* navItems */}
          <div className={`${styles.normalFlex}`}>
            <Navbar active={activePage} />
          </div>

          {/* icons */}
          <div className="flex">
            {/* heart icon for favourites */}
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-3.5"
                onClick={() => setOpenWishList(true)}
              >
                <AiOutlineHeart size={30} className="text-amber-50" />
                <span className="absolute right-0 top-0 rounded-full bg-green-400 w-4 h-4 p-0 m-0 text-white font-mono text-sm text-center leading-tight">
                  0
                </span>
              </div>
            </div>

            {/* shopping cart icon */}
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-3.5"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart size={30} className="text-amber-50" />
                <span className="absolute right-0 top-0 rounded-full bg-green-400 w-4 h-4 p-0 m-0 text-white font-mono text-sm text-center leading-tight">
                  1
                </span>
              </div>
            </div>

            {/* profile icon */}
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-3.5">
                {isAuthenticated ? (
                  <Link to={"/profile"}>
                    <img
                      alt="Image"
                      src={`${user.avatar.url}`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </Link>
                ) : (
                  <Link to={"/login"}>
                    <CgProfile size={30} className="text-amber-50" />
                  </Link>
                )}
              </div>
            </div>

            {/* Cart Popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* WishList Popup */}
            {openWishList ? (
              <WishList setOpenWishList={setOpenWishList} />
            ) : null}
          </div>
        </div>
      </div>

      {/* Mobile Screen Header */}
      <div
        className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null} transition items-center justify-between h-16
         w-full bg-white z-50 top-0 left-0 shadow-sm md:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to={"/"}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5oWZDONBetL_aTOElWb_x6ECh9FPrnJr4vEAkyedUGQ&s=10"
                alt="Logo"
                className="m-1 h-15 w-30 object-cover mix-blend-multiply"
              />
            </Link>
          </div>
          <div>
            <div className="relative mr-5">
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-green-400 w-4 h-4 p-0 m-0 text-white font-mono text-sm text-center leading-tight">
                1
              </span>
            </div>
          </div>
        </div>

        {/* Header sidebar */}
        <div>
          {open && (
            <div className="fixed w-full bg-black/60 z-20 h-full top-0 left-0">
              <div className="w-[60%] fixed bg-white h-screen top-0 left-0 z-10 overflow-y-scroll">
                <div className="w-full justify-between flex pr-3">
                  <div className="relative mr-4">
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 mt-5 rounded-full bg-green-400 w-4 h-4 p-0 m-0 text-white font-mono text-sm text-center leading-tight">
                      0
                    </span>
                  </div>
                  <RxCross1
                    size={30}
                    className="ml-4 mt-5"
                    onClick={() => setOpen(false)}
                  />
                </div>

                {/* Search Box */}
                <div className="my-8 w-[92%] m-auto h-8">
                  <div
                    className="relative"
                    onClick={() => setOpenSearch(!openSearch)}
                  >
                    <input
                      type="text"
                      placeholder="Search Product"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="h-10 w-full px-2 border-blue-600 border-2 rounded-md"
                    />
                    <AiOutlineSearch
                      size={30}
                      className="absolute right-2 top-1.5 cursor-pointer "
                    />
                    {openSearch && searchData.length !== 0 ? (
                      <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-9 p-4">
                        {searchData &&
                          searchData.map((product) => {
                            const name = product.name;
                            const ProductName = name.replace(/\s+/g, "-");
                            return (
                              <Link
                                to={`/product/${ProductName}`}
                                onClick={() => setOpen(false)}
                              >
                                <div className="w-full flex items-start py-3">
                                  <img
                                    src={product.image_Url[0].url}
                                    alt="Product image"
                                    className="w-10 h-10 mr-2.5"
                                  />
                                  <h1>{product.name}</h1>
                                </div>
                              </Link>
                            );
                          })}
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Nav Items */}
                <Navbar active={activePage} />

                {/* Become Seller Button */}
                <div className={`${styles.button} w-[60%] ml-5 rounded-sm!`}>
                  <Link to={"/seller"}>
                    <h1 className="text-amber-50 flex items-center whitespace-nowrap p-5">
                      Become Seller <IoIosArrowForward className="ml-1" />
                    </h1>
                  </Link>
                </div>
                <div className="flex w-full justify-center mt-10">
                  {!isAuthenticated ? (
                    <>
                      <Link
                        to={"/login"}
                        className="text-[18px] pr-1 text-black/60"
                      >
                        Login /
                      </Link>
                      <Link
                        to={"/sign-up"}
                        className="text-[18px] text-black/60"
                      >
                        Sign up
                      </Link>{" "}
                    </>
                  ) : (
                    <>
                      <div>
                        <Link to={"/profile"}>
                          <img
                            alt="Image"
                            src={`${user.avatar.url}`}
                            className="w-14 h-14 rounded-full object-cover border-2 border-green-400"
                          />
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
