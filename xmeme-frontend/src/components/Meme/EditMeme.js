import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SingleMeme from "./SingleMeme";
import { useNavigate } from "react-router-dom";
import { GET_ALL_MEMES } from "../../apiUrls";

const EditMeme = (props) => {
  const { id, memeId } = useParams();
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [meme, setMeme] = useState({});
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(GET_ALL_MEMES + id + "/" + memeId, {
        headers: { Authorization: `Bearer ${token}` },
        Accept: "application/json",
        "Content-Type": "application/json",
      })
      .then((response) => {
        setName(response.data.name);
        setCaption(response.data.caption);
        setUrl(response.data.url);
        setMeme(response.data);
        setIsLoading(true);
      })
      .catch((err) => {
        if (err.response) {
          setError("Update the data");
        }
      });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    const memePatch = {
      caption: caption,
      url: url,
    };
    await axios
      .patch(GET_ALL_MEMES + id + "/" + memeId, memePatch, {
        headers: { Authorization: `Bearer ${token}` },
        Accept: "application/json",
        "Content-Type": "application/json",
      })
      .then((res) => {
        setIsLoading(true);
        navigate('/user/me')
      })
      .catch((err) => {
        if(err.response){
            setError("Can not update now!!")
        }
      });
  };

  return (
    <div className="editContainer">
      <SingleMeme meme={meme} user={false} />
      <hr />
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <h6 id="heading">Meme Owner</h6>
          <input
            className="form-control"
            required
            id="name"
            type="text"
            value={name}
            disabled
          />
        </div>
        <div className="form-group">
          <h6 id="heading">Caption</h6>
          <input
            className="form-control"
            required
            id="caption"
            type="text"
            defaultValue={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        <div className="form-group">
          <h6 id="heading">Meme URL</h6>
          <input
            className="form-control"
            required
            id="url"
            type="url"
            defaultValue={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="error">{error}</div>
        <input
          className="btn btn-primary"
          id="submit-btn"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};
export default EditMeme;
