import conn from '../../../conn';
const { Categories } = conn.models;
export default async (req, res) => {
	const { name } = req.body;

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
	await Categories.create({
		category_name: name,
	});
	return res.status(200).send({
		success: true,
	});
};
