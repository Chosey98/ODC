import conn from '../../conn';
const { Categories, Course, Admin } = conn.models;
export default async (req, res) => {
	const { id } = req.params;
	if (isNaN(id)) {
		return res.status(400).json({
			success: false,
			message: 'id must be a number',
		});
	}
	const categories = await Categories.findOne({
		where: {
			id,
		},
		include: {
			model: Course,
			as: 'Courses',
			attributes: {
				exclude: ['createdAt', 'updatedAt'],
			},
			include: {
				model: Admin,
				as: 'Admin',
				attributes: {
					exclude: [
						'passwordHash',
						'admin_phone',
						'createdAt',
						'updatedAt',
						'role_id',
						'id',
					],
				},
			},
		},
	});
	if (!categories) {
		return res.status(404).json({
			success: false,
			message: 'Category not found',
		});
	}
	return res.status(200).send({
		success: true,
		message: 'Category found successfully',
		data: categories,
	});
};
