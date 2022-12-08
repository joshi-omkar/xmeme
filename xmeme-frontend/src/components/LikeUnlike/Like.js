import React, { useContext, useState } from "react";
import { UserContext } from "../UserProfile/UserContext";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as LikeIcon } from '@fortawesome/free-regular-svg-icons'
import {faHeart as UnlikeIcon} from '@fortawesome/free-solid-svg-icons'

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
        <FontAwesomeIcon onClick={handleOnClickUnlike} icon={UnlikeIcon} />
      ) : (
        <FontAwesomeIcon onClick={handleOnClickLike} icon={LikeIcon} />
      )}
    </div>
  );
}

export default Like;
