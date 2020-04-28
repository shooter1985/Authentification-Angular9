let nodemailer = require('nodemailer')
let dotenv = require('dotenv').config()

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
  service: 'Gmail',
  auth: {
    user: process.env.USERMAIL,
    pass: process.env.PASSMAIL
  }
});

var sendMail = (req, res) => {

    var mailOptions = {
        from: req.body.email,
        replyTo: req.body.email,
        to: 'merzouk1985@gmail.com',
        subject: 'Sending Email using Node.js',
        html: `<h1>${req.body.message}</h1>`
    };
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        res.status(401).send("Erreur d'envoi de l'email"+error);
    } else {
        res.status(200).send({info:info});
    }
    });
}

module.exports = sendMail