const nodemailer = require('nodemailer')

const sendMail = async (email,subject,text) => {
    try{
        const transporter = nodemailer.createTransport({
            host:process.env.SMTP_HOST,
            port:process.env.SMTP_PORT,
            secure:false,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })
        await transporter.sendMail({
            from:process.env.MAIL_USER,
            to:email,
            subject:subject,
            text:text
        })
        console.log('email sent sucessfully')
    }catch(error){
        console.log(error,'email not send')
    }
}

module.exports = sendMail