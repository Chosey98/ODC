import conn from '../../conn';
const { Exam, Question } = conn.models;
export default async (req, res) => {
	const exam = await Exam.findOne({
		where: {
			id: req.params.id,
		},
		include: [Question],
	});
	return res.status(200).send({
		success: true,
		message: 'Exam fetched successfully',
		data: exam,
	});
};
