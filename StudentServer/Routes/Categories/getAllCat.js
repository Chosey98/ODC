import conn from '../../conn';
const { Categories } = conn.models;
export default async (req, res) => {
	const categories = await Categories.findAll();
	return res.status(200).send({
		success: true,
		message: 'Categories found successfully',
		data: categories,
	});
};
