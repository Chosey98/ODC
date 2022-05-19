import Joi from 'joi';
async function verifyOtp(req, res) {
	const { ResetToken, Student } = req.db.models;
	const { otp, email } = req.body;
	const { error } = validateBody(req.body);
	if (error) {
		return req.responses.badRequest(
			res,
			'ValidationError',
			error.details[0].message
		);
	}
	const user = await Student.findOne({
		where: { email },
	});
	if (!user) {
		return req.responses.notFound(res, 'User not found');
	}
	const resetToken = await ResetToken.findOne({
		where: {
			userId: user.id,
			resetToken: otp,
		},
	});
	if (!resetToken) {
		return req.responses.badRequest(res, 'ValidationError', 'Invalid OTP');
	}
	if (resetToken.expiry < Date.now()) {
		return req.responses.badRequest(res, 'ValidationError', 'OTP expired');
	}
	return req.responses.success(res, 'OTP verified');
}

export { verifyOtp as default };

function validateBody(body) {
	const schema = Joi.object({
		otp: Joi.string()
			.pattern(/^[0-9]{4}$/)
			.required()
			.messages({
				'string.pattern.base': 'otp must be 4 digits',
				'string.empty': 'otp cannot be empty',
				'any.required': 'otp is required',
			}),
		email: Joi.string().email().required().messages({
			'string.email': 'email must be a valid email',
			'string.empty': 'email cannot be empty',
			'any.required': 'email is required',
		}),
	});
	return schema.validate(body, { abortEarly: true });
}
