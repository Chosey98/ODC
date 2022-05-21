import conn from '../../conn';
const { Enroll } = conn.models;
export default async (req, res) => {
	const enroll = await Enroll.findOne({
		student_id: req.user.id,
		status: 'exam_pending',
	});
	if (!enroll) {
		return res.status(400).json({
			success: false,
			message: 'You are not enrolled in this course',
		});
	}
	if (enroll.status !== 'exam_pending') {
		return res.status(400).json({
			success: false,
			message: 'You have already taken this exam',
		});
	}
	if (enroll.status == 'rejected') {
		return res.status(400).json({
			success: false,
			message: 'You have been rejected from this course',
		});
	}
	await enroll.update({
		status: 'hr_pending',
	});
	return res.status(200).json({
		success: true,
		message: 'Status updated successfully',
	});
};
