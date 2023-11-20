"use server";
import { isValidProfesorInfo, isValidStudentInfo } from "../helpers/validators";
import { caluculateAge } from "../helpers/age";
import { Profesor, Student } from "./models/Mongoose";
import dbConnect from "./dbConnect";
import { redirect } from "next/navigation";
import {
  isCiUnique,
  isCiUniqueExclude,
  isEmailUnique,
  isEmailUniqueExclude,
} from "../helpers/dbValidators";
import { revalidatePath } from "next/cache";

export type State = {
  errors?: {
    ci?: string[];
    name?: string[];
    lastname?: string[];
    email?: string[];
    phone?: string[];
    address?: string[];
    sex?: string[];
    categoria?: string[];
  };
  message?: string | null;
};

export type StudentFormState = {
  errors?: {
    ci?: string[];
    name?: string[];
    lastname?: string[];
    email?: string[];
    phone?: string[];
    address?: string[];
    sex?: string[];
    tutor?: string[];
  };
  message?: string | null;
};

// Profesor Actions
export async function addProfesor(prevState: State, formData: FormData) {
  // Validate using Zod
  const validation = isValidProfesorInfo(formData);

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: "Campos incorrectos. Fallo al crear el nuevo profesor",
    };
  }

  const { categoria, name, lastname, ci, address, email, phone, sex } =
    validation.data;
  const age = caluculateAge(ci);

  try {
    // Db validations
    await Promise.all([isCiUnique(ci), isEmailUnique(email)]);

    await dbConnect();
    await Profesor.create({
      ci,
      name,
      lastname,
      address,
      email,
      phone,
      sex,
      age,
      academic_rank: categoria,
    });
  } catch (error) {
    const err = error as Error;
    return {
      message: `${err.name} ${err.message}`,
    };
  }
  revalidatePath("/dashboard/personas/profesores");
  redirect("/dashboard/personas/profesores");
}

export async function ediProfesor(
  id: string,
  prevState: State,
  formData: FormData
) {
  //Static validations
  const validation = isValidProfesorInfo(formData);
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: "Campos incorrectos. Fallo al actualizar el profesor",
    };
  }

  try {
    // DB Valdidations
    const { ci, email, categoria, ...rest } = validation.data;
    await Promise.all([
      isEmailUniqueExclude(email, id),
      isCiUniqueExclude(ci, id),
    ]);

    // Ready to update the db

    await Profesor.findByIdAndUpdate(id, {
      ci,
      email,
      academic_rank: categoria,
      ...rest,
    });
  } catch (error) {
    const err = error as Error;
    return {
      message: `${err.name} ${err.message}`,
    };
  }
  revalidatePath("/dashboard/personas/profesores");
  redirect("/dashboard/personas/profesores");
}

export async function deleteProfesorById(id: string): Promise<void> {
  try {
    await dbConnect();
    // Use the Profesor model to find and delete the Profesor by ID
    const deletedProfesor = await Profesor.findByIdAndDelete(id);
    // If the Profesor was not found, you might want to handle that case
    if (!deletedProfesor) {
      // You can throw an error, log a message, or handle it in a way that fits your application
      throw new Error(`Profesor with ID ${id} not found`);
    }

    revalidatePath("/dashboard/personas/profesores");
  } catch (error) {
    console.log(error);

    throw new Error(`Error al eliminar el profesor`);
  }
}

// Student Actions
export async function addStudent(
  _prevState: StudentFormState,
  formData: FormData
) {
  // Validate using Zod

  const validation = isValidStudentInfo(formData);

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: "Campos incorrectos. Fallo al crear el nuevo estudiante ",
    };
  }

  const { tutor, ci, email } = validation.data;

  const age = caluculateAge(ci);

  try {
    // Db validations
    await Promise.all([isCiUnique(ci), isEmailUnique(email)]);

    await dbConnect();
    await Student.create({
      ...validation.data,
      tutor_id: tutor,
      ci,
      email,
      age,
    });
  } catch (error) {
    const err = error as Error;
    return {
      message: `${err.name} ${err.message}`,
    };
  }
  revalidatePath("/dashboard/personas/estudiantes");
  redirect("/dashboard/personas/estudiantes");
}
