import conn from '../../conn';
const { Enroll } = conn.models;
export default async (req, res) => {
	const { id } = req.params;
	if (isNaN(id)) {
		return res.status(400).send({
			success: false,
			message: 'id must be a number',
		});
	}
	const enroll = await Enroll.findOne({
		where: {
			student_id: req.user.id,
		},
	});
	if (!enroll) {
		return res.status(400).send({
			success: false,
			message: 'You are not enrolled in this course',
		});
	}

	return res.status(200).send({
		success: true,
		message: 'Status fetched successfully',
		data: {
			status: enroll.status,
		},
	});
};
