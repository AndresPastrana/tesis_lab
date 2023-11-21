// import Create from "@/app/ui/personas/";
import { fecthStudentPages } from "@/app/lib/data/data";
import Breadcrumbs, { CrumbItem, CrumbsItems } from "@/app/ui/Breadcrumbs";
import Pagination from "@/app/ui/pagination";
import SearchBar from "@/app/ui/personas/SearchBar";
import TableStudents from "@/app/ui/personas/estudiantes/TableStudents";
import Create from "@/app/ui/personas/profesores/Create";
import React, { Suspense } from "react";

const page = async ({
  searchParams,
}: {
  searchParams: { query?: string; page?: number };
}) => {
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

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = (await fecthStudentPages("")) as number;
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
        <Suspense
          fallback={
            <div className="flex justify-center py-10 min-h-[630px] lg:min-h-[590px]">
              <span className="text-center loading loading-spinner text-green-700"></span>
            </div>
          }
        >
          <TableStudents query={query} page={currentPage} />
        </Suspense>

        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </>
  );
};

export default page;
