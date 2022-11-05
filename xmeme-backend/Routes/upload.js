const upload = require("../middleware/upload");
const express = require("express");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const router = express.Router();
const dotenv = require('dotenv').config()

let gfs;
const DATABASE = process.env.DATABASE;

const conn = mongoose.createConnection(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('DB is connected');
});
conn.once("open", function () {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
});

router.post("/upload", upload.single("file"), async (req, res) => {
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `http://localhost:8081/file/${req.file.filename}`;
    return res.send(imgUrl);
});

router.get("/:filename", async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (error) {
        res.send("not found");
    }
});

router.delete("/:filename", async (req, res) => {
    try {
        await gfs.files.deleteOne({ filename: req.params.filename });
        res.send("success");
    } catch (error) {
        console.log(error);
        res.send("An error occured.");
    }
});




module.exports = router;
