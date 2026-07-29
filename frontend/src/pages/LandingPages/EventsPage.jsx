import { Header, EventCard } from "../../components";

function EventsPage() {
  return (
    <div>
      <Header activePage={4} />
      <div className="p-5">
        <EventCard active={true} />
        <EventCard active={true} />
      </div>
    </div>
  );
}

export default EventsPage;
