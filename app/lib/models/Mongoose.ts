import mongoose, { HydratedDocument, Model } from "mongoose";
import { PersonType, ProfesorType } from "../definitions";
import { RangoAcademico, Sex } from "@/app/const";

interface Person extends PersonType, mongoose.Document {}
interface Profesor extends Person, ProfesorType {}

const PersonSchema = new mongoose.Schema<Person>({
  ci: { type: String, maxlength: 11, required: true },
  name: { type: String, required: true, lowercase: true },
  lastname: { type: String, required: true, lowercase: true },
  address: { type: String, required: true, lowercase: true },
  age: { type: Number, min: 18, max: 60, required: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  sex: { type: String, enum: Object.values(Sex), required: true },
});

const ProfesorSchema = new mongoose.Schema<Profesor>(
  {
    academic_rank: {
      type: String,
      enum: Object.values(RangoAcademico),
      required: true,
    },
  },
  {
    methods: {
      toJSON: function (this) {
        const { __v, _id, id, ...rest } = this.toObject();
        return { id: _id.toString(), ...rest };
      },
    },
  }
);

// const StudentSchema = new mongoose.Schema<StudentSchemaType>({
//   person_info_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "PersonInfo",
//     required: true,
//   },
//   tutor_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Profesor",
//     required: true,
//   },
//   academic_doc_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "AcademicDoc",
//     required: true,
//   },
// });

// const AcademicDocSchema = new mongoose.Schema<AcademicDocType>({
//   title: { type: String, required: true },
//   author: { type: String, required: true },
//   committee: { type: [String], required: true },
//   supervisor: {
//     type: String,
//     required: true,
//   },
//   institution: {
//     type: String,
//     enum: Object.values(Institutions),
//     required: true,
//   },
//   degree: { type: String, enum: Object.values(Degree), required: true },
//   fieldOfStudy: {
//     type: String,
//     enum: Object.values(FieldOfStudy),
//     required: true,
//   },
//   department: { type: String, enum: Object.values(Department), required: true },

//   abstract: { type: String, required: true },
//   keywords: { type: [String], required: true },
//   references: { type: [String], required: true },
//   conclusion: { type: String, required: true },

//   defenseDate: { type: Date, required: true },
//   fileUrl: { type: String, required: true },

//   // Add more fields as needed
// });

// const CourtSchema = new mongoose.Schema<CourtType>({
//   name: { type: String, required: true },
//   members: [
//     {
//       profesor: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Profesor",
//         required: true,
//       },
//       role: { type: String, enum: Object.values(CourtRole), required: true },
//     },
//   ],
// });

// const EventSchema = new mongoose.Schema<EventSchemaType>(
//   {
//     court_id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Court",
//       required: true,
//     },
//     date: { type: Date, required: true },
//     title: { type: String, required: true },
//     participants: [
//       {
//         student: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Student",
//           required: true,
//         },
//         evaluated: { type: Boolean, default: false },
//       },
//     ],
//     status: {
//       type: String,
//       enum: ["open", "in-progress", "closed"],
//       required: true,
//     },

//     type: {
//       type: String,
//       enum: ["defense", "pre-defense", "thesis-workshop"],
//       required: true,
//     },
//   },
//   { discriminatorKey: "kind" }
// );

// const TesisDefenseSchema = new mongoose.Schema(
//   {
//     criteria: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Criterion",
//         required: true,
//       },
//     ],
//     evaluations: [
//       {
//         student: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Student",
//           required: true,
//         },
//         criteriaScores: { type: Map, of: Number },
//         totalScore: Number,
//         documentUrl: { type: String, default: undefined }, // Para defensa
//       },
//     ],
//   },
//   { discriminatorKey: "kind" }
// );

// // Tesis Workshop specific
// const TesisWorkshopSchema = new mongoose.Schema(
//   {
//     objectives: { type: [String], require: true },
//     observations: [
//       {
//         student_id: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
//         comments: { type: [String] },
//       },
//     ], // Para talleres de tesis
//   },
//   { discriminatorKey: "kind" }
// );

// Models Here
const Person =
  mongoose.models.Person || mongoose.model<Person>("Person", PersonSchema);

export const Profesor: Model<Profesor> =
  mongoose.models.Person.discriminators?.["Profesor"] ||
  Person.discriminator("Profesor", ProfesorSchema);
