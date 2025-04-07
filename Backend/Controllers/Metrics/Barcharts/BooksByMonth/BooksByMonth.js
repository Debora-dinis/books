const db = require("../../../../Database/Database");

const booksReadThisYearByMonth = (req, res) => {
  const query = `
    SELECT strftime('%m', startDate) AS month, COUNT(DISTINCT google_id) AS book_count
    FROM Read
    WHERE startDate IS NOT NULL
      AND strftime('%Y', startDate) = strftime('%Y', 'now')
    GROUP BY month
    ORDER BY month;
  `;

  db.all(query, (error, result) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(result);
    }
  });
};

module.exports = booksReadThisYearByMonth;
