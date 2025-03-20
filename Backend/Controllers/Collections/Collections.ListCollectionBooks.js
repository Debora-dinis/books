//Get all books from the selected Collection
const db = require("../../Database/Database.js");
const listCollectionBooks = (req, res) => {
  const { table_name } = req.body;

  const query = `
      Select * From ${table_name}
    `;

  db.all(query, [], function (err, results) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
};

module.exports = listCollectionBooks;
