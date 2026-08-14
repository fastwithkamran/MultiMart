import styles from "../../../styles/styles";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div
      className={`relative min-h-[70vh] md:min-h-[80vh] w-full bg-no-repeat bg-cover bg-left md:bg-center ${styles.normalFlex}`}
      style={{ backgroundImage: "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)" }}
    >
      <div className="w-[90%] sm:w-[55%] text-left items-start p-3">
        <h1 className="text-[35px] leading-[1.2] md:text-[60px] text-slate-700 font-medium capitalize">
          Best Collection for home Decoration
        </h1>
        <p className="pt-5 text-[16px] font-poppins font-normal text-black max-w-125">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis
          eius, quaerat mollitia delectus et cupiditate dignissimos, atque
          voluptatibus reiciendis laborum, perspiciatis quod autem
          necessitatibus dolorem repellendus similique cum dicta repellat.
        </p>
        <Link to={"/products"} className="inline-block">
          <div className={`${styles.button} mt-5 p-3`}>
            <span className="text-white font-poppins text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
