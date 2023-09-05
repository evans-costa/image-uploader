const cloudinary = require("../../services/config.js");
const db = require("../../services/dbConnect.js");

const uploadImage = async (req, res) => {
  const data = {
    title: req.body.title,
    image: req.body.image,
  };

  try {
    const image = await cloudinary.uploader.upload(data.image);

    const client = await db.pool.connect();

    const insertQuery = `INSERT INTO images (title, cloudinary_id, image_url)
      VALUES($1, $2, $3) RETURNING *`;

    const values = [data.title, image.public_id, image.secure_url];

    const result = await client.query(insertQuery, values);

    const insertedImage = result.rows[0];

    res.status(201).send({
      status: "success",
      data: {
        message: "Image Uploaded Successfully.",
        title: insertedImage.title,
        cloudinary_id: insertedImage.cloudinary_id,
        image_url: insertedImage.image_url,
      },
    });

    client.release();
  } catch (err) {
    res.status(500).send({
      message: "failure",
      err,
    });
  }
};

module.exports = {
  uploadImage,
};
