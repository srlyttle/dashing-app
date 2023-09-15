import { useState } from "react";
import "./styles.scss";

interface Props {
  username: string;
  onLogout: () => void;
}

const UserAvatar = ({ onLogout, username }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="user-profile" onClick={toggleDropdown}>
      <img src="/avatar.jpeg" alt="User Profile" className="profile-image" />

      {isOpen && (
        <div className="dropdown-menu">
          <button onClick={onLogout} className="logout-button">
            Logout {username}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
