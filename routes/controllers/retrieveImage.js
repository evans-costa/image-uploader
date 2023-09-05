const db = require("../../services/dbConnect.js");

const getImage = async (req, res) => {
  const { cloudinary_id } = req.params;

  try {
    const client = await db.pool.connect();

    const query = `SELECT * FROM images WHERE cloudinary_id = $1`;

    const value = [cloudinary_id];

    const output = await client.query(query, value);

    res.status(200).send({
      status: "success",
      data: {
        id: output.rows[0].cloudinary_id,
        title: output.rows[0].title,
        url: output.rows[0].image_url,
      },
    });

    client.release();
  } catch (err) {
    res.status(401).send({
      message: "failure",
      data: {
        message: "Could not retrieve record",
        err,
      },
    });
  }
};

module.exports = {
  getImage,
};
