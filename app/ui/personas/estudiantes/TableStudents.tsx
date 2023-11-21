import { fetchFilteredStudents } from "@/app/lib/data/data";
import { Delete, Edit } from "./FormButtons";
import { Suspense } from "react";

const TableStudents = async ({
  query,
  page,
}: {
  query: string;
  page: number;
}) => {
  const students = await fetchFilteredStudents(query, page);
  return (
    <>
      {/* LG Screens table */}
      <div className="mt-5 p-4 bg-gray-100 rounded-md hidden lg:block ">
        <table className="w-full">
          <thead className="">
            <tr className="[&>th]:py-8 [&>th]:px-2 [&>th]:text-left [&>th]:font-semibold text-gray-700 ">
              {/* <th className="">ID</th> */}
              <th className="">CI</th>
              <th className="">Name</th>
              <th className="">Lastname</th>
              <th className="">Email</th>
              <th className="">Tutor</th>
              <th className="">Address</th>
              <th className="">Phone</th>
              <th className="">Sex</th>
              <th className="">Age</th>
            </tr>
          </thead>
          <tbody className="rounded-md">
            {students.map((student) => (
              <tr
                key={student.id}
                className="bg-white rounded-lg border-solid border-b-[1px] border-gray-100"
              >
                {/* <td className="p-2">{stdudent.id}</td> */}
                <td className="py-6 px-2">{student.ci}</td>
                <td className="py-6 px-2">{student.name}</td>
                <td className="py-6 px-2">{student.lastname}</td>
                <td className="py-6 px-2">{student.email}</td>
                <td className="py-6 px-2">{student.tutor.name}</td>
                <td className="py-6 px-2">{student.address}</td>
                <td className="py-6 px-2">{student.phone}</td>
                <td className="py-6 px-2">{student.sex}</td>
                <td className="py-6 px-2">{student.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Medium and Small Screens table */}
      <div className="lg:hidden w-full mt-5 p-4 bg-gray-100 rounded-md">
        {students.map((stdudent) => (
          <div
            key={stdudent.id}
            className="bg-white rounded-lg border-solid border-b-[1px] border-gray-100 mb-4 p-4"
          >
            <div className="flex flex-col">
              <div className="flex justify-between">
                <div className="flex flex-col basis-1/2 gap-1">
                  <p className="text-lg font-medium">
                    {stdudent.name} {stdudent.lastname}
                  </p>
                  <p className="text-gray-500">{stdudent.email}</p>
                </div>
                <div className="flex flex-col basis-1/2 justify-center">
                  <p className="text-right">{stdudent.ci}</p>
                </div>
              </div>
              <div className="divider my-3"></div>
              <div className="flex justify-between">
                <span className="flex flex-col justify-center">
                  <p className="font-semibold">Tutor</p>
                  <p className="font-medium">{stdudent.tutor.name}</p>
                </span>

                <span className="flex flex-row items-center gap-1">
                  <Edit
                    href={`/dashboard/personas/estudiantes/edit/${stdudent.id}`}
                  />
                  <Delete id={stdudent.id} />
                  {/* <p>Edit</p>
                  <p>Remove</p> */}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TableStudents;
