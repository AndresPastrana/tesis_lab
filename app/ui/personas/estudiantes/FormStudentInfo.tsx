import React from "react";
import ErrorMessage from "../ErrorMessage";
import { State, StudentFormState } from "@/app/lib/actions";
import { StudentType } from "@/app/lib/definitions";

const FormEstudentInfo = async ({
  state,
  profesores,
  studentInfo,
}: {
  state: StudentFormState;
  studentInfo?: StudentType;
  profesores: { id: string; name: string }[];
}) => {
  return (
    <>
      <h2 className="text-lg py-4 mb-10 border-b-[0.5px] border-b-neutral-300">
        Informacion del Estudiante
      </h2>
      <div className="flex flex-col mb-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="min-w-[100px] text-neutral-500" htmlFor="tutor">
            Tutor{" "}
          </label>
          <select
            defaultValue={studentInfo?.tutor_id as string}
            name="tutor"
            id="tutor"
            className="select select-bordered w-full  focus:outline-green-700 focus:outline-2 focus:border-none  max-w-full sm:max-w-lg"
          >
            <option disabled defaultChecked>
              Seleciona el tutor del estudiante
            </option>
            {profesores.map((p) => {
              return (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              );
            })}
          </select>
        </div>
        <ErrorMessage errors={state.errors?.tutor} />
      </div>
      <p className="text-sm text-red-500">{state?.message}</p>
    </>
  );
};

export default FormEstudentInfo;
