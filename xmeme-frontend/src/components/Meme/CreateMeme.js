import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleMeme from "./SingleMeme";
import UploadFromDevice from "./UploadFromDevice";
import { GET_ALL_MEMES } from "../../apiUrls";
import Spinner from "../assets/Spinner";

const CreateMeme = () => {

  const [name, setName] = useState('')
  const [caption, setCaption] = useState('')
  const [url, setUrl] = useState('')
  const [memeArray, setMemeArray] = useState([])
  const [image, setImage] = useState([]);
  const [spinner, setSpinner] = useState(false);    


  const token = localStorage.getItem('token')
  useEffect(() => {
    setSpinner(true)
    axios
      .get(GET_ALL_MEMES)
      .then((response) => {
        const data = response.data;
        setMemeArray(data)
        setSpinner(false)
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  }, []);
  const onSubmit = (event) => {
    event.preventDefault();
    
    const meme = {
      name: name,
      caption: caption,
      url: url,
    };
    console.log(meme)
    axios
      .post(GET_ALL_MEMES, meme, {
        headers: { Authorization: `Bearer ${token}` },
        Accept: "application/json",
        "Content-Type": "application/json",
      })
      .then((memeId) => {
        const newMeme = {
          id: memeId.data.id,
          name: name,
          caption: caption,
          url: url,
        };
          setMemeArray([newMeme, ...memeArray])
        
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
      setName('')
      setCaption('')
      setUrl('')
  };

  return (
    <div className="container">
      <section>
        <div>
          <h1 id="heading">Meme Stream</h1>
        </div>
        <hr />
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <h6 id="heading">Meme Owner</h6>
            <input
              className="form-control"
              required
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <h6 id="heading">Caption</h6>
            <input
              className="form-control"
              required
              id="caption"
              type="text"
              placeholder="Be creative with caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <h6 id="heading">Meme URL</h6>
            <div className="url-group">
              <input
                className="form-control url-input"
                id="url"
                type="text"
                placeholder="Enter URL of your meme here"
                value={url}
                onChange={(e) => setUrl(e.target.value)} 
              />
              <UploadFromDevice setUrl = {setUrl}/>
            </div>
          </div>
          <input
            className="btn btn-primary"
            id="submit-btn"
            type="submit"
            value="Submit"
          />
        </form>
        <br />
      </section>

      <section>
        <div className="container">
          <div className="row">
            {  
            memeArray.map((currMeme) => {
              return (
                <div className="col-md-4 col-sm-6 col-12" key={currMeme._id} >
                  <SingleMeme
                    meme={currMeme}
                    user={false}
                  />
                </div>
              );
            })}
          </div>
          {spinner ? (<Spinner/>):(<></>)}
        </div>
      </section>
    </div>
  );
};

export default CreateMeme;
