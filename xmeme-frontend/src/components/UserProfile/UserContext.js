import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { USER_INFO } from "../../apiUrls";

const UserContext = createContext(undefined);

const UserProvider = ({ children }) => {
  const token = localStorage.getItem("token");

  const [response, setResponse] = useState([]);

  useEffect(() => {
    axios
      .get(USER_INFO, {
        headers: { Authorization: `Bearer ${token}` },
        Accept: "application/json",
        "Content-Type": "application/json",
      })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <UserContext.Provider value={{response}}>
        {children}
    </UserContext.Provider>
  );
};

export  {UserProvider, UserContext};
