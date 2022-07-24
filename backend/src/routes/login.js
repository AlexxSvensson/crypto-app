module.exports = function(app, db){
  const {sign} = require("../jwt/sign");
  const bcrypt = require('bcryptjs');

  app.post('/login/', async (req, res) => {
    const data = req.body;

    console.log(data)

    const user = await db.collection("users").findOne({username: data.username});
    if (!user) {
      res
        .status(400)
        .send({message: "User does not exist."});
        return;
    }

    const passwordCompare = await bcrypt.compare(data.password, user.password);
    
    if (!passwordCompare) {
      res
        .status(400)
        .send({message: "Incorrect password."});
        return;
    }

    const token = await sign("test", "test", true); 
    res
      .cookie('accessToken', token, { httpOnly: true, sameSite: 'None', secure: true })
      .status(200)
      .send({message: "Login succeded"});
  });
}