import conn from '../../../conn';
const { Categories } = conn.models;
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
	});
	if (!categories) {
		return res.status(404).json({
			success: false,
			message: 'Category does not exist',
		});
	}
	await categories.destroy();
	return res.status(200).send({
		success: true,
		message: 'Category deleted successfully',
	});
};
