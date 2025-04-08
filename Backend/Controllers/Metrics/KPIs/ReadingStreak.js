//@ts-check
//Get the number of books in read
const db = require("../../../Database/Database.js");

const readingStreak = (req, res) => {
  db.all(
    `
   WITH reading_days AS (
  SELECT DISTINCT DATE(date) AS read_date
  FROM daily_reading
  WHERE pages > 0
    AND DATE(date) <= DATE('now')
),
numbered AS (
  SELECT 
    read_date,
    ROW_NUMBER() OVER (ORDER BY read_date) AS rn
  FROM reading_days
),
grouped AS (
  SELECT 
    read_date,
    rn,
    julianday(read_date) - rn AS grp
  FROM numbered
),
streaks AS (
  SELECT 
    MIN(read_date) AS start_date,
    MAX(read_date) AS end_date,
    COUNT(*) AS streak_length
  FROM grouped
  GROUP BY grp
)
SELECT IFNULL((
  SELECT streak_length
  FROM streaks
  WHERE end_date >= DATE('now', '-1 day')
  ORDER BY end_date DESC
  LIMIT 1
), 0) AS streak_length;



    `,
    (error, result) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json({ count: result[0]?.streak_length || 0 });
      }
    }
  );
};

module.exports = readingStreak;
