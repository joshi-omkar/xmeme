import React, { useState, useEffect } from "react";
import axios from 'axios'

const UploadFromDevice = ({setUrl}) => {
  const [image, setImage] = useState(null);

  const onSubmit = async(e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8081/file/upload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        console.log(response)
        setUrl(response.data)
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div onSubmit={onSubmit}>
      <input
        type={"file"}
        accept={["image/png", "image/jpeg"]}
        onChange={(e) => {
          setImage(e.target.files[0]);
          console.log(e.target.files[0])
        }}
        
      />
      <input type={"submit"} value="Upload File"/>
    </div>
  );
};

export default UploadFromDevice;