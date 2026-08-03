import styles from "../../../styles/styles";
import EventCard from "./EventCard";
import { useSelector } from "react-redux";
import Loader from "../../Layout/Loader/Loader";

function Events() {
  const { allEvents, isLoading } = useSelector((state) => state.event);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : allEvents.length !== 0 ? (
        <div className="w-full">
          <div className={`${styles.heading} ml-5`}>
            <h1>Popular Events</h1>
          </div>
          <div className="w-full grid">
            <EventCard data={allEvents && allEvents[0]} />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Events;
