module.exports = function(app){
  const {verify} = require("../jwt/verify")
  app.get('/validateToken/', async (req, res) => {
    try {
      const token = req.cookies.accessToken;
      const valid = await verify(token);
      console.log(valid)
      res.status(200).send({message: valid ? true : false});
    } catch(err) {
      res.status(500).send({message: err});
    }
  });
}