import dbConnect from "../lib/dbConnect";
import { Profesor } from "../lib/models/Mongoose";
import { DuplicateCiError, DuplicateEmailError } from "./errors";

export async function isCiUnique(ci: string): Promise<boolean> {
  await dbConnect();
  const profesor = await Profesor.findOne({ ci });

  if (profesor) {
    throw new DuplicateCiError(ci);
  }

  return true;
}

export async function isEmailUnique(email: string): Promise<boolean> {
  await dbConnect();
  const profesor = await Profesor.findOne({ email });

  if (profesor) {
    throw new DuplicateEmailError(email);
  }

  return true;
}

export async function isEmailUniqueExclude(
  email: string,
  id: string
): Promise<boolean> {
  await dbConnect();
  const profesor = await Profesor.findOne({ email, _id: { $ne: id } });

  if (profesor) {
    throw new DuplicateEmailError(email);
  }

  return true;
}

export async function isCiUniqueExclude(
  ci: string,
  id: string
): Promise<boolean> {
  await dbConnect();
  const profesor = await Profesor.findOne({ ci, _id: { $ne: id } });

  if (profesor) {
    throw new DuplicateCiError(ci);
  }

  return true;
}
