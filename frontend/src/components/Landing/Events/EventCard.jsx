import styles from "../../../styles/styles";
import CountDown from "./CountDown";

function EventCard({ active, data }) {
  return (
    <>
      {data ? (
        <div
          className={`w-full block bg-white rounded-lg lg:flex p-2 ${active ? "unset" : "mb-12"} `}
        >
          <div className="w-full lg:w-[50%] m-auto">
            <img src={data?.images[0]} alt="productImage" />
          </div>

          <div className="w-full lg:w-[50%] flex flex-col justify-center">
            <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
            <p>{data?.description}</p>
            <div className="flex py-2 justify-between">
              <div className="flex">
                <h5 className="font-medium text-[18px] text-orange-600 pr-3 line-through">
                  {data?.originalPrice}$
                </h5>
                <h5 className="font-bold text-[20px] text-slate-600 font-Roboto">
                  {data?.discountPrice}$
                </h5>
              </div>
              <span className="pr-3 font-medium text-[17px] text-green-300">
                120 sold
              </span>
            </div>
            <CountDown data={data} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-10">
          <div className="text-center text-4xl text-red-500">
            No Ongoing Events
          </div>
        </div>
      )}
    </>
  );
}

export default EventCard;
