import EnrollModel from './enroll';
import RevisionModel from './Revision';
import StudentModel from './student';
import ExamModel from './Exam';
import CourseModel from './Course';
import QuestionModel from './Question';
import AdminModel from './Admin';
import CategoriesModel from './Categories';
import TaskModel from './Task';
import ExpiredTokenModel from './ExpiredToken';
import RoleModel from './Role';
import UserExamModel from './UserExam';
export default (connection) => {
	const models = [
		EnrollModel,
		RevisionModel,
		StudentModel,
		ExamModel,
		CourseModel,
		QuestionModel,
		AdminModel,
		CategoriesModel,
		TaskModel,
		ExpiredTokenModel,
		RoleModel,
		UserExamModel,
	];
	for (let model of models) {
		model(connection);
	}
	const {
		Enroll,
		Revision,
		Student,
		Exam,
		Course,
		Question,
		Admin,
		Categories,
		Task,
		ExpiredToken,
		Role,
		UserExam,
	} = connection.models;

	// Students relationship
	Student.hasMany(Enroll, { foreignKey: 'student_id' });
	Enroll.belongsTo(Student, { foreignKey: 'student_id' });
	Student.hasMany(Revision, { foreignKey: 'student_id' });
	Revision.belongsTo(Student, { foreignKey: 'student_id' });

	// Exam relationship
	Exam.hasMany(Question, { foreignKey: 'exam_id' });
	Question.belongsTo(Exam, { foreignKey: 'exam_id' });
	// Courses relationship
	Course.hasMany(Enroll, { foreignKey: 'course_id' });
	Enroll.belongsTo(Course, { foreignKey: 'course_id' });
	Course.hasMany(Exam, { foreignKey: 'course_id' });
	Exam.belongsTo(Course, { foreignKey: 'course_id' });

	// Categories relationship
	Categories.hasMany(Course, { foreignKey: 'category_id' });
	Course.belongsTo(Categories, { foreignKey: 'category_id' });

	// Admin relationship
	Admin.hasMany(Course, { foreignKey: 'admin_id' });
	Course.belongsTo(Admin, { foreignKey: 'admin_id' });

	// Task relationship
	Task.hasOne(Question, { foreignKey: 'task_id' });
	Question.belongsTo(Task, { foreignKey: 'task_id' });

	Role.hasOne(Admin, { foreignKey: 'role_id' });
	Admin.belongsTo(Role, { foreignKey: 'role_id' });

	Revision.hasOne(UserExam, { foreignKey: 'revision_id' });
	UserExam.belongsTo(Revision, { foreignKey: 'revision_id' });
	Exam.hasMany(Revision, { foreignKey: 'exam_id' });
	Revision.belongsTo(Exam, { foreignKey: 'exam_id' });

	Enroll.hasOne(Revision, { foreignKey: 'enroll_id' });
	Revision.belongsTo(Enroll, { foreignKey: 'enroll_id' });
};
