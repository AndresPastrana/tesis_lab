"use client";
import { useFormState } from "react-dom";
import { ediProfesor } from "@/app/lib/actions";
import FormPersonalInfo from "../FormPersonalInfo";
import { Cancel, Save } from "./FormsButtons";
import { ProfesorForm } from "@/app/lib/definitions";
import FormProfesorInfo from "./FormProfesorInfo";

const FormEditProfesor = ({
  profesor,
}: {
  profesor: ProfesorForm & { id?: string };
}) => {
  const initialState = { message: null, errors: {} };
  const id = profesor?.id || "";

  const updateProfesorWithId = ediProfesor.bind(null, id);

  const [state, dispatch] = useFormState(updateProfesorWithId, initialState);

  const { academic_rank, ...rest } = profesor;
  return (
    <form action={dispatch} className="text-neutral-500 font-medium">
      <FormPersonalInfo state={state} personalInfo={rest} />
      <FormProfesorInfo state={state} profesorInfo={{ academic_rank }} />
      <div className="flex flex-row gap-2 justify-end  mt-5">
        <Cancel href="/dashboard/personas/profesores" />
        <Save />
      </div>
    </form>
  );
};

export default FormEditProfesor;
