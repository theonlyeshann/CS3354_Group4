// Load environment variables
const { loadEnvFile } = require('node:process');
loadEnvFile('./keysync/server/.env');

db = require('./database.js');

function loginUser(req, res) {
  user = req.body.username;
  pw = req.body.password;

  db.pool.getConnection(function(err, con) {
    if (err) throw err;
    con.query(`SELECT UserID, Username, Password FROM ${process.env.LOGIN_TABLE_NAME} WHERE Username = '${user}'`, (err, results) => {
      if (err)  {
        res.status(500).send(`Error encountered whilst looking for user: ${err}`);
      }
      else if (results.length == 0) {
        res.status(404).send("Could not find username");
      }
      else if (results[0].Password == pw) {
        req.session.userId = results[0].UserID;
        // req.session.save(function() {
        //   if (!req.session.userId)  {
        //     console.log("Login could not be stored in session storage");
        //   }
        //   else  {
        //     res.redirect("/main"); 
        //   }
        // });
        res.redirect("/main"); 
      }
      else  {
        res.status(400).send("Incorrect password");
      }
    });
    con.release();
  });
}

module.exports = {
  loginUser
}