//Insert book in the Wishlist
const db = require("../../Database/Database.js");
const wishlistInsert = (req, res) => {
  const {
    googleId,
    title,
    authors,
    publisher,
    publishedDate,
    description,
    pageCount,
    categories,
    thumbnail,
    infoLink,
  } = req.body;

  const query = `
      INSERT INTO wishlist 
      (google_id, title, authors, publisher, publishedDate, description, pageCount, categories, thumbnail, infoLink) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(google_id) DO NOTHING
    `;

  db.run(
    query,
    [
      googleId,
      title,
      authors ? authors.join(", ") : null,
      publisher || null,
      publishedDate || null,
      description || null,
      pageCount || null,
      categories ? categories.join(", ") : null,
      thumbnail || null,
      infoLink,
    ],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: "Book added to wishlist", id: this.lastID });
      }
    }
  );
};

module.exports = wishlistInsert;
