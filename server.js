const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const SENDGRID_API_KEY = "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";

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
        text: 'Hartelijk dank voor uw aanmelding bij The Green Volunteer Connect! Dit project is momenteel onderdeel van onze opleiding, maar we zijn vastbesloten om het verder te ontwikkelen en hopen u in de toekomst meer te kunnen bieden.' +

        'We waarderen uw interesse in ons initiatief en houden u graag op de hoogte van onze vorderingen.' +
        
        'Met vriendelijke groeten,' +
        
        'Het team van The Green Volunteer Connect'
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
