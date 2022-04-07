import conn from '../../conn';
const { Course, Enroll } = conn.models;
export default async (req, res) => {
	const { id } = req.params;
	const { cancel } = req.body;
	if (isNaN(id)) {
		return res.status(400).send({
			success: false,
			message: 'id must be a number',
		});
	}

	const enroll = await Enroll.findOne({
		where: {
			student_id: req.user.id,
			status: 'pending',
		},
	});
	if (enroll) {
		if (cancel !== undefined) {
			await enroll.update({
				status: 'cancelled',
			});
			return res.status(200).send({
				success: true,
				message: 'Cancelled enroll successfully',
			});
		}
		return res.status(400).send({
			success: false,
			message:
				'User already enrolled in a course, please check your email throughout the week to get your approval',
		});
	}
	const course = await Course.findOne({
		where: {
			id,
		},
	});
	if (!course) {
		return res.status(404).send({
			success: false,
			message: 'Course not found',
		});
	}
	const newEnroll = await Enroll.create({
		student_id: req.user.id,
		course_id: id,
	});
	return res.status(200).send({
		success: true,
		data: newEnroll,
	});
};
