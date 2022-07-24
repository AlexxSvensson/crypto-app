const nodemailer = require("nodemailer");

const mailTransport = nodemailer.createTransport(

);

module.exports = async function(email, subject, text){
  try {
  const mailOptions = {
    from: `"-IMPORTANT" alexexsvensson@gmail.com`,
    to: "alexexsvensson@gmail.com",
    subject: "subject",
    text: "text",
  };

  return mailTransport.sendMail(mailOptions);
} catch (error) {
  console.log("error", error);
  res.status(501).send(`Fehler! `);
  return;
}
};