import { useState } from "react";
import { Header, ProfileSidebar, ProfileContent } from "../components";

function ProfilePage() {
  const [active, setActive] = useState(1);
  return (
    <div>
      <Header />
      <div className="w-full p-5 flex bg-white py-10">
        <div className="w-80">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </div>
    </div>
  );
}

export default ProfilePage;
