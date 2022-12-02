import React, { useState, useEffect } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { USER_LOGIN } from "../../apiUrls";

const Login = ({  setIsLogedIn  }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });



  // const [isLogedIn, setIsLogedIn] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = async e => {
    e.preventDefault();

    if(user.email === "" || user.password === ""){
      setError("Please fill all feilds")
    }else{
      await axios
      .post(USER_LOGIN, user)
      .then((res) => {
        if(res.data.message){
            setError(res.data.message);
        }else{
            navigate("/");
            setIsLogedIn(true);
            localStorage.setItem("token", res.data.token)
        }
      })
      .catch((error) => {

        if(error.response){
          setError("User Not Found")
        }
      });
    }

  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("token");
    if (loggedInUser) {
      navigate('/')
      setIsLogedIn(true);
    }
  }, []);

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="text"
        name="email"
        value={user.email}
        onChange={handleChange}
        required={true}
        placeholder="Enter your Email"
      ></input>
      <input
        type="password"
        name="password"
        value={user.password}
        required={true}
        onChange={handleChange}
        placeholder="Enter your Password"
      ></input>
      <div className="error">{error}</div>

      <div className="button" onClick={login}>
        Login
      </div>
      <div>or</div>
      <div className="button" onClick={() => navigate("/register")}>
        Register
      </div>
    </div>
  );
};

export default Login;
