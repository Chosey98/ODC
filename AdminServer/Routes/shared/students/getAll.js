import conn from '../../../conn';
const { Student } = conn.models;
export default async (req, res) => {
	const stds = await Student.findAll({
		attributes: { exclude: ['passwordHash'] },
	});

	return res.status(200).send({
		success: true,
		message: 'Students found',
		data: stds,
	});
};
