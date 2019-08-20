var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
import config from '../config/environment';


var transporter = nodemailer.createTransport(smtpTransport({
	host: config.email_config.SMTP_HOST,
	port: config.email_config.SMTP_PORT,
	tls: {
		rejectUnauthorized: false
	},
	auth: {
		user: config.email_config.SMTP_AUTH_USER,
		pass: config.email_config.SMTP_AUTH_PASS
	}
}));


module.exports = function(job, done) {
	var emailObj = job.attrs.data.email;
	console.log("emailObj in job notifications", emailObj);

	transporter.sendMail(emailObj, (err, success) => {
		if (err) {
			console.log("Email Error:::", err);
			done();
		} else {
			console.log("Email Sent Successfully", success);
			done();
		}

	})
}




