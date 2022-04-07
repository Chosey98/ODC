import conn from '../../../conn';
const { Course } = conn.models;
export default async (req, res) => {
	const { id } = req.params;
	const { name, categoryId, level, enrollable } = req.body;
	if (isNaN(id)) {
		return res.status(400).send({
			success: false,
			message: 'id must be a number',
		});
	}
	if (!name && !categoryId && !level && !enrollable) {
		return res.status(400).send({
			success: false,
			message: 'name, categoryId, level, and enrollable are required',
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
	const updatedCourse = await course.update({
		category_id: !categoryId ? course.category_id : categoryId,
		course_name: !name ? course.course_name : name,
		course_level: !level ? course.course_level : level,
		enrollable: !enrollable ? course.enrollable : enrollable,
	});
	return res.status(200).send({
		success: true,
		data: updatedCourse,
	});
};
