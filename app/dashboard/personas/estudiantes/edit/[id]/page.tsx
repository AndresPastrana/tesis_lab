import { fecthAllProfessors, fetchStudentById } from "@/app/lib/data/data";
import Breadcrumbs, { CrumbItem } from "@/app/ui/Breadcrumbs";
import FormEditStudent from "@/app/ui/personas/estudiantes/FormEditStudiantes";

const page = async ({ params }: { params: { id: string } }) => {
  const items: CrumbItem[] = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Personas", href: "/dashboard/personas" },
    { label: "Estudiantes", href: "/dashboard/personas/estudiantes" },
    {
      label: "Editar Estudiante",
    },
  ];

  const [profesors, student] = await Promise.all([
    fecthAllProfessors(),
    fetchStudentById(params.id),
  ]);

  return (
    <div>
      <h1>{params.id}</h1>
      <h1>Editar Estudiante</h1>
      <Breadcrumbs items={items} />
      {/* Student edit form form */}
      <FormEditStudent student={student} profesors={profesors} />
    </div>
  );
};

export default page;
