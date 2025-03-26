const db = require("../../../../Database/Database.js");

const booksBycategory = (req, res) => {
  const query = `
    WITH RECURSIVE split(category, rest, google_id) AS (
      -- Base case: Extract the first category
      SELECT 
        TRIM(substr(categories, 0, instr(categories || ',', ','))) AS category,
        TRIM(substr(categories, instr(categories || ',', ',') + 1)) AS rest,
        google_id
      FROM Read
      WHERE categories IS NOT NULL

      UNION ALL

      -- Recursive case: Extract subsequent categories
      SELECT 
        TRIM(substr(rest, 0, instr(rest || ',', ','))) AS category,
        TRIM(substr(rest, instr(rest || ',', ',') + 1)) AS rest,
        google_id
      FROM split
      WHERE rest != ''
    )
    SELECT category, COUNT(DISTINCT google_id) AS book_count
    FROM split
    WHERE category IS NOT NULL AND category != ''
    GROUP BY category
    ORDER BY book_count DESC;
  `;

  db.all(query, (error, result) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(result);
    }
  });
};

module.exports = booksBycategory;
