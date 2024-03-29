import axios from "axios";
import React, { useState, useEffect } from "react";
import { GET_ALL_MEMES, USER_INFO } from "../../apiUrls";
import SingleMeme from "../Meme/SingleMeme";
import "./userPageStyle.css";

function UserProfile() {
  const token = localStorage.getItem("token");

  const [response, setResponse] = useState({});
  const [userMeme, setUserMeme] = useState([]);
  const [id, setId] = useState("");
  const UserData = async () => {
    await axios
      .get(USER_INFO, {
        headers: { Authorization: `Bearer ${token}` },
        Accept: "application/json",
        "Content-Type": "application/json",
      })
      .then((res) => {
        setResponse(res.data);
        setId(res.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const memes = async () => {
    await axios
      .get(GET_ALL_MEMES + id, {
        headers: { Authorization: `Bearer ${token}` },
        Accept: "application/json",
        "Content-Type": "application/json",
      })
      .then((res) => {
        const data = res.data;
        setUserMeme(res.data);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };

  const deleteMeme = (memeId) => {
    axios
      .delete(GET_ALL_MEMES + response.id + "/" + memeId, {
        headers: { Authorization: `Bearer ${token}` },
        Accept: "application/json",
        "Content-Type": "application/json",
      })
      .then(() => {
        userMeme.filter((index) => index._id !== memeId);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };

  useEffect(() => {
    if (!id) return;
    memes();
  }, [id]);

  useEffect(() => {
    UserData();
  }, []);

  return (
    <div className="userDetails">
      <div style={{ fontSize: "50px" }}>{response.name}</div>
      <section>
        <div className="container">
          <div className="row">
            {userMeme.map((currMeme) => {
              return (
                <div className="col-md-4 col-sm-6 col-12" key={currMeme._id}>
                  <SingleMeme
                    meme={currMeme}
                    deleteMeme={deleteMeme}
                    user={true}
                    key={currMeme.id}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserProfile;
