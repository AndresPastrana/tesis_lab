import { fecthAllProfessors } from "@/app/lib/data/data";
import Breadcrumbs, { CrumbItem } from "@/app/ui/Breadcrumbs";
import FormCreateEstudiantes from "@/app/ui/personas/estudiantes/FormCreateEstudiantes";

import React from "react";

const page = async () => {
  const profesores = (await fecthAllProfessors()).map((p) => ({
    id: p.id,
    name: p.name,
  }));

  const items: CrumbItem[] = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Personas", href: "/dashboard/personas" },
    { label: "Estudiantes", href: "/dashboard/personas/estudiantes" },
    {
      label: "Agregar Estudiante",
    },
  ];

  return (
    <div>
      <Breadcrumbs items={items} />
      <FormCreateEstudiantes profesores={profesores} />
    </div>
  );
};

export default page;
