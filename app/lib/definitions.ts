import { Schema } from "mongoose";
import {
  CourtRole,
  Degree,
  Department,
  EvalStatus,
  EvalType,
  FieldOfStudy,
  Institutions,
  RangoAcademico,
  TesisProjectStatus,
  UserRole,
} from "../const";

type CourtMember = {
  profesor: string | Schema.Types.ObjectId;
  role: CourtRole;
};
export interface UserType {
  isActive: Boolean;
  role: UserRole;
  username: string;
  password: string;
}

export interface PersonType {
  user_id: Schema.Types.ObjectId;
  ci: string; // String, Not Null
  name: string; // String, Not Null
  lastname: string; // String, Not Null
  address: string; // String, Not Null
  email: string; // String, Not Null
  phone: string; // String, Not Null
  sex: string; // String, Not Null
  age: number; // Number, Not Null
  ancient: boolean;
}

export interface ProfesorType extends PersonType {
  academic_rank: RangoAcademico;
}

export interface StudentType extends PersonType {
  language_certificate: boolean;
}

export interface CourtType {
  name: string; // Nombre del tribunal
  members: CourtMember[]; // Lista de profesores que forman parte del tribunal y su role
}

export interface TesisProjectType {
  tutors: Array<Schema.Types.ObjectId>;
  student: Schema.Types.ObjectId;
  topic: string; //required
  general_target: string; //required
  scientific_problem: string; //required
  functional_requirements: string[];
  status: TesisProjectStatus; //not required
  approval: {
    isApprove: boolean;
    recommendations: String[];
    approvedBy: Schema.Types.ObjectId | null;
    date: Date | null;
  };

  ancient: boolean; //not required
}

export interface EvaluationType {
  student: Schema.Types.ObjectId;
  type: EvalType;
  status: EvalStatus;
  date: { type: Date };
  file: string;
  description: string;
  score: number; // Assuming it can be null
  recoms: string[];
  ancient: boolean;
}

export type AcademicDocType = {
  id: string;
  // Other's collections references
  author: string;
  supervisor: string;
  committee: string[];

  //User's selection
  degree: Degree;
  institution: Institutions;
  fieldOfStudy: FieldOfStudy;
  department: Department;

  //Scrap from the pdf
  title: string;
  keywords: string[];
  abstract: string;
  conclusion: string;
  references: string[];

  // Auto Generado
  fileUrl: string;
  defenseDate: Date;
};

//////////////////////////  Types for ui //////////////////////
export type ProfesorForm = PersonType & ProfesorType;
export type StudentForm = PersonType & StudentType;
