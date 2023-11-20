import { fecthDocById } from "@/app/lib/data/data";
import { ProfesorForm } from "@/app/lib/definitions";
import { Profesor } from "@/app/lib/models/Mongoose";
import Breadcrumbs, { CrumbItem } from "@/app/ui/Breadcrumbs";
import FormEditProfesor from "@/app/ui/personas/profesores/FormEditProfesor";
import { isValidObjectId } from "mongoose";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id = null } = params;
  if (!isValidObjectId(id) || !id) {
    return notFound();
  }

  const profesor = await fecthDocById(Profesor, id);

  const items: CrumbItem[] = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Personas", href: "/dashboard/personas" },
    { label: "Profesores", href: "/dashboard/personas/profesores" },
    {
      label: "Editar Profesor",
    },
  ];

  if (!profesor) {
    return <p>Profesor no encontrado</p>;
  }
  const pojo = profesor.toJSON();

  return (
    <div>
      <Breadcrumbs items={items} />
      <FormEditProfesor profesor={pojo} />
    </div>
  );
};

export default page;
