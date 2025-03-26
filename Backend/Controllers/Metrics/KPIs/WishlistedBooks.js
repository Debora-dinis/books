//@ts-check
//Get the number of books in read
const db = require("../../../Database/Database.js");

const wishlistedBooks = (req, res) => {
  db.all("SELECT COUNT(google_id) AS NoOfWishlistedBooks FROM Wishlist;", (error, result) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json({ count: result[0]?.NoOfWishlistedBooks || 0 });
    }
  });
};

module.exports = wishlistedBooks;