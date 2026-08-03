import { useSelector } from "react-redux";
import { Header, EventCard } from "../../components";
import { Loader } from "../../components";

function EventsPage() {
  const { allEvents, isLoading } = useSelector((state) => state.event);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activePage={4} />
          <div className="p-5">
            <EventCard active={true} data={allEvents && allEvents[0]} />
          </div>
        </div>
      )}
    </>
  );
}

export default EventsPage;
