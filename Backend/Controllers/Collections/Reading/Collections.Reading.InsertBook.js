//Insert book in the Reading collection
const db = require("../../../Database/Database.js");
const readingInsert = (req, res) => {
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
    pagesRead,
  } = req.body;

  const query = `
      INSERT INTO reading 
      (google_id, title, authors, publisher, publishedDate, description, pageCount, categories, thumbnail, infoLink, startDate, pagesRead) 
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
      pagesRead || null,
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

module.exports = readingInsert;
