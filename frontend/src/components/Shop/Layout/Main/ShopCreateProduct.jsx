import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";

const ShopCreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDiscription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState();
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();

  const handleSubmit = (e) => {
    e.preventDefault;
  };

  const handleImageChange = (e) => {
    e.preventDefault;
    console.log(e.target.files);
    let files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };
  return (
    <div className="w-[90%] md:w-[50%] bg-white shadow h-[80vh] rounded-sm p-3 overflow-y-auto">
      <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
      {/* Create Product Form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            className="bg-slate-200 appearance-none mt-2 block w-full h-7 border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm px-3"
            type="text"
            placeholder="Enter your product name..."
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* description */}
        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <input
            className="bg-slate-200 appearance-none mt-2 block w-full h-7 border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm px-3"
            type="text"
            placeholder="Enter product description..."
            name="description"
            value={description}
            onChange={(e) => setDiscription(e.target.value)}
          />
        </div>

        {/* Category */}
        <br />
        <div>
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-8 rounded-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>

        {/* Tags */}
        <br />
        <div>
          <label className="pb-2">Tags</label>
          <input
            className="bg-slate-200 appearance-none mt-2 block w-full h-7 border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm px-3"
            type="text"
            placeholder="Enter your product tags..."
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {/* Original Price */}
        <br />
        <div>
          <label className="pb-2">Original Price</label>
          <input
            className="bg-slate-200 appearance-none mt-2 block w-full h-7 border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm px-3"
            type="number"
            placeholder="Enter your product price..."
            name="price"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
          />
        </div>

        {/* Discount Price */}
        <br />
        <div>
          <label className="pb-2">
            Price (with Discount) <span className="text-red-500">*</span>
          </label>
          <input
            className="bg-slate-200 appearance-none mt-2 block w-full h-7 border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm px-3"
            type="number"
            placeholder="Enter your product price with discount..."
            name="price"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
          />
        </div>

        {/* Product Stock */}
        <br />
        <div>
          <label className="pb-2">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            className="bg-slate-200 appearance-none mt-2 block w-full h-7 border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm px-3"
            type="number"
            placeholder="Enter your product stock..."
            name="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        {/* Product Images */}
        <br />
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            className="hidden"
            type="file"
            id="upload"
            multiple
            onChange={(e) => handleImageChange(e)}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((i) => (
                <img
                  src={URL.createObjectURL(i)}
                  key={i}
                  alt="ProductImage"
                  className="h-24 w-24 object-cover m-2"
                />
              ))}
          </div>
          <br />
          <div>
            <input type="submit" value={"Create"} className="mt-2 cursor-pointer appearance-none text-center block w-full h-8 border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm px-3"/>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShopCreateProduct;
