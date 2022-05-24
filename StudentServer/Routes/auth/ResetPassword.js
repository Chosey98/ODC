import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { joiPassword } from 'joi-password';
import Joi from 'joi';
async function resetPassword(req, res) {
	const { ResetToken, Student } = req.db.models;
	const { error } = validateBody(req.body);
	if (error) {
		return req.responses.badRequest(
			res,
			'ValidationError',
			error.details[0].message
		);
	}
	const { password, otp, email } = req.body;
	const user = await Student.findOne({
		where: { email },
	});
	if (!user) {
		return req.responses.notFound(res, 'There is no user with this email');
	}
	const resetToken = await ResetToken.findOne({
		where: {
			userId: user.id,
			resetToken: otp,
		},
	});
	if (!resetToken) {
		return req.responses.badRequest(res, 'ValidationError', 'Invalid otp');
	}
	await user.update({
		passwordHash: bcrypt.hashSync(password, 10),
	});
	await resetToken.destroy();
	// Create tokens
	const accessToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
		expiresIn: 2 * 24 * 60 * 60,
	});
	const refreshToken = jwt.sign(
		{ id: user.id, refresh: true },
		process.env.SECRET_KEY,
		{ expiresIn: 7 * 24 * 60 * 60 }
	);
	return req.responses.success(res, 'Password reset successfully', {
		access_token: accessToken,
		refresh_token: refreshToken,
	});
}

export default resetPassword;

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
		password: joiPassword
			.string()
			.min(8)
			.max(32)
			.required()
			.noWhiteSpaces()
			.minOfUppercase(1)
			.minOfLowercase(1)
			.minOfNumeric(1)
			.messages({
				'string.empty': `password cannot be empty`,
				'string.min': `password length must be equal or higher than {#limit} characters`,
				'string.max': `password length must not exceed {#limit} characters`,
				'any.required': `password is a required field`,
				'password.minOfUppercase':
					'{#label} should contain at least {#min} uppercase character',
				'password.minOfLowercase':
					'{#label} should contain at least {#min} lowercase character',
				'password.minOfNumeric':
					'{#label} should contain at least {#min} numeric character',
				'password.noWhiteSpaces':
					'{#label} should not contain white spaces',
			}),
	});
	return schema.validate(body, { abortEarly: true });
}
