import { navItems } from "../../../../static/data";
import styles from "../../../../styles/styles";
import { Link } from "react-router-dom";

// functional component for nav items
const Navbar = ({active}) => {
  return (
    <div className={`block md:${styles.normalFlex}`}>
      {navItems &&
        navItems.map((product, index) => (
          <div className="flex mb-5 md:mb-0" key={index}>
            <Link
              to={product.url}
              className={`${active === index + 1 ? "text-green-300" : "md:text-amber-50 text-black" } "font-semibold text-medium md:text-sm whitespace-nowrap lg:font-semibold px-3.5 lg:px-6 cursor-pointer"`}
            >
              {product.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
