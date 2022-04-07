import conn from '../conn';
const { Student } = conn.models;
export default async (req, res) => {
	const student = await Student.findOne({
		where: {
			id: req.user.id,
		},
		attributes: {
			exclude: ['passwordHash'],
		},
	});
	return res.status(200).send({
		success: true,
		data: student,
	});
};
