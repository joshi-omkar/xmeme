import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap/";
import "./home.css";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getMeme();
  },[]);

  const getMeme= ()=>{
    axios
      .get(`http://localhost:8000/data`)
      .then((res) => {
        setData(res.data);
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const renderCards = (meme, index) => {
    return (
      <Card style={{ width: "18rem" }} key={index} className="box">
        <Card.Body>
          <Card.Img variant="top" src={meme.url} className="box-img"></Card.Img>
          <Card.Title>{meme.name}</Card.Title>
          <Card.Text>{meme.caption}</Card.Text>
        </Card.Body>
        
      </Card>
    );
  };

  return (
    <div className="grid">{data.slice(0, 100).reverse().map(renderCards)}</div>
  );
};

export default Home;
