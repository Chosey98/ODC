import 'dotenv/config';
import conn from './conn';
import express from 'express';
import bodyParser from 'body-parser';
import AdminRouter from './Routes/admin/AdminRouter';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import initilalizeDb from './util/initilalizeDb';
import SharedRouter from './Routes/shared/SharedRouter';
import cron from 'node-cron';
const JwtStrategy = Strategy;
const app = express();
const { Admin, Role } = conn.models;
try {
	await conn.authenticate();
	console.log('Connection has been established successfully.');
	// await initilalizeDb(conn);
	await conn.sync();
} catch (err) {
	console.error(err);
}
passport.use(
	'jwt-admin',
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.SECRET_KEY,
			jsonWebTokenOptions: {
				maxAge: '1h',
			},
		},
		async (payload, done) => {
			const admin = await Admin.findOne({
				where: {
					id: payload.id,
				},
				include: Role,
			});
			if (admin && admin.Role.role_name === 'admin') {
				return done(null, admin);
			}
			return done(null, false);
		}
	)
);
passport.use(
	'jwt-shared',
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.SECRET_KEY,
			jsonWebTokenOptions: {
				maxAge: '1h',
			},
		},
		async (payload, done) => {
			const admin = await Admin.findOne({
				where: {
					id: payload.id,
				},
				include: Role,
			});
			if (admin) {
				return done(null, { ...admin, ...payload });
			}
			return done(null, false);
		}
	)
);
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/admin', AdminRouter);
app.use('/', SharedRouter);
app.listen(8080, () => console.log('Server is running on port 8080'));

cron.schedule('*/10 * * * * *', async () => {
	const { ExpiredToken } = conn.models;
	const expiredTokens = await ExpiredToken.findAll({
		where: {
			eat: {
				[Op.lt]: new Date.now(),
			},
		},
	});
	for (let token of expiredTokens) {
		await token.destroy();
	}
});

cron.schedule('*/10 * * * * *', async () => {
	const { UserExam, Enroll, Revision } = conn.models;
	const userExams = await UserExam.findAll({
		where: {
			eat: {
				[Op.lt]: new Date.now(),
			},
		},
		include: [Revision],
	});
	for (let exam of userExams) {
		await exam.update({
			expired: true,
		});
		const enroll = await Enroll.findOne({
			where: {
				student_id: exam.Revision.student_id,
			},
		});
		await enroll.update({
			status: 'submitted',
		});
	}
});
