//Insert book in the Read collection
const db = require("../../../Database/Database.js");
const readInsert = (req, res) => {
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
    startDate,
    endDate,
  } = req.body;

  const query = `
      INSERT INTO read 
      (google_id, title, authors, publisher, publishedDate, description, pageCount, categories, thumbnail, infoLink, startDate, endDate) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      startDate || null,
      endDate || null,
    ],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: "Book read successfully added to the collection", id: this.lastID });
      }
    }
  );
};

module.exports = readInsert;
