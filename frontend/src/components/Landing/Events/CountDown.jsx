import { useState, useEffect } from "react";

function calculateTimeLeft({ data }) {
  const difference = +new Date(data?.finish_Date) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
}

function CountDown({ data }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft({ data }));

  //   countdown timer hook
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft({ data }));
    }, 1000);
    return () => clearTimeout(timer);
  });

  //   loop through timeLeft object, convert it into array and returns JSX
  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) return null;

    return (
      <span key={interval} className="text-base sm:text-[25px] text-blue-400 mr-3">
        {timeLeft[interval]} {interval}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-red-500 text-[25px]">Times's up</span>
      )}
    </div>
  );
}

export default CountDown;
