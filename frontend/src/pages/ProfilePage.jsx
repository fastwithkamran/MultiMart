import { useState } from "react";
import { Header, ProfileSidebar } from "../components";

function ProfilePage() {
  const [active, setActive] = useState(1);
  return (
    <div>
      <Header />
      <div className="w-full flex bg-white py-10">
        <div className="w-80">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
