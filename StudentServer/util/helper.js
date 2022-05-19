import passport from 'passport';
function generateToken() {
	const token = Math.floor(1000 + Math.random() * 9000);
	return token;
}

function authenticateWithJWT(req, res, next) {
	passport.authenticate(
		'jwt',
		{ session: false },
		async (_smth, user, err) => {
			if (err) {
				console.log(err);
				if (err.name === 'TokenExpiredError') {
					return res.status(401).json({
						code: 'TokenExpired',
						message: 'Token expired',
					});
				} else if (err.name === 'JsonWebTokenError') {
					return res.status(401).json({
						code: 'InvalidToken',
						message: 'Invalid token',
					});
				} else if (err.message === 'No auth token') {
					return res.status(401).json({
						code: 'noToken',
						message: 'No token provided',
					});
				} else {
					return res.status(401).json({
						code: 'InvalidToken',
						message: 'Invalid token',
					});
				}
			}

			if (!user) {
				return res.status(401).send({
					code: 'InvalidToken',
					message: 'Invalid Token',
				});
			}
			const expiredToken = await req.db.models.ExpiredToken.findOne({
				where: {
					token: req.headers.authorization.split(' ')[1],
					tokenType: 'access',
				},
			});
			if (expiredToken) {
				return res.status(401).send({
					code: 'TokenRevoked',
					message: 'Token Revoked',
				});
			}
			req.user = user;
			next();
		}
	)(req, res, next);
}
export default { generateToken, authenticateWithJWT };
