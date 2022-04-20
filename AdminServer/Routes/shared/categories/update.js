import conn from '../../../conn';
const { Categories } = conn.models;
export default async (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	if (isNaN(id)) {
		return res.status(400).json({
			success: false,
			message: 'id must be a number',
		});
	}
	if (!name) {
		return res.status(400).json({
			success: false,
			message: 'name is required',
		});
	}
	if (!name.match(/^[a-zA-Z ]{2,32}$/)) {
		return res.status(400).json({
			success: false,
			message: 'name must be alphabetic and contain 2-32 characters',
		});
	}
	const categories = await Categories.findOne({
		where: {
			id,
		},
	});
	if (!categories) {
		return res.status(404).json({
			success: false,
			message: 'Category does not exist',
		});
	}
	await categories.update({
		category_name: !name ? categories.name : name,
	});
	return res.status(200).send({
		success: true,
		message: 'Category updated successfully',
		data: categories,
	});
};
