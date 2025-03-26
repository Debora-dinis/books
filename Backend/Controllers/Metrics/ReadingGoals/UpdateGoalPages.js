//@ts-check

const db = require("../../../Database/Database");

//Update the number of pages in reading goals
const updatePagesGoal = (req, res ) => {
    const{pages}= req.body;
    db.run(
      `UPDATE goals SET pages = ? WHERE id = 1`,
      [pages],
      function (err) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json({ message: "Daily page goal updated", id: this.lastID });
        }
      }
    );
  };

  module.exports = updatePagesGoal