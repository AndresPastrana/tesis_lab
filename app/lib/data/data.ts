import { unstable_noStore as noStore } from "next/cache";
import { Types } from "mongoose";
import { Court, Profesor, Student } from "../models/Mongoose";
import dbConnect from "../dbConnect";
import {
  Document,
  Model,
  FilterQuery,
  Schema,
  mongo,
  Mongoose,
} from "mongoose";
import { CourtRole } from "@/app/const";
const MAX_RESULTS_SEARCH = 4;

function getPersonQueryFilters(regExp: RegExp) {
  return [
    { ci: { $regex: regExp } },
    { name: { $regex: regExp } },
    { lastname: { $regex: regExp } },
    { address: { $regex: regExp } },
    { email: { $regex: regExp } },
    { phone: { $regex: regExp } },
    { sex: { $regex: regExp } },
  ];
}

type Professor = {
  id: string;
  ci: string;
  name: string;
  lastname: string;
  address: string;
  email: string;
  phone: string;
  sex: string;
  age: number;
  academic_rank: string;
};

export type Student = {
  id: string;
  ci: string;
  name: string;
  lastname: string;
  address: string;
  email: string;
  phone: string;
  sex: string;
  age: number;
  tutor: {
    _id: string;
    name: string;
  };
  // Add other properties as needed
};

export type Court = {
  id: string;
  name: string;
  members: { profesor: { _id: string; name: string }; role: CourtRole }[];
};

type StudentTable = Student[];
type ProfessorsTable = Professor[];

export async function fecthAllProfessors() {
  try {
    await dbConnect();
    const profesors = await Profesor.find({});
    return profesors as ProfessorsTable;
  } catch (error) {
    console.log(error);

    throw new Error(`Error cargando los profesores`);
  }
}

export async function fetchFilteredProfesors(
  query: string,
  page: number
): Promise<ProfessorsTable> {
  noStore(); //No cache the request

  try {
    const offset = (page - 1) * MAX_RESULTS_SEARCH;

    const regExp = new RegExp(query, "i");
    const filter =
      query === ""
        ? {}
        : {
            $or: [
              ...getPersonQueryFilters(regExp),
              { academic_rank: { $regex: regExp } },
            ],
          };
    await dbConnect();

    const resultFromQuery = (await Profesor.find({
      ...filter,
      __t: "Profesor",
    })
      .skip(offset)
      .limit(MAX_RESULTS_SEARCH)) as ProfessorsTable;

    return resultFromQuery;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Fallo al buscar profesores.");
  }
}

export async function fetchFilteredStudents(query: string, page: number) {
  noStore();
  try {
    const offset = (page - 1) * MAX_RESULTS_SEARCH;

    const regExp = new RegExp(query, "i");
    const filter =
      query === ""
        ? {}
        : {
            $or: [...getPersonQueryFilters(regExp)],
          };
    await dbConnect();
    const students = await Student.find(filter)
      .skip(offset)
      .limit(MAX_RESULTS_SEARCH)
      .populate("tutor_id", "name");

    const mapped: StudentTable = students.map((s) => {
      const { name, lastname, email, ci, age, address, phone, sex } = s;
      const tutor = s.tutor_id as { _id: string; name: string };
      // TODO: fix this tipo error

      return {
        id: s.id,
        name,
        lastname,
        email,
        ci,
        age,
        address,
        phone,
        sex,
        tutor,
      };
    });

    return mapped;
  } catch (error) {
    throw new Error("Error cargando los estudiantes");
  }
}

export async function fecthStudentPages(query: string) {
  const regExp = new RegExp(query, "i");
  const filter =
    query === ""
      ? {}
      : {
          $or: [...getPersonQueryFilters(regExp)],
        };
  try {
    await dbConnect();
    const totalDocs = await Student.countDocuments(filter);
    console.log(`Docs: ${totalDocs}`);

    return Math.ceil(totalDocs / MAX_RESULTS_SEARCH);
  } catch (error) {}
}

export async function fetchStudentById(id: string) {
  // const oid = new Schema.Types.ObjectId(id);
  try {
    await dbConnect();
    const student = (await Student.findById(id).populate("tutor_id", [
      "name",
      "id",
    ])) as any;

    const studentObj = student.toJSON();

    console.log(studentObj);

    if (student) {
      const mapedStudent = {
        name: studentObj.name,
        lastname: studentObj.lastname,
        email: studentObj.email,
        address: studentObj.address,
        age: studentObj.age,
        ci: studentObj.ci,
        id: studentObj.id,
        phone: studentObj.phone,
        sex: studentObj.sex,
        tutor: {
          _id: student?.tutor_id?._id.toString(), //TODO: fix this typo errors
          name: student?.tutor_id?.name,
        },
      };
      return mapedStudent;
    }

    throw new Error("Estudiante no encontrado");
  } catch (error) {
    const err = error as Error;
    throw new Error(`Error: ${err.name}. ${err.message}`);
  }
}

export async function fecthProfesorsPages(query: string) {
  const regExp = new RegExp(query, "i");
  const filter =
    query === ""
      ? {}
      : {
          $or: [
            ...getPersonQueryFilters(regExp),
            { academic_rank: { $regex: regExp } },
          ],
        };
  try {
    await dbConnect();
    const totalDocs = await Profesor.countDocuments(filter);

    return Math.ceil(totalDocs / MAX_RESULTS_SEARCH);
  } catch (error) {}
}

// Define a generic function to get a document by ID
export async function fecthDocById<T extends Document>(
  model: Model<T>,
  id: string
): Promise<T | null> {
  noStore();
  try {
    const document = await model.findById(id);
    return document;
  } catch (error) {
    console.error("Error fetching document:", error);
    throw new Error(`Error al buscar documento con el id ${id}`);
  }
}

export async function getTotalPages<T extends Document>(
  model: Model<T>,
  query: FilterQuery<T>
): Promise<number> {
  try {
    const totalItems = await model.countDocuments(query);
    const totalPages = Math.ceil(totalItems / MAX_RESULTS_SEARCH);
    return totalPages;
  } catch (error) {
    // Handle the error, e.g., log it or throw an exception
    console.error("Error calculating total pages:", error);
    throw error;
  }
}

// Courts
async function getAllCourtsFormatted() {
  try {
    // Use the Mongoose model to find all courts in the database and populate the 'profesor' field
    const courts = await Court.find({}).populate("members.profesor");

    // Map the courts to the desired format
    const formattedCourts: Court[] = courts.map((court) => ({
      id: court._id.toString(),
      name: court.name,
      members: court.members.map(
        (member: {
          profesor: { _id: Types.ObjectId; name: string };
          role: CourtRole;
        }) => ({
          profesor: member.profesor._id.toString(),
          role: member.role,
        })
      ),
    }));

    return formattedCourts;
  } catch (error) {
    // Handle errors, such as logging or throwing an exception
    console.error("Error while fetching courts:", error);
    throw error;
  }
}

async function createCourt(
  name: string,
  members: { profesor: string; role: CourtRole }[]
) {
  try {
    //  Exctract the for data

    // Create a new court
    const newCourt = new Court({
      name,
      members,
    });

    // Save the new court to the database
    const savedCourt = await newCourt.save();

    return savedCourt;
  } catch (error) {
    // Handle errors, such as logging or throwing an exception
    console.error("Error while creating a new court:", error);
    throw error;
  }
}
