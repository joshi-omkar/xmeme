import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { USER_REGISTER } from "../../apiUrls";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const [error, setError] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [created, setCreated] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = () => {
    const { name, email, password, reEnterPassword } = user;
    if (name && email && password && password === reEnterPassword) {
      axios
        .post(USER_REGISTER, user)
        .then((res) => {
          setIsCreated(true);
          setCreated("Account Created Please Login");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        })
        .catch((err) => {
          if (err.response) {
            setError("User Already Exists");
          }
        });
    } else {
      setError("invlid input");
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        type="text"
        name="name"
        value={user.name}
        placeholder="Your Name"
        onChange={handleChange}
      ></input>
      <input
        type="text"
        name="email"
        value={user.email}
        placeholder="Your Email"
        onChange={handleChange}
      ></input>
      <input
        type="password"
        name="password"
        value={user.password}
        placeholder="Your Password"
        onChange={handleChange}
      ></input>
      <input
        type="password"
        name="reEnterPassword"
        value={user.reEnterPassword}
        placeholder="Re-enter Password"
        onChange={handleChange}
      ></input>
      {isCreated ? (
        <div className="error">{created}</div>
      ) : (
        <div className="error">{error}</div>
      )}

      <div className="button" onClick={register}>
        Register
      </div>
      <div>or</div>
      <div className="button" onClick={() => navigate("/login")}>
        Login
      </div>
    </div>
  );
};

export default Register;
