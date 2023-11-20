import { unstable_noStore as noStore } from "next/cache";
import { Profesor } from "../models/Mongoose";
import dbConnect from "../dbConnect";
import { Document, Model, FilterQuery } from "mongoose";
const MAX_RESULTS_SEARCH = 10;
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

type ProfessorsTable = Professor[];

export async function fetchFilteredProfesors(
  query: string,
  page: number
): Promise<ProfessorsTable> {
  noStore(); //No cache the request

  try {
    // await new Promise((res, rej) => setTimeout(res, 5000));
    const regExp = new RegExp(query, "i");
    // await new Promise((res, rej) => setTimeout(res, 5000));
    const filter =
      query === ""
        ? {}
        : {
            $or: [
              { ci: { $regex: regExp } },
              { name: { $regex: regExp } },
              { lastname: { $regex: regExp } },
              { address: { $regex: regExp } },
              { email: { $regex: regExp } },
              { phone: { $regex: regExp } },
              { sex: { $regex: regExp } },
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
