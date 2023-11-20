// import Create from "@/app/ui/personas/";
import SearchBar from "@/app/ui/personas/SearchBar";
import React from "react";

const page = () => {
  return (
    <div className="flex gap-4 mt-4">
      <SearchBar placeholder="Escribe lo que sea" />
      {/* <Create
        text="Agregar Estudiante"
        href="/dashboard/personas/estudiantes/create"
      /> */}
    </div>
  );
};

export default page;
