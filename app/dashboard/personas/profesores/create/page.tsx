import Breadcrumbs, { CrumbItem } from "@/app/ui/Breadcrumbs";
import FormCreateProfesors from "@/app/ui/personas/profesores/FormCreateProfesors";
import React from "react";

const page = () => {
  const items: CrumbItem[] = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Personas", href: "/dashboard/personas" },
    { label: "Profesores", href: "/dashboard/personas/estudiantes" },
    {
      label: "Agregar Profesor",
    },
  ];
  return (
    <div>
      <Breadcrumbs items={items} />
      <FormCreateProfesors />
    </div>
  );
};

export default page;
