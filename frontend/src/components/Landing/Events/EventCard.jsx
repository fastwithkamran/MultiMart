import styles from "../../../styles/styles";
import CountDown from "./CountDown";

function EventCard({active}) {
  return (
    <div className={`w-full block bg-white rounded-lg lg:flex p-2 ${active ? 'unset' : 'mb-12'} `}>
      <div className="w-full lg:w-[50%] m-auto">
        <img
          src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg"
          alt="productImage"
        />
      </div>

      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>Iphone 14pro Max 8/256gb</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat
          dolorem perferendis neque, nam aliquid voluptas ipsam recusandae culpa
          dolore deserunt corrupti! Accusantium accusamus ut excepturi veritatis
          inventore explicabo esse facere. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Neque, obcaecati commodi. Ex labore
          dolores itaque quaerat ipsam dicta! Facere, voluptates nobis. Tempore
          ducimus omnis soluta. Ex voluptatibus repellendus officia vel.
        </p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-medium text-[18px] text-orange-600 pr-3 line-through">
              1099$
            </h5>
            <h5 className="font-bold text-[20px] text-slate-600 font-Roboto">
              999$
            </h5>
          </div>
          <span className="pr-3 font-medium text-[17px] text-green-300">
            120 sold
          </span>
        </div>
        <CountDown />
      </div>
    </div>
  );
}

export default EventCard;
