import styles from "../../styles/styles";

function CheckoutSteps({ active }) {
  return (
    <div className="w-full mt-5">
      <div className="flex justify-center items-center flex-wrap gap-y-3 p-1">
        {/* Step 1 */}
        <div className={`${styles.normalFlex}`}>
          <div className={`${styles.cart_button}`}>
            <span className={`${styles.cart_button_text}`}>Shipping</span>
          </div>
          <div
            className={`${active > 1 ? "w-5 md:w-20 h-1.5 bg-[#f63b60]!" : "w-5 md:w-20 h-1.5 bg-[#FDE1E6]!"}`}
          />
        </div>

        {/* Step 2 */}
        <div className={`${styles.normalFlex}`}>
          <div
            className={`${active > 1 ? `${styles.cart_button}` : `${styles.cart_button} bg-[#FDE1E5]!`}`}
          >
            <span
              className={`${active > 1 ? `${styles.cart_button_text}` : `${styles.cart_button_text} text-[#f63b60]!`}`}
            >
              Payment
            </span>
          </div>
          <div
            className={`${active > 2 ? "w-5 md:w-20 h-1.5 bg-[#f63b60]!" : "w-5 md:w-20  h-1.5 bg-[#FDE1E6]!"}`}
          />
        </div>

        {/* Step 3 */}
        <div className={`${styles.normalFlex}`}>
          <div
            className={`${
              active > 2
                ? `${styles.cart_button}`
                : `${styles.cart_button} bg-[#FDE1E6]!`
            }`}
          >
            <span
              className={`${active > 2 ? `${styles.cart_button_text}` : `${styles.cart_button_text} text-[#f63b60]!`}`}
            >
              Success
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSteps;
