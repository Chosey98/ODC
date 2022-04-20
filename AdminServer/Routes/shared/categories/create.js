import conn from '../../../conn';
const { Categories } = conn.models;
export default async (req, res) => {
	const { name } = req.body;
	if (!name) {
		return res.status(400).send({
			success: false,
			message: 'name is required',
		});
	}
	if (!name.match(/^[a-zA-Z ]{2,32}$/)) {
		return res.status(400).send({
			success: false,
			message: 'name must be alphabetic and contain 2-32 characters',
		});
	}
	const categories = await Categories.findOne({
		where: {
			category_name: name,
		},
	});
	if (categories) {
		return res.status(404).json({
			success: false,
			message: 'Category already exists',
		});
	}
	const category = await Categories.create({
		category_name: name,
	});
	return res.status(200).send({
		success: true,
		message: 'Category created successfully',
		data: category,
	});
};
