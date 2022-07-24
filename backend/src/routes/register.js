module.exports = function(app, db){
const bcrypt = require('bcryptjs');

app.post('/register/', async (req, res) => {
  try {
    const data = req.body;
    
    console.log(data)

    const user = await db.collection("users").findOne({username: data.username});
    if (user) {
      res
      .status(400)
      .send({message: "User already exists."});
    } else {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.password, salt);
        await db.collection("users").insertOne({username: data.username, password: hash});
        res
          .status(200)
          .send({message: "Login succeded"});
      }
    } catch (err) {
      res
        .status(500)
        .send({message: "Something went wrong."});
    }
  });
}