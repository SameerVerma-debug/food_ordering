import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";

const uploadRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

uploadRouter.post("/", upload.single("imageFile"), async (req, res) => {
  try {
    //multer's upload middleware will attach the image to req.file
    const image = req.file as Express.Multer.File;
    //convert image to base64 string
    const base64Image = Buffer.from(image.buffer).toString("base64");
    //configuring dataURI according to cloudinary docs
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    //console.log(uploadResponse);
    res.send(uploadResponse?.public_id);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default uploadRouter;
