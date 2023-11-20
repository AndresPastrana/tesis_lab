import Breadcrumbs, { CrumbItem, CrumbsItems } from "@/app/ui/Breadcrumbs";
import CreateStudentForm from "@/app/ui/personas/CreateStudentForm";
import React from "react";

const page = () => {
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
      {/* <CreateStudentForm /> */}
    </div>
  );
};

export default page;
