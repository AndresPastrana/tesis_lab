"use client";
import { useFormState } from "react-dom";
import { Cancel, Save } from "./FormButtons";
import FormPersonalInfo from "../FormPersonalInfo";
import { addStudent } from "@/app/lib/actions";
import FormEstudentInfo from "./FormStudentInfo";
// import { fetchFilteredProfesors } from "@/app/lib/data/data";

const FormCreateProfesors = ({
  profesores,
}: {
  profesores: { id: string; name: string }[];
}) => {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(addStudent, initialState);

  return (
    <form action={dispatch} className="text-neutral-500 font-medium">
      <FormPersonalInfo state={state} />
      <FormEstudentInfo state={state} profesores={profesores} />
      <div className="flex flex-row gap-2 justify-end  mt-5">
        <Cancel href="/dashboard/personas/estudiantes" />
        <Save />
      </div>
    </form>
  );
};

export default FormCreateProfesors;
