module.exports = function(app){
  const {verify} = require("../jwt/verify")
  app.get('/validateToken/', async (req, res) => {
    try {
      const token = req.cookies?.accessToken
      const valid = await verify(token); 
      res.status(200).send({success: true, data: valid ? true : false});
    } catch(err) {
      res.status(500).send({success: false, data: err});
    }
  });
}