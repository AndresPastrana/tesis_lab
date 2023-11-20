"use client";
import { useFormState } from "react-dom";
import { Cancel, Save } from "./FormsButtons";
import FormPersonalInfo from "../FormPersonalInfo";
import FormProfesorInfo from "./FormProfesorInfo";
import { addProfesor } from "@/app/lib/actions";

const FormCreateProfesors = () => {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(addProfesor, initialState);

  return (
    <form action={dispatch} className="text-neutral-500 font-medium">
      <FormPersonalInfo state={state} />
      <FormProfesorInfo state={state} />
      <div className="flex flex-row gap-2 justify-end  mt-5">
        <Cancel href="/dashboard/personas/profesores" />
        <Save />
      </div>
    </form>
  );
};

export default FormCreateProfesors;
