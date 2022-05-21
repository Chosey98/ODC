import conn from '../conn';
const { Student, Enroll } = conn.models;
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
	const achievements = student.Enrolls.filter(
		(enroll) => enroll.status === 'approved'
	);
	student.dataValues.achievements = achievements;
	return res.status(200).send({
		success: true,
		message: 'Student fetched successfully',
		data: {
			student,
			enrolls: student.Enrolls,
		},
	});
};
