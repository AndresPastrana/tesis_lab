"use client";
import { useFormState } from "react-dom";
import { ediProfesor, editStudent } from "@/app/lib/actions";
import FormPersonalInfo from "../FormPersonalInfo";
import { Cancel, Save } from "./FormButtons";
import FormStudentInfo from "./FormStudentInfo";
import { Student } from "@/app/lib/data/data";

const FormEditStudent = ({
  student,
  profesors,
}: {
  student: Student;
  profesors: { id: string; name: string }[];
}) => {
  const initialState = { message: null, errors: {} };
  const id = student?.id || "";

  const updateStudentWithId = editStudent.bind(null, id);

  const [state, dispatch] = useFormState(updateStudentWithId, initialState);

  const { tutor, ...rest } = student;

  return (
    <form action={dispatch} className="text-neutral-500 font-medium">
      <FormPersonalInfo state={state} personalInfo={rest} />
      <FormStudentInfo
        state={state}
        studentInfo={{ tutor: { ...tutor } }}
        profesores={profesors}
      />
      <div className="flex flex-row gap-2 justify-end  mt-5">
        <Cancel href="/dashboard/personas/estudiantes" />
        <Save />
      </div>
    </form>
  );
};

export default FormEditStudent;
