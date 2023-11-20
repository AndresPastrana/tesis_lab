import { unstable_noStore as noStore } from "next/cache";
import { Profesor, Student } from "../models/Mongoose";
import dbConnect from "../dbConnect";
import { Document, Model, FilterQuery } from "mongoose";
const MAX_RESULTS_SEARCH = 10;

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

type Student = {
  ci: string;
  name: string;
  lastname: string;
  address: string;
  email: string;
  phone: string;
  sex: string;
  age: number;
  tutor: string;
  // Add other properties as needed
};

type ProfessorsTable = Professor[];
type StudentTable = Student[];

export async function fetchFilteredProfesors(
  query: string,
  page: number
): Promise<ProfessorsTable> {
  noStore(); //No cache the request

  try {
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
    }).limit(MAX_RESULTS_SEARCH)) as ProfessorsTable;

    return resultFromQuery;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Fallo al buscar profesores.");
  }
}

export async function fetchFilteredStudents(query: string) {
  const regExp = new RegExp(query, "i");
  const filter =
    query === ""
      ? {}
      : {
          $or: [...getPersonQueryFilters(regExp)],
        };
  await dbConnect();
  try {
    // Example: Fetching students with age less than 25 and limiting the result
    const filteredStudents =
      await Student.find(filter).limit(MAX_RESULTS_SEARCH);

    return filteredStudents;
  } catch (error) {
    // Handle errors here
    console.error("Error fetching filtered students:", error);
    throw error;
  }
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
