export default async (req, res) => {
	return res.status(200).send({
		success: true,
		message: 'Privacy policy fetched successfully',
		data: {
			title: 'Privacy Policy',
			content: '<p>This is the privacy policy for the website.</p>',
		},
	});
};
