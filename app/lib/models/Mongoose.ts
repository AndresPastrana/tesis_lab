import mongoose, { Model } from "mongoose";
import {
  CourtType,
  PersonType,
  ProfesorType,
  StudentType,
} from "../definitions";
import { CourtRole, RangoAcademico, Sex } from "@/app/const";

interface Person extends PersonType, mongoose.Document {}
interface Profesor extends Person, ProfesorType {}
interface Student extends Person, StudentType {}
interface Court extends mongoose.Document, CourtType {}

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

const StudentSchema = new mongoose.Schema<Student>(
  {
    tutor_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Profesor",
    }, // Assuming there is a Tutor model
    // academic_doc_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "AcademicDocument",
    // }, // Assuming there is an AcademicDocument model
    // Add other properties based on the StudentType interface
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

const CourtSchema = new mongoose.Schema<Court>(
  {
    name: String,
    members: [
      {
        profesor: { type: mongoose.Schema.Types.ObjectId, ref: "Profesor" },
        role: { type: String, enum: Object.values(CourtRole) },
      },
    ],
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

// Models Here

export const Person =
  mongoose.models.Person || mongoose.model<Person>("Person", PersonSchema);

export const Profesor: Model<Profesor> =
  mongoose.models.Person.discriminators?.["Profesor"] ||
  Person.discriminator("Profesor", ProfesorSchema);

export const Student: Model<Student> =
  mongoose.models.Person.discriminators?.["Student"] ||
  Person.discriminator("Student", StudentSchema);

export const Court =
  mongoose.models.Court || mongoose.model<Court>("Court", CourtSchema);
