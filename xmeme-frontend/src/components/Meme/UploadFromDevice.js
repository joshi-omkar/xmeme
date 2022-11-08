import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const FileInputButton = ({ setImage, buttonName }) => {
  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };
  return (
    <div className="upload-image-button">
      <button id="submit-btn" className="btn btn-primary" onClick={handleClick}>
        {buttonName}
      </button>
      <input
        type={"file"}
        accept={["image/png", "image/jpeg", "image/jpg"]}
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
        ref={hiddenFileInput}
        className="input-file"
        style={{ display: "none" }}
      />
    </div>
  );
};

const UploadFromDevice = ({ setUrl }) => {
  const [image, setImage] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setImage(null)
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8081/file/upload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
      setUrl(response.data);
    } catch (error) {
      console.log(error);
    }

    setOpen(false);
    setImage(null)
  };

  const onClickRemoveImage = () => {
    setImage(null);
  };

  return (
    <div>
      <Button className="btn btn-primary url-side-button" onClick={handleOpen}>
        Choose file...
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="upload-image">
            {image ? (
              <div>
                <img
                  src={image ? URL.createObjectURL(image) : null}
                  alt={image ? image.name : null}
                  className="image-from-model"
                />
                <div className="buttons-after-upload-image-model">
                  <button
                    id="submit-btn"
                    className="btn btn-primary"
                    type={"submit"}
                    onClick={onSubmit}
                  >
                    Upload
                  </button>
                  <FileInputButton
                    setImage={setImage}
                    buttonName={"Choose another"}
                  />
                  <button
                    id="submit-btn"
                    className="btn btn-primary"
                    onClick={onClickRemoveImage}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <FileInputButton
                setImage={setImage}
                buttonName={"Upload from device"}
              />
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UploadFromDevice;
