import { useSelector } from "react-redux";
import { Header, EventCard, Footer } from "../../components";
import { Loader } from "../../components";
import { useEffect } from "react";

function EventsPage() {
  const { allEvents, isLoading } = useSelector((state) => state.event);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="min-h-[80vh]">
            <Header activePage={4} />
            <div className="p-5">
              {allEvents &&
                allEvents.map((event) => (
                  <EventCard active={true} data={event} />
                ))}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default EventsPage;
