import React, { useContext, useState } from "react";
import { UserContext } from "../UserProfile/UserContext";
import axios from "axios";

function Like({ memeId, userId }) {
  const [likeData, setLikeData] = useState([]);

  const token = localStorage.getItem("token");

  const userDetails = useContext(UserContext);

  const handleOnClickLike = (e) => {
    e.preventDefault();
    axios
      .put(
        "http://localhost:8081/memes/likes",
        { memeId: memeId },
        {
          headers: { Authorization: `Bearer ${token}` },
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      )
      .then((res) => {
        const newData = likeData.map((item) => {
          if (item.data._id === res.data._id) {
            return res.data.likes;
          } else {
            return item.data.likes;
          }
        });
        setLikeData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnClickUnlike = (e) => {
    e.preventDefault();
    axios
      .put(
        "http://localhost:8081/memes/unlikes",
        { memeId: memeId },
        {
          headers: { Authorization: `Bearer ${token}` },
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      )
      .then((res) => {
        const newData = likeData.map((item) => {
          if (item.data._id === res.data._id) {
            return res.data.likes;
          } else {
            return item.data.likes;
          }
        });
        setLikeData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {userId.includes(userDetails.response.id) ? (
        <button onClick={handleOnClickUnlike}>Unlike</button>
      ) : (
        <button onClick={handleOnClickLike}>Like</button>
      )}
    </div>
  );
}

export default Like;
