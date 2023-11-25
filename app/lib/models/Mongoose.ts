import { IsoDate } from "minio";
import mongoose, { Model } from "mongoose";
import {
  CourtType,
  EvaluationType,
  PersonType,
  ProfesorType,
  StudentType,
  TesisProjectType,
  UserType,
} from "../definitions";
import {
  CourtRole,
  EvalStatus,
  EvalType,
  RangoAcademico,
  Sex,
  TesisProjectStatus,
  UserRole,
} from "@/app/const";

interface User extends UserType, mongoose.Document {}
interface Person extends PersonType, mongoose.Document {}
interface Profesor extends ProfesorType, mongoose.Document {}
interface Student extends StudentType, mongoose.Document {}
interface Court extends CourtType, mongoose.Document {}
interface TesisProject extends TesisProjectType, mongoose.Document {}
interface Evaluation extends EvaluationType, mongoose.Document {}

///////////////////////////////////      Schemas

/////////////////////////////

const UserSchema = new mongoose.Schema<User>({
  isActive: { type: Boolean, require: false, default: true },
  role: {
    type: String,
    enum: Object.values(UserRole),
    required: true,
  },
  password: { type: String, required: true },
  username: {
    type: String,
    required: true,
  },
});
const PersonSchema = new mongoose.Schema<Person>({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    require: true,
    readonly: true,
  },
  ci: { type: String, maxlength: 11, required: true },
  name: { type: String, required: true, lowercase: true },
  lastname: { type: String, required: true, lowercase: true },
  address: { type: String, required: true, lowercase: true },
  age: { type: Number, min: 18, max: 60, required: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  sex: { type: String, enum: Object.values(Sex), required: true },
  ancient: {
    type: Boolean,
    required: false,
    default: false,
  },
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
    language_certificate: {
      type: Boolean,
      required: false,
      default: false,
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

const TesisProjectSchema = new mongoose.Schema<TesisProject>(
  {
    tutors: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profesor" }],
      required: false,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: false,
    },
    topic: {
      type: String,
      required: true,
      maxlength: 20,
    },
    general_target: {
      type: String,
      required: true,
      maxlength: 30,
    },
    scientific_problem: {
      type: String,
      required: true,
      maxlength: 300,
    },
    functional_requirements: {
      type: [{ type: String }],
      required: false,
      default: [],
    },
    status: {
      type: String,
      enum: Object.values(TesisProjectStatus),
      required: false,
      default: TesisProjectStatus.Pending,
    },
    approval: {
      type: {
        isApprove: { type: Boolean, required: false, default: false },
        recommendations: { type: [String], required: false, default: [] },
        approvedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Profesor",
          required: false,
        },
        date: { type: Date },
      },
    },
    ancient: {
      type: Boolean,
      required: false,
      default: false,
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

const EvaluationSchema = new mongoose.Schema<Evaluation>(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    type: { type: String, enum: Object.values(EvalType) },
    status: { type: String, enum: Object.values(EvalStatus) },
    date: { type: Date, required: true },
    file: { type: String, required: true },
    description: { type: String, required: true },
    score: { type: Number, required: false, default: null },
    recoms: { type: [String], required: false, default: [] },
    ancient: { type: Boolean, required: true },
  },
  {
    methods: {
      toJSON: function (this) {
        const { __v, _id, id, ...rest } = this.toObject();
        return { id: _id.toString(), ...rest };
      },
    },
    timestamps: true,
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

///////////////////////////////  Models ////////////////////////////////////////

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

export const TesisProject =
  mongoose.models.TesisProject ||
  mongoose.model<TesisProjectType>("TesisProject", TesisProjectSchema);

export const Evaluation =
  mongoose.models.Evaluation ||
  mongoose.model<EvaluationType>("Evaluation", EvaluationSchema);

export const User =
  mongoose.models.User || mongoose.model<UserType>("User", UserSchema);
