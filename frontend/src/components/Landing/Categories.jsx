import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../static/data";

function Categories() {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full p-5 hidden md:block">
        <div className="branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md">
          {brandingData &&
            brandingData.map((product, index) => (
              <div key={index} className="flex items-start">
                {product.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">
                    {product.title}
                  </h3>
                  <p className="text-sx md:text-sm">{product.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="p-5">
        <div className="w-full bg-white p-6 rounded-lg mb-12" id="categories">
          <div className="grid grid-cols-1 gap-1.5 md:grid-cols-2 md:gap-3 lg:grid-cols-4 lg:gap-10 xl:grid-cols-5 xl:gap-16">
            {categoriesData &&
              categoriesData.map((product) => {
                const handleSubmit = (product) => {
                  navigate(`/products?category=${product.title}`);
                };
                return (
                  <div
                    className="w-full h-25 flex items-center cursor-pointer overflow-hidden"
                    key={product.id}
                    onClick={() => handleSubmit(product)}
                  >
                    <h5 className={`leading-[1.3]`}>{product.title}</h5>
                    <img
                      src={product.image_Url}
                      alt="productImage"
                      className="w-30 object-cover"
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Categories;
