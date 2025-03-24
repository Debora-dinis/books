//Insert book to a  collection
const db = require("../../Database/Database.js");
const bookInsert = (req, res) => {
  const {
    table_name,
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
      INSERT INTO ${table_name.replaceAll(" ","")} 
      (google_id, title, authors, publisher, publishedDate, description, pageCount, categories, thumbnail, infoLink) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(google_id) DO NOTHING
    `;

  db.run(
    query,
    [
      googleId,
      title,
      authors ? Array.isArray(authors)?authors.join(", "):authors : null,
      publisher || null,
      publishedDate || null,
      description || null,
      pageCount || null,
      categories ? Array.isArray(categories)?categories.join(", "):categories : null,
      thumbnail || null,
      infoLink,
    ],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: "Book added to the collection", id: this.lastID });
      }
    }
  );
};

module.exports = bookInsert;

