import { useEffect } from "react";
import { Header, Footer, Inbox } from "../../../components";

function InboxPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header />
      <div className="min-h-[70vh] bg-gray-50 p-3">
        <Inbox />
      </div>
      <Footer />
    </div>
  );
}

export default InboxPage;
