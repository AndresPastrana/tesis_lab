"use client";
import { Sex } from "@/app/const";
import { State } from "@/app/lib/actions";
import React from "react";
import ErrorMessage from "./ErrorMessage";
import { PersonType } from "@/app/lib/definitions";

const FormPersonalInfo = ({
  state,
  personalInfo,
}: {
  state: State;
  personalInfo?: PersonType;
}) => {
  const { errors = null, message = null } = state;

  return (
    <div className="flex flex-col gap-5 my-8">
      <h2 className="text-lg py-4 mb-5 border-b-[0.5px] border-b-neutral-300">
        Informacion Personal
      </h2>
      {/* CI */}
      <div className="flex flex-col mb-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="min-w-[100px] text-neutral-500" htmlFor="ci">
            CI
          </label>
          <input
            defaultValue={personalInfo?.ci}
            id="ci"
            name="ci"
            type="text"
            placeholder="Escriba el CI"
            className="input input-bordered focus:outline-green-700 focus:outline-2 focus:border-none w-full max-w-full sm:max-w-lg"
            aria-describedby="customer-error"
          />
        </div>

        {/* Check for an error */}
        <ErrorMessage errors={state.errors?.ci} />
      </div>

      {/* Name */}
      <div className="flex flex-col mb-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="min-w-[100px] text-neutral-500" htmlFor="name">
            Nombre
          </label>

          <input
            defaultValue={personalInfo?.name}
            id="name"
            name="name"
            type="text"
            placeholder="Escriba el nombre"
            className="input input-bordered focus:outline-green-700 focus:outline-2 focus:border-none w-full max-w-full sm:max-w-lg"
          />
        </div>

        <ErrorMessage errors={state.errors?.name || []} />
      </div>

      {/* Apellidos */}
      <div className="flex flex-col mb-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="min-w-[100px] text-neutral-500" htmlFor="lastname">
            Apellidos
          </label>
          <input
            defaultValue={personalInfo?.lastname}
            id="lastname"
            name="lastname"
            type="text"
            placeholder="Escriba el apellido"
            className="input input-bordered focus:outline-green-700 focus:outline-2 focus:border-none w-full max-w-full sm:max-w-lg"
          />
        </div>
        <ErrorMessage errors={errors?.lastname} />
      </div>

      {/* Email */}
      <div className="flex flex-col mb-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="min-w-[100px] text-neutral-500" htmlFor="email">
            Correo
          </label>
          <input
            defaultValue={personalInfo?.email}
            id="email"
            name="email"
            type="text"
            placeholder="Escriba el correo electrónico"
            className="input input-bordered focus:outline-green-700 focus:outline-2 focus:border-none w-full max-w-full sm:max-w-lg"
          />
        </div>
        <ErrorMessage errors={errors?.email} />
      </div>

      {/* Phone */}
      <div className="flex flex-col mb-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="min-w-[100px] text-neutral-500" htmlFor="phone">
            Teléfono
          </label>
          <input
            defaultValue={personalInfo?.phone}
            id="phone"
            name="phone"
            type="text"
            placeholder="Escriba el número de teléfono"
            className="input input-bordered focus:outline-green-700 focus:outline-2 focus:border-none w-full max-w-full sm:max-w-lg"
          />
        </div>
        <ErrorMessage errors={errors?.phone} />
      </div>

      {/* Address */}
      <div className="flex flex-col mb-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="min-w-[100px] text-neutral-500" htmlFor="address">
            Dirección
          </label>
          <input
            defaultValue={personalInfo?.address}
            id="address"
            name="address"
            type="text"
            placeholder="Escriba la dirección"
            className="input input-bordered focus:outline-green-700 focus:outline-2 focus:border-none w-full max-w-full sm:max-w-lg"
          />
        </div>
        <ErrorMessage errors={errors?.address} />
      </div>

      {/* Sex */}

      <div className="flex flex-col mb-2">
        <div className="flex flex-row sm:flex-row items-center gap-2">
          <label htmlFor="sex" className="sm:min-w-[100px]">
            Sexo
          </label>
          <span className="flex flex-row items-center gap-1">
            <label className="text-neutral-500" htmlFor="male">
              Masculino
            </label>
            <input
              defaultChecked={personalInfo?.sex === Sex.Male}
              id="male"
              name="sex"
              value={Sex.Male}
              type="radio"
              className="radio"
              aria-label="Masculino"
            />
          </span>

          <span className="flex flex-row items-center gap-1">
            <label className="text-neutral-500" htmlFor="female">
              Femenino
            </label>
            <input
              defaultChecked={personalInfo?.sex === Sex.Female}
              id="female"
              name="sex"
              value={Sex.Female}
              type="radio"
              className="radio"
              aria-label="Femenino"
            />
          </span>
        </div>
        <ErrorMessage errors={state.errors?.sex} />
      </div>
    </div>
  );
};

export default FormPersonalInfo;
