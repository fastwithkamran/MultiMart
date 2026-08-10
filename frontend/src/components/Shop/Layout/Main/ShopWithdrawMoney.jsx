import { useDispatch, useSelector } from "react-redux";
import { getAllShopOrders } from "../../../../redux/actions/order";
import { useEffect } from "react";
import styles from "../../../../styles/styles";

const ShopWithdrawMoney = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getAllShopOrders(seller._id));
  }, [dispatch, seller._id]);

  const deliveredOrders =
    orders && orders.filter((item) => item.status === "Delivered");

  const totalEarningsWithoutTax =
    deliveredOrders &&
    deliveredOrders.reduce((sum, item) => sum + item.totalPrice, 0);

  const serviceCharge = totalEarningsWithoutTax * 0.1;

  const availableBalance = totalEarningsWithoutTax - serviceCharge;

  return (
    <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col">
        <h5 className="text-[20px] pb-4">Available Balance: ${availableBalance.toFixed(2)}</h5>
        <div className={`${styles.button} text-white p-4 rounded-sm!`}>Withdraw</div>
      </div>
    </div>
  );
};

export default ShopWithdrawMoney;
