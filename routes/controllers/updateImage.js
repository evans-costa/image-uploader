const cloudinary = require("../../services/config.js");
const db = require("../../services/dbConnect.js");

const updateImage = async (req, res) => {
  const { cloudinary_id } = req.params;

  const data = {
    title: req.body.title,
    image: req.body.image,
  };

  try {
    await cloudinary.uploader.destroy(cloudinary_id);

    const image = await cloudinary.uploader.upload(data.image);

    const client = await db.pool.connect();

    const updateQuery = `UPDATE images SET title = $1, cloudinary_id = $2, image_url = $3 WHERE cloudinary_id = $4`;

    const value = [
      data.title,
      image.public_id,
      image.secure_url,
      cloudinary_id,
    ];

    const updateImage = await client.query(updateQuery, value);

    res.status(201).send({
      status: "success",
      data: {
        message: "Image updated succesfully!",
      },
      updateImage,
    });

    client.release();
  } catch (err) {
    res.status(500).send({
      status: "failure",
      data: {
        message: "Could not update image",
      },
      err,
    });
  }
};

module.exports = {
  updateImage,
};
