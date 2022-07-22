module.exports = function(app){
  const {sign} = require("../jwt/sign")

  app.post('/login/', async (req, res) => {
    // check password

    const token = await sign("test", "test", true); 
    res
      .cookie('accessToken', token, { httpOnly: true, sameSite: 'None', secure: true })
      .status(200)
      .send({message: "Login succeded"});
  });
}