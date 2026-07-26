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

const Header = ({ activePage }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState("");
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [open, setOpen] = useState(false);

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
    
      <div className="w-full hidden sm:block">
        {/* Header */}
        <div className="h-fit flex items-center justify-between bg-slate-100 px-3">
          <div>
            <Link to="/">
              <img
                src="data:image/jpeg;base64,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"
                alt="Logo"
                className="m-1 h-30 w-30 object-cover"
              />
            </Link>
          </div>
          {/* Search Box */}
          <div className="w-[50%] relative" onClick={() => setOpen(!open)}>
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
            {open && searchData.length !== 0 ? (
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
              <div className="relative cursor-pointer mr-3.5">
                <AiOutlineHeart size={30} className="text-amber-50" />
                <span className="absolute right-0 top-0 rounded-full bg-green-400 w-4 h-4 p-0 m-0 text-white font-mono text-sm text-center leading-tight">
                  0
                </span>
              </div>
            </div>

            {/* shopping cart icon */}
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-3.5">
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
                    <img alt="Image" src={`${user.avatar.url}`} className="w-10 h-10 rounded-full object-cover" />
                  </Link>
                ) : (
                  <Link to={"/login"}>
                    <CgProfile size={30} className="text-amber-50" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
