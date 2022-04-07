import conn from '../conn';
import bcrypt from 'bcrypt';
const { Student } = conn.models;
export default async (req, res) => {
	const { name, email, password, phone, address } = req.body;
	let student = await Student.findOne({
		where: {
			id: req.user.id,
		},
	});
	if (password) {
		if (password.length < 8) {
			return res.status(400).send({
				success: false,
				message: 'Password must be at least 8 characters',
			});
		}
		if (password.length > 32) {
			return res.status(400).send({
				success: false,
				message: 'Password cannot be more than 32 characters',
			});
		}
		const upperCase = new RegExp(/[A-Z]/g);
		if (upperCase.test(password) == false) {
			return res.status(400).send({
				success: false,
				message: 'Password must contain at least one uppercase letter',
			});
		}
		const lowerCase = new RegExp(/[a-z]/g);
		if (lowerCase.test(password) == false) {
			return res.status(400).send({
				success: false,
				message: 'Password must contain at least one lowercase letter',
			});
		}
		const number = new RegExp(/\+[0-9]/g);
		if (number.test(password) == false) {
			return res.status(400).send({
				success: false,
				message: 'Password must contain at least one number',
			});
		}
		const special = new RegExp(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g);
		if (special.test(password) == false) {
			return res.status(400).send({
				success: false,
				message: 'Password must contain at least one special character',
			});
		}
	}
	const updatedStudent = await student.update(
		{
			student_name: !name ? student.student_name : name,
			email: !email ? student.email : email,
			passwordHash: !password
				? student.passwordHash
				: bcrypt.hashSync(password, 10),
			student_phone: !phone ? student.student_phone : phone,
			student_address: !address ? student.student_address : address,
		},
		{
			attributes: {
				exclude: ['passwordHash'],
			},
		}
	);
	delete updatedStudent.dataValues.passwordHash;
	return res.status(200).send({
		success: true,
		data: updatedStudent,
	});
};
