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
            pass: 'qaio iulk gmqj uppq'  
        }
    });
    
    const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'Lütfen mailinizi doğrulayınız!!!',
        text: `E-postanızı doğrulamak için bu bağlantıya tıklayın: ${process.env.CLIENT_URL}`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;