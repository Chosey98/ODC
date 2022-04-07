const unless = function (middleware, paths) {
	return function (req, res, next) {
		const pathCheck = paths.some((path) => path === req.path);
		pathCheck ? next() : middleware(req, res, next);
	};
};
export default unless;
