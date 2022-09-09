const nodemailer = require('nodemailer');

const MAIL = {
  ACCOUNT: 'nodemailer',
  PASSWORD: 'fuydxbuzmvfkuezz',
};

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'longpt99.it@gmail.com',
    pass: 'fuydxbuzmvfkuezz',
  },
});

transporter
  .sendMail({
    from: '"Your Name" <youremail@gmail.com>', // sender address
    to: 'longpt@vmodev.com', // list of receivers
    subject: 'Medium @edigleyssonsilva ✔', // Subject line
    html: "<b>There is a new article. It's about sending emails, check it out!</b>", // html body
  })
  .then((info) => {
    console.log({ info });
  })
  .catch(console.error);
