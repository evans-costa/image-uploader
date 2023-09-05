const express = require("express");
const router = express.Router();
const persistImage = require("./controllers/persistImage.js");
const retrieveImage = require("./controllers/retrieveImage.js");
const deleteImage = require("./controllers/deleteImage.js");
const updateImage = require("./controllers/updateImage.js");

router.get("/", (req, res, next) => {
  res.json({ message: "This is the server response!" });
  next();
});

router.post("/persist-image", persistImage.uploadImage);

router.get("/retrieve-image/:cloudinary_id", retrieveImage.getImage);

router.delete("/delete-image/:cloudinary_id", deleteImage.deleteImage);

router.put("/update-image/:cloudinary_id", updateImage.updateImage);

module.exports = router;
