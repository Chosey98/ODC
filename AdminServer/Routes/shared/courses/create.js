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
	if (!name.match(/^[a-zA-Z ]{2,32}$/)) {
		return res.status(400).send({
			success: false,
			message: 'name must be alphabetic and contain 2-32 characters',
		});
	}
	if (!level.match(/^[a-zA-Z ]{2,32}$/)) {
		return res.status(400).send({
			success: false,
			message: 'level must be alphabetic and contain 2-32 characters',
		});
	}
	if (isNaN(categoryId)) {
		return res.status(400).send({
			success: false,
			message: 'categoryId must be a number',
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
		message: 'Course created successfully',
		data: newCourse,
	});
};
