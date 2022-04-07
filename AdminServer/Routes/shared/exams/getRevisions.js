import conn from '../../../conn';
const { Revision, Exam } = conn.models;
export default async (req, res) => {
	const { id } = req.params;
	if (isNaN(id)) {
		return res.status(400).send({
			success: false,
			message: 'id must be a number',
		});
	}
	const revisions = await Revision.findAll({
		where: {
			exam_id: id,
		},
	});
	return res.status(200).send({
		success: true,
		data: revisions,
	});
};
