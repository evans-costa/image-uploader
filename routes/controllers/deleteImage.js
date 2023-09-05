const cloudinary = require("../../services/config.js");
const db = require("../../services/dbConnect.js");

const deleteImage = async (req, res) => {
  const { cloudinary_id } = req.params;

  try {
    await cloudinary.uploader.destroy(cloudinary_id);

    const client = await db.pool.connect();

    const deleteQuery = `DELETE FROM images WHERE cloudinary_id = $1`;

    const deleteValue = [cloudinary_id];

    const deleteResult = await client.query(deleteQuery, deleteValue);

    res.status(200).send({
      message: "Image deleted successfully!",
      deleteResult,
    });

    client.release();
  } catch (err) {
    res.status(500).send({
      message: "Could not delete the image",
      err,
    });
  }
};

module.exports = {
  deleteImage,
};
