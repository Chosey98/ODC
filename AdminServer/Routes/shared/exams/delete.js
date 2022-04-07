import conn from '../../../conn';
const { Exam } = conn.models;
export default async (req, res) => {
	const { id } = req.params;
	if (isNaN(id)) {
		return res.status(400).json({
			success: false,
			message: 'id must be a number',
		});
	}
	const exam = await Exam.findOne({
		where: {
			id,
		},
	});
	if (!exam) {
		return res.status(404).json({
			message: 'Exam not found',
		});
	}
	await exam.destroy();
	return res.status(200).send({
		success: true,
		message: 'Exam deleted successfully',
	});
};
