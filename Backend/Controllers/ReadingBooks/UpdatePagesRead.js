const db = require("../../Database/Database.js");

const updatePagesRead = (req, res) => {
  const { pagesRead,google_id } = req.body;

  const query = `UPDATE Reading SET pagesRead = ? WHERE google_id = ?`;

  db.run(query, [pagesRead,google_id], (error, row) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else  {
      res.json(row);
    }
  });
};

module.exports = updatePagesRead;
