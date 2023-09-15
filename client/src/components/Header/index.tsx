import "./styles.scss";
import UserAvatar from "../UserAvatar";
import BrandName from "../Brand";

interface Props {
  username: string;
  onLogout: () => void;
}

const Header = ({ username, onLogout }: Props) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <BrandName
            title="Dashing Web Design"
            subtitle="building the future web"
          />
        </div>

        <UserAvatar onLogout={onLogout} username={username} />
      </div>
    </nav>
  );
};

export default Header;
