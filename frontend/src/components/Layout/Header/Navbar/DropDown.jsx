// Dropdown for all categories in header
import { useNavigate } from "react-router-dom";
import styles from "../../../../styles/styles";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();
  const handleSubmit = (product) => {
    navigate(`/products?category=${product.title}`);
    setDropDown(false);
    window.location.reload();
  };
  return (
    <div className="pb-4 w-64 bg-amber-50 absolute z-30 rounded-b-md shadow-sm">
      {categoriesData &&
        categoriesData.map((product, index) => (
          <div
            key={index}
            className={`${styles.normalFlex}`}
            onClick={() => handleSubmit(product)}
          >
            <img
              src={product.image_Url}
              alt="productImage"
              className="w-6.25 h-6/25 object-cover ml-2.5 select-none"
            />
            <h3 className="m-3 cursor-pointer select-none">{product.title}</h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
