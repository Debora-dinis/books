//Remove entry from wishlist
const db = require("../../Database/Database.js");
const wishlistRemove = (req, res) => {
  const { googleId } = req.params;

  const query = `
      DELETE FROM wishlist WHERE google_id = ?
    `;

  db.run(query, [googleId], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "Book removed from the wishlist", id: this.lastID });
    }
  });
};

module.exports = wishlistRemove;
