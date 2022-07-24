const nodemailer = require("nodemailer");

const mailTransport = nodemailer.createTransport(
  process.env.SMTP_URL
);

module.exports = async function(email, id){
  try {
  const mailOptions = {
    from: `crypto-app-mailer`,
    to: "alexexsvensson@gmail.com",
    subject: "Password restoration",
    text: "text",
  };

  return mailTransport.sendMail(mailOptions);
} catch (error) {
  console.log("error", error);
  res.
    status(501).
    send({message: "Something went wrong!"});
  return;
}
};