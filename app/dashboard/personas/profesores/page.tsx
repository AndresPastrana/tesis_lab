"use server";
import Create from "@/app/ui/personas/profesores/Create";
import SearchBar from "@/app/ui/personas/SearchBar";
import TableProfesors from "@/app/ui/personas/profesores/TableProfesors";
import React, { Suspense } from "react";

const page = ({
  searchParams,
}: {
  searchParams: { query?: string; page?: number };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <div className="flex gap-4 mt-4">
        <SearchBar placeholder="Escribe lo que sea" />
        <Create
          text="Agregar Profesor"
          href="/dashboard/personas/profesores/create"
        />
      </div>
      <Suspense
        fallback={
          <div className="flex justify-center py-10 min-h-[630px] lg:min-h-[590px]">
            <span className="text-center loading loading-spinner text-green-700"></span>
          </div>
        }
      >
        <TableProfesors query={query} page={currentPage} />
      </Suspense>
    </>
  );
};

export default page;
