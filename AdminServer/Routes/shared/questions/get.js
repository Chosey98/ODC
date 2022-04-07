import conn from '../../../conn';
const { Question } = conn.models;
export default async (req, res) => {
	const { id } = req.params;
	if (isNaN(id)) {
		return res.status(400).send({
			sucess: false,
			message: 'id must be a number',
		});
	}
	const question = await Question.findOne({
		where: {
			id,
		},
	});
	if (!question) {
		return res.status(404).send({
			success: false,
			message: 'Question not found',
		});
	}
	return res.status(200).send({
		success: true,
		data: question,
	});
};
