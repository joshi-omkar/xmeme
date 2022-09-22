import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/favicon-1.png";
import "./Navbar.css";
const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navigation">
      <div className="rightOfNav">
        <Link className="LogoAndName" to="/">
          <img
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
          Xmeme
        </Link>
      </div>

      <div className="leftOfNav">
        <div className="LinkToUser">
          <Link to={`/user/me`}>User</Link>
        </div>
        <button
          className="logoutButton"
          type="submit"
          onClick={() => {
            logout();
          }}
        >
          logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
