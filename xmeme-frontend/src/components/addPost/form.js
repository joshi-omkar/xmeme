import React,{useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import "./postmeme.css";
import { InputGroup, Button, Form, Card } from "react-bootstrap/";

const Form1 = () => {

  const [name,setName] = useState('')
  const [caption,setCaption] = useState('')
  const [url,setUrl] = useState('')


  const handleSubmit = (event) => {
    event.preventDefault();
};

const PostData=()=>{
  axios({
    method: "post",
    url: "http://localhost:8000/entry",
    data: {
      name:name,
      caption:caption,
      url:url
    },
    headers: { "Content-Type": "application/json" },
  })
    .then( (response)=> {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="split1 left">
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Owner's Name</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              aria-label="Username"
              aria-describedby="basic-addon1"
              type="text"
              name="name"
              onChange={(e) => {
                let intial = e.target.value;
                setName(intial);
              }}
              
              placeholder="your name..."
              required
            />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>With textarea</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              component="textarea"
              aria-label="With textarea"
              type="text"
              name="caption"
              onChange={(e) => {
                let intial = e.target.value;
                setCaption(intial);
              }}
              
              placeholder="caption"
              required
            />
          </InputGroup>
          <br />

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon3">Meme URL</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              id="basic-url"
              aria-describedby="basic-addon3"
              type="text"
              name="url"
              onChange={(e) => {
                let intial = e.target.value;
                setUrl(intial);
              }}
              
              placeholder="url of meme"
              required
            />
          </InputGroup>

          <Button variant="success" type="submit" className="button" onClick={PostData} >
            ADD
          </Button>
        </div>
      </form>

      <div className="split2 right">
        <h2 className="memePreview-heading">How it looks!!</h2>
        <Card style={{ width: "30rem" }}>
          <Card.Body>
            <Card.Img variant="top" src={url} />
            <Card.Title>{name}</Card.Title>
            <Card.Text>{caption}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Form1;
