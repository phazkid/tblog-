let nodemailer = require('nodemailer')
const htmlToText = require('html-to-text')
const ejs = require('ejs')
 

const sendEmail =  async (options) => {
    /// 1) create a transporter
     /////if in development use MailTrap
///if(process.env.NODE_ENV === 'development'){
     const transporter = nodemailer.createTransport({
      host:  process.env.EMAIL_HOST,
      port:  process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
 // }else{
    /// use sendgrid 
  //}
  
    ///render html template base on pug
    const html = await ejs.renderFile(`${__dirname}/../views/email/${options.template}.ejs`, {user: options.user, url: options.url})
   
   
  
     //2) create mailoption 
     let mailOption = {
         from: 'phazkid360@gmail.com',
         to: options.user.email, 
         subject: options.subject,
         html,
         //text: options.message,
        // url : options.url
  
     }
     
     //3) send the email
      await transporter.sendMail(mailOption)
    
  
  }
  
  module.exports = sendEmail
  
  
  