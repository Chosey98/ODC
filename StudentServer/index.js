import 'dotenv/config';
import conn from './conn';
import express from 'express';
import bodyParser from 'body-parser';
import StudentRouter from './Routes/StudentRouter';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

const JwtStrategy = Strategy;
const app = express();
const { Student } = conn.models;
try {
	await conn.authenticate();
	await conn.sync({});
	console.log('Connection has been established successfully.');
} catch (err) {
	console.error(err);
}

passport.use(
	'jwt',
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.SECRET_KEY,
			jsonWebTokenOptions: {
				maxAge: '1h',
			},
		},
		async (payload, done) => {
			const student = await Student.findOne({
				where: {
					id: payload.id,
				},
			});
			if (student) {
				return done(null, student);
			}
			return done(null, false);
		}
	)
);
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', StudentRouter);

app.listen(3000, () => console.log('Server is running on port 3000'));
