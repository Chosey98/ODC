class Responses {
	static async success(res, message, data) {
		res.status(200).json({
			success: true,
			message: message,
			data: data || {},
		});
	}
	static async created(res, message, data) {
		res.status(201).json({
			success: true,
			message: message,
			data: data || {},
		});
	}
	static async badRequest(res, code, message) {
		res.status(400).json({
			success: false,
			message: message,
		});
	}
	static async notFound(res, message) {
		res.status(404).json({
			success: false,
			message: message,
		});
	}
	static async forbidden(res, message) {
		res.status(403).json({
			success: false,
			message: message,
		});
	}
	static async conflict(res, message) {
		res.status(409).json({
			success: false,
			message: message,
		});
	}
}

export default Responses;
