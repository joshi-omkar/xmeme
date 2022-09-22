import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleMeme from "./SingleMeme";

const CreateMeme = () => {

  const [name, setName] = useState('')
  const [caption, setCaption] = useState('')
  const [url, setUrl] = useState('')
  const [memeArray, setMemeArray] = useState([])

  const token = localStorage.getItem('token')
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL || "http://localhost:8081/memes")
      .then((response) => {
        const data = response.data;
        console.log(response)
        setMemeArray(data)
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
      .post("http://localhost:8081/memes", meme, {
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
        //state updates if meme is posted succesfully
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
    // form to obtain data from user
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
            <input
              className="form-control"
              required
              id="url"
              type="text"
              placeholder="Enter URL of your meme here"
              value={url}
              onChange={(e) => setUrl(e.target.value)} 
            />
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
            memeArray.map((currMeme, key) => {
              return (
                <div className="col-md-4 col-sm-6 col-12" key={currMeme.id}>
                  <SingleMeme
                    meme={currMeme}
                    key={currMeme.id}
                    user={false}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateMeme;
