import faker from '@faker-js/faker';
import bcrypt from 'bcrypt';
export default async (conn) => {
	const { Admin, Role, Categories, Student } = conn.models;
	console.log('Db Init');
	await conn.sync({ force: true });
	const adminRole = await Role.create({
		role_name: 'admin',
	});
	const admin = await Admin.create({
		admin_name: faker.name.firstName(),
		// email: faker.internet.email(),
		email: 'testemail@gmail.com',
		passwordHash: bcrypt.hashSync('test1234', 10),
		admin_phone: faker.phone.phoneNumber('+201#########'),
		role_id: adminRole.id,
	});
	const category = await Categories.create({
		category_name: 'Back-End',
	});
	const user = await Student.create({
		student_name: faker.name.firstName(),
		email: faker.internet.email(),
		passwordHash: bcrypt.hashSync('test1234', 10),
		student_phone: faker.phone.phoneNumber('+201#########'),
		student_address: faker.address.streetAddress(),
	});
};
