import { RangoAcademico } from "@/app/const";
import React from "react";
import ErrorMessage from "../ErrorMessage";
import { State } from "@/app/lib/actions";
import { ProfesorType } from "@/app/lib/definitions";

const FormProfesorInfo = ({
  state,
  profesorInfo,
}: {
  state: State;
  profesorInfo?: ProfesorType;
}) => {
  return (
    <>
      <h2 className="text-lg py-4 mb-10 border-b-[0.5px] border-b-neutral-300">
        Informacion del profesor
      </h2>
      <div className="flex flex-col mb-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="min-w-[100px] text-neutral-500" htmlFor="categoria">
            Categoria
          </label>
          <select
            defaultValue={profesorInfo?.academic_rank}
            name="categoria"
            id="categoria"
            className="select select-bordered w-full  focus:outline-green-700 focus:outline-2 focus:border-none  max-w-full sm:max-w-lg"
          >
            <option disabled defaultChecked>
              Seleciona la Categoria Cientifica
            </option>
            {Object.values(RangoAcademico).map((r) => {
              return (
                <option key={r} value={r}>
                  {r}
                </option>
              );
            })}
          </select>
        </div>

        <ErrorMessage errors={state.errors?.categoria} />
      </div>
      <p className="text-sm text-red-500">{state?.message}</p>
    </>
  );
};

export default FormProfesorInfo;
