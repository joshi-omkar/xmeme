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

  const hiddenFileInput = React.useRef(null);
  
  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  return (
    <div className="upload-image">
      <button id="submit-btn" className="btn btn-primary" onClick={handleClick}>Upload from device</button>
      <input
        type={"file"}
        accept={["image/png", "image/jpeg", "image/jpg"]}
        onChange={(e) => {
          setImage(e.target.files[0]);
          console.log(e.target.files[0])
        }}
        ref={hiddenFileInput}
        className="input-file"
        style={{display:'none'}} 
      />
      <button id="submit-btn" className="btn btn-primary" type={"submit"} onClick={onSubmit}>Upload</button>
    </div>
  );
};

export default UploadFromDevice;