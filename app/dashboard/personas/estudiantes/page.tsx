// import Create from "@/app/ui/personas/";
import Breadcrumbs, { CrumbItem, CrumbsItems } from "@/app/ui/Breadcrumbs";
import SearchBar from "@/app/ui/personas/SearchBar";
import Create from "@/app/ui/personas/profesores/Create";
import React from "react";

const page = async () => {
  const items: CrumbItem[] = [
    { label: "Dashboard", href: "/dashboard" },
    {
      label: "Personas",
      href: "/dashboard/personas",
    },
    {
      label: "Estudiantes",
    },
  ];
  return (
    <>
      <Breadcrumbs items={items} />
      <div className="flex gap-4 mt-4">
        <SearchBar placeholder="Escribe lo que sea" />

        <Create
          text="Agregar Estudiante"
          href="/dashboard/personas/estudiantes/create"
        />
      </div>
      <div className="bg-gray-50 rounded-sm mt-4">
        <div>Table here</div>

        <div className="flex justify-center my-4">Pagination here</div>
      </div>
    </>
  );
};

export default page;
