// utils/emailUtils.js
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const sendVerificationEmail = async (user) => {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
   

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            /* çift faktörlü dogrulama vardı bende bunu güvenlik >  uygulama şifreleri kısmından ayarladım */ 
            pass: 'wnhe uunl jcoa czhc'  
        }
    });
    
    const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'Please confirm your email',
        text: `Click on this link to verify your email: ${process.env.CLIENT_URL}/?token=${token}`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;
