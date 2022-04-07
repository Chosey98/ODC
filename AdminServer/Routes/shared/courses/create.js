import conn from '../../../conn';
const { Course, Categories } = conn.models;
export default async (req, res) => {
	const { name, level, categoryId } = req.body;
	if (!name || !level || !categoryId) {
		return res.status(400).send({
			success: false,
			message: 'name, level, categoryId are required',
		});
	}
	const course = await Course.findOne({
		where: {
			course_name: name,
		},
	});
	if (course) {
		return res.status(400).send({
			success: false,
			message: 'Course already exists',
		});
	}
	const categories = await Categories.findOne({
		where: {
			id: categoryId,
		},
	});
	if (!categories) {
		return res.status(400).send({
			success: false,
			message: 'Category does not exist',
		});
	}
	const newCourse = await Course.create({
		course_name: name,
		course_level: level,
		category_id: categories.id,
		admin_id: req.user.id,
	});
	return res.status(200).send({
		success: true,
		data: newCourse,
	});
};
