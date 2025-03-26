//@ts-check
//Get the number of books in read
const db = require("../../../Database/Database.js");

const readBooks = (req, res) => {
  db.all("SELECT COUNT(google_id) AS NoOfReadBooks FROM Read;", (error, result) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json({ count: result[0]?.NoOfReadBooks || 0 });
    }
  });
};

module.exports = readBooks;