import conn from '../../../conn';
const { Course, Enroll, Student } = conn.models;
export default async (req, res) => {
	const { id } = req.params;
	const { acceptEnroll } = req.body;
	if (isNaN(id)) {
		return res.status(400).json({
			success: false,
			message: 'id must be a number',
		});
	}
	if (acceptEnroll === undefined) {
		return res.status(400).send({
			success: false,
			message: 'acceptEnroll is required',
		});
	}
	if (typeof acceptEnroll !== 'boolean') {
		return res.status(400).send({
			success: false,
			message: 'acceptEnroll must be a boolean',
		});
	}
	const enroll = await Enroll.findOne({
		where: {
			id,
		},
		include: [Student, Course],
	});
	if (!enroll) {
		return res.status(404).send({
			success: false,
			message: 'Enrollment not found',
		});
	}
	if (acceptEnroll) {
		await enroll.update({
			status: 'accepted',
		});
	} else {
		await enroll.update({
			status: 'failed',
		});
	}
	return res.status(200).send({
		success: true,
		message: `Enrollment's status updated to ${
			acceptEnroll ? 'accepted' : 'failed'
		}`,
	});
};
