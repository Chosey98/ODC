import conn from '../../../conn';
const { Course } = conn.models;
export default async (req, res) => {
	const { id } = req.params;
	if (isNaN(id)) {
		return res.status(400).send({
			success: false,
			message: 'id must be a number',
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
	await course.destroy();
	return res.status(200).send({
		success: true,
		message: 'Course deleted successfully',
	});
};
