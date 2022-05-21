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
		include: [Enroll],
	});
	return res.status(200).send({
		success: true,
		message: 'Student fetched successfully',
		data: {
			...student,
			achievements: student.Enrolls.filter(
				(enroll) => enroll.status === 'approved'
			),
		},
	});
};
