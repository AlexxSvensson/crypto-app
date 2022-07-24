const makeId = () => {
  let ID = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for ( var i = 0; i < 12; i++ ) {
    ID += characters.charAt(Math.floor(Math.random() * 36));
  }
  return ID;
}
const sendEmail = require("../mail/sendMail");

module.exports = function(app, db){
  app.post('/restorationMail/', async (req, res) => {
    try {
      const id = makeId();
      await db.collection("restorationLinks").insertOne({username: data.username, id: id, createdAt: new Date()});
      const user = await db.findOne({username: data.username});
      sendEmail(user.email, id);
      res
        .status(200)
        .send({message: "Login succeded"});
    } catch (err) {
      res
        .status(500)
        .send({message: "Something went wrong."});
    }
  });
}