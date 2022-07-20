module.exports = function(app){
  const {sign} = require("../jwt/sign")

  app.get('/test/', async (req, res) => {
    const token = await sign("test", "test", true); 

    res
      .cookie('accessToken', token,  { httpOnly: true, sameSite: 'None', secure: true })
      .status(200)
      .send({data: "123"});
  });
}