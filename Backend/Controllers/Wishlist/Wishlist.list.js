//Get all entries from the Wishlist collection
const db = require("../../Database/Database.js");
const wishlistGet = (req, res) => {
  db.all("Select * From Wishlist", (error, result) => {
    if (error) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result);
    }
  });
};

module.exports = wishlistGet;
