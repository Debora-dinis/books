//@ts-check
//Update the number of books in reading goals
const db = require("../../../Database/Database");
const updateBooksGoal = (req, res ) => {
    const{books}= req.body;
    db.run(
      `UPDATE goals SET books = ? WHERE id = 1`,
      [books],
      function (err) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json({ message: "Yearly book goal updated", id: this.lastID });
        }
      }
    );
  };

  module.exports = updateBooksGoal