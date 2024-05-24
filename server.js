const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY2;

sgMail.setApiKey(SENDGRID_API_KEY);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/signup', (req, res) => {
    const email = req.body.email;
    console.log(email);

    const msg = {
        to: email,
        from: 'almousa.najib@gmail.com', 
        subject: 'Dank u voor je aanmelding',
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: sans-serif; }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #eee;
              border-radius: 5px;
            }
            h1 { color: #008000; } /* Green for The Green Volunteer Connect */
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Hartelijk dank voor uw aanmelding!</h1>
            <p>Hartelijk dank voor uw aanmelding bij The Green Volunteer Connect! Dit project is momenteel onderdeel van onze opleiding op school.</p>
            <p>We waarderen uw interesse in ons initiatief en houden u graag op de hoogte van onze vorderingen.</p>
            <p>Met vriendelijke groeten,</p>
            <p>Het team van The Green Volunteer Connect</p>
          </div>
        </body>
        </html>
      `
    };

    sgMail
        .send(msg)
        .then(() => {
            res.status(200).send({ success: true, message: 'Email sent' });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send({ success: false, message: 'Error sending email' });
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
