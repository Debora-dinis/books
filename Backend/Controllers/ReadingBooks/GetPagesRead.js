const db = require("../../Database/Database.js");

const getPagesRead = (req, res) => {
  const { google_id } = req.params;

  const query = `SELECT pagesRead FROM Reading WHERE google_id = ?`;

  db.get(query, [google_id], (error, row) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  });
};

module.exports = getPagesRead;
