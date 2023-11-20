import { Schema } from "mongoose";
import {
  CourtRole,
  Degree,
  Department,
  FieldOfStudy,
  Institutions,
  RangoAcademico,
} from "../const";

interface Event {
  id: string;
  court_id: string; // Reference to Court model
  date: Date;
  title: string;
  participants: {
    student_id: string; // Reference to Student model
    evaluated: boolean;
  }[];
  status: "open" | "in-progress" | "closed";
  type: "defense" | "pre-defense" | "thesis-workshop";
}

interface TesisDefense extends Event {
  type: "defense";
  criteria: string[]; // Reference to Criterion model
  evaluations: {
    student_id: string; // Reference to Student model
    criteriaScores: Record<string, number>;
    totalScore: number;
    documentUrl?: string; // Optional for defense
  }[];
}
interface TesisWorkShop extends Event {
  type: "thesis-workshop";
  objectives: string[];
  observations: {
    student_id: string; // Reference to Student model
    comments: string[];
  }[];
}

type CourtMember = {
  profesor: string;
  role: CourtRole;
};
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

export interface PersonType {
  ci: string; // String, Not Null
  name: string; // String, Not Null
  lastname: string; // String, Not Null
  address: string; // String, Not Null
  email: string; // String, Not Null
  phone: string; // String, Not Null
  sex: string; // String, Not Null
  age: number; // Number, Not Null
}

// Define the ProfesorType interface
export interface ProfesorType {
  academic_rank: RangoAcademico;
}

export interface StudentType {
  tutor_id: string | Schema.Types.ObjectId;
  // academic_doc_id: string | Schema.Types.ObjectId;
}

export type CourtType = {
  id: string;
  name: string; // Nombre del tribunal
  members: CourtMember[]; // Lista de profesores que forman parte del tribunal y su role
};

type ThesisWorkshopType = {
  id: string;
  court_id: string; // Tribunal asignado
  participants: string[];
  title: string;
  date: Date; //When current date u date all the tesis workoshp with the status = "open" -> "in=progress"   current date = date+1 "in-progress" -> "closed"
  objectives: string[];
  status: "open" | "in-progress" | "closed";
};

export type EventSchemaType = Omit<Event, "court_id" | "participants"> & {
  court_id: Schema.Types.ObjectId;
  participants: {
    student_id: Schema.Types.ObjectId; // Reference to Student model
    evaluated: boolean;
  }[];
};

export type ProfesorForm = PersonType & ProfesorType;
