import { z } from "zod";
import { RangoAcademico, Sex } from "../const";
const emailRegex = /^[a-zA-Z0-9._-]+@(upr\.cu|gmail\.com)$/;
const phoneRegex = /^[0-9]{8}$/;

const ProfesorSchema = z.object({
  ci: z
    .string()
    .trim()
    .refine(
      (data) => {
        return validateCi(data);
      },
      { message: "Formato del carnet de indentidad no valdio" }
    ),
  name: z
    .string()
    .trim()
    .toLowerCase()
    .refine((data) => data.length > 0, {
      message: "El nombre debe tener una longitud mayor a 0.",
    })
    .refine(
      (data) => {
        // Permitir hasta dos partes en el nombre separadas por un espacio
        const nameParts = data.trim().split(" ");
        return (
          nameParts.length <= 2 && nameParts.every((part) => part.length > 0)
        );
      },
      {
        message:
          "El nombre debe consistir en máximo dos cadenas de texto separadas por un espacio.",
      }
    ),
  lastname: z
    .string()
    .trim()
    .toLowerCase()
    .refine((data) => data.length > 0, {
      message: "El apellido debe tener una longitud mayor a 0.",
    })
    .refine(
      (data) => {
        // Permitir hasta dos partes en el apellido separadas por un espacio
        const apellidoParts = data.trim().split(" ");
        return (
          apellidoParts.length <= 2 &&
          apellidoParts.every((part) => part.length > 0)
        );
      },
      {
        message:
          "Los apellidos deben ser máximo dos cadenas de texto separadas por un espacio.",
      }
    ),

  email: z
    .string()
    .trim()
    .refine((data) => emailRegex.test(data), {
      message: "El formato del correo electrónico no es válido.",
    }),
  phone: z
    .string()
    .trim()
    .refine((data) => phoneRegex.test(data), {
      message: "El número de teléfono debe contener exactamente 8 dígitos.",
    }),
  address: z
    .string()
    .trim()
    .refine((data) => data.length > 10, {
      message: "La direccion debe ser mas descriptiva",
    }),
  sex: z.enum([Sex.Female, Sex.Male], {
    invalid_type_error: `Sexo debe ser uno de ${Object.values(Sex).join(",")}`,
  }),
  categoria: z.enum(
    [
      RangoAcademico.GRADUADO_DE_DOCTORADO,
      RangoAcademico.GRADUADO_DE_MAESTRIA,
      RangoAcademico.CANDIDATO_DE_DOCTORADO,
      RangoAcademico.CANDIDATO_DE_MAESTRIA,
      RangoAcademico.INVESTIGADOR_POSDOCTORAL,
      RangoAcademico.PROFESOR,
      RangoAcademico.PROFESOR_ASISTENTE,
      RangoAcademico.PROFESOR_ASOCIADO,
    ],
    {
      invalid_type_error: `La categoria debe ser uno de :${Object.values(
        RangoAcademico
      ).join(", ")}`,
    }
  ),
});

function validateYear(year: string) {
  const parsedYear = parseInt(year);
  if (parsedYear >= 0 && parsedYear <= 99) {
    return true;
  }

  return false;
}

export function validateCi(ci: string) {
  // Extract year, month, day, and the last 5 digits
  const year = ci.substring(0, 2);
  const month = ci.substring(2, 4);
  const day = ci.substring(4, 6);
  const last5Digits = ci.substring(6);

  if (!validateYear(year)) {
    return false;
  }

  // TODO: Validate the year without

  // Check if the month is valid (01 to 12)
  if (!/^(0[1-9]|1[0-2])$/.test(month)) {
    return false;
  }

  // Check if the day is valid (01 to 31)
  if (!/^(0[1-9]|[12]\d|3[01])$/.test(day)) {
    return false;
  }

  // Check if the last 5 digits are numeric
  if (!/^\d{5}$/.test(last5Digits)) {
    return false;
  }

  // All checks passed, the CI is valid
  return true;
}

export function isValidPersonInfo(formData: FormData) {
  return ProfesorSchema.safeParse({
    ci: formData.get("ci"),
    name: formData.get("name"),
    lastname: formData.get("lastname"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    sex: formData.get("sex"),
    categoria: formData.get("categoria"),
  });
}
