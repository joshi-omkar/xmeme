import { Link } from "react-router-dom";
import Logo from "../assets/favicon-1.png";
import "./Navbar.css";
const Navbar = ({isLogedIn, logout}) => {
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
        {isLogedIn ? (
          <>
          <div className="LinkToUser">
            <Link to={`/user/me`}>User</Link>
          </div>
          <button
            className="logoutButton"
            type="submit"
            onClick={() => {
              logout()
            }}
          >
            logout
          </button>
          </>
        ) : (
          <div>
            <Link className="linkToLogin" to={`/login`}>Login</Link>
            <Link className="linkToRegister" to={`/register`}>Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
