import { navItems } from "../../static/data";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";

// functional component for nav items
const Navbar = ({active}) => {
  return (
    <div className={`${styles.normalFlex}`}>
      {navItems &&
        navItems.map((product, index) => (
          <div className="flex">
            <Link
              to={product.url}
              className={`${active === index + 1 ? "text-green-300" : "text-amber-50" } "font-medium px-6 cursor-pointer"`}
            >
              {product.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
