// import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(
	'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'
);
async function forgetPassword(req, res) {
	const { ResetToken } = req.db.models;
	const { email } = req.body;
	if (!email) {
		return req.responses.badRequest(
			res,
			'ValidationError',
			'Missing email field'
		);
	}
	if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
		return req.responses.badRequest(
			res,
			'ValidationError',
			'Invalid email'
		);
	}
	const { Student } = req.db.models;
	const user = await Student.findOne({
		where: {
			email: email,
		},
	});
	if (!user) {
		return req.responses.notFound(res, 'There is no user with this email');
	}
	const token = req.helper.generateToken();
	const msg = {
		from: 'bosayousef981@gmail.com',
		to: email,
		subject: 'Reset Password',
		html: `Your 4 digit code: <h1>${token}</h1>`,
	};
	await sgMail.send(msg);
	const previousResetTokens = await ResetToken.findAll({
		where: {
			userId: user.id,
		},
	});
	if (previousResetTokens.length > 0) {
		await previousResetTokens.forEach(async (token) => {
			await token.destroy();
		});
	}
	await ResetToken.create({
		userId: user.id,
		resetToken: token,
		resetTokenExpiry: Date.now() + 900000,
	});
	return res.status(200).send({
		success: true,
		message: 'Please check your email for the password reset link',
		data: {},
	});
}

export default forgetPassword;
