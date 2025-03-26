//Get the number of books read this year
const db = require("../../../../../Database/Database.js");
const booksReadThisYear = (req, res) => {
  db.all(
    "SELECT COUNT(*) AS books_finished_this_year FROM Read WHERE strftime('%Y', endDate) = strftime('%Y', 'now');",
    (error, result) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json(result);
      }
    }
  );
};

module.exports = booksReadThisYear;
