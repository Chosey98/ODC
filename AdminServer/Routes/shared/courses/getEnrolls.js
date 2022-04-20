import conn from '../../../conn';
const { Enroll, Course } = conn.models;
export default async (req, res) => {
	const { id } = req.params;
	const { filter } = req.query;
	if (isNaN(id)) {
		return res.status(400).send({
			success: false,
			message: 'id must be a number',
		});
	}
	if (filter) {
		if (
			filter !== 'pending' ||
			filter !== 'approved' ||
			filter !== 'rejected'
		) {
			return res.status(400).send({
				success: false,
				message: 'filter must be pending, approved or rejected',
			});
		}
	}
	const course = await Course.findOne({
		where: {
			id,
		},
	});
	if (!course) {
		return res.status(400).send({
			success: false,
			message: 'Course does not exist',
		});
	}
	const enrolls = await Enroll.findAll({
		where: {
			course_id: course.id,
		},
	});
	return res.status(200).send({
		success: true,
		message: 'Enrolls found successfully',
		data: enrolls.filter((e) => (!filter ? e : e.status === filter)),
	});
};
