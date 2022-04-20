import conn from '../../../conn';
const { Student } = conn.models;
export default async (req, res) => {
	let { id } = req.params;
	if (isNaN(id)) {
		return res.status(400).json({
			success: false,
			message: 'id must be a number',
		});
	}
	const std = await Student.findOne({
		where: {
			id,
		},
		attributes: { exclude: ['passwordHash'] },
	});
	if (!std) {
		return res.status(404).send({
			success: false,
			message: 'Student not found',
		});
	}
	return res.status(200).send({
		success: true,
		message: 'Student found',
		data: std,
	});
};
