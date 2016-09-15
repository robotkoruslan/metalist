import * as nodemailer from "nodemailer";
import * as config from "../config/environment"

console.log('mailer_email', config.mailer.from);

var transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.mailer.auth.user,
        pass: config.mailer.auth.pass
    }
});

export function sendMail(to, subject, content) {
    var success = true;
    var mailOptions = {
        from: config.mailer.from,
        to: to,
        replyTo: config.mailer.from,
        subject: subject,
        html: content
    };

    transport.sendMail(mailOptions, (error, response) => {
        if(error){
            console.log('[ERROR] Message NOT sent: ', error);
            success = false;
        } else {
            console.log('[INFO] Message Sent: ' + response.message);
        }
    });
}
