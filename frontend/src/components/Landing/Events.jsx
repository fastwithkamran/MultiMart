import styles from "../../styles/styles";
import EventCard from "./EventCard";

function Events() {
  return (
    <div className="w-full">
      <div className={`${styles.heading} ml-5`}>
        <h1>Popular Events</h1>
      </div>

      <div className="w-full grid">
        <EventCard />
      </div>
    </div>
  );
}

export default Events;
