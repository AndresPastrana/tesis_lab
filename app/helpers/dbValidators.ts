import dbConnect from "../lib/dbConnect";
import { Person } from "../lib/models/Mongoose";
import { DuplicateCiError, DuplicateEmailError } from "./errors";

export async function isCiUnique(ci: string): Promise<boolean> {
  await dbConnect();
  const person = await Person.findOne({ ci });

  if (person) {
    throw new DuplicateCiError(ci);
  }

  return true;
}

export async function isEmailUnique(email: string): Promise<boolean> {
  await dbConnect();
  const person = await Person.findOne({ email });

  if (person) {
    throw new DuplicateEmailError(email);
  }

  return true;
}

export async function isEmailUniqueExclude(
  email: string,
  id: string
): Promise<boolean> {
  await dbConnect();
  const person = await Person.findOne({ email, _id: { $ne: id } });

  if (person) {
    throw new DuplicateEmailError(email);
  }

  return true;
}

export async function isCiUniqueExclude(
  ci: string,
  id: string
): Promise<boolean> {
  await dbConnect();
  const person = await Person.findOne({ ci, _id: { $ne: id } });

  if (person) {
    throw new DuplicateCiError(ci);
  }

  return true;
}
