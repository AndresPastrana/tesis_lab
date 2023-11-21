import { CourtRole } from "@/app/const";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

export const CardCourt = ({
  deafutlCourt,
}: {
  deafutlCourt: {
    id: string;
    name: string;
    members: { profesor: { id: string; name: string }; role: CourtRole }[];
  };
}) => {
  return (
    <>
      <div className="card w-96 bg-base-100 p-3 shadow-xl">
        <div className="card-body flex flex-col gap-3">
          <div className="flex gap-4 items-center">
            <span className="min-w[100px]">Nombre :</span>
            <h2 className="card-title">{deafutlCourt.name}</h2>
          </div>

          <div>
            {Object.values(CourtRole).map((role) => (
              <div key={role} className="mb-2 flex gap-2">
                <label className="min-w-[100px]">{role}:</label>
                <span className="font-semibold">
                  {
                    deafutlCourt.members.find((m) => m.role === role)?.profesor
                      .name
                  }
                </span>
              </div>
            ))}
          </div>

          {/* Edit and Delete buttons */}
          <div className="flex justify-between mt-4 items-center">
            <span className="flex items-center">Aciones: </span>

            <div className="flex items-center gap-2 justify-between">
              <button className="p-2 btn btn-square btn-outline bg-transparent">
                <PencilIcon className="" />
              </button>
              <button className="p-2 btn btn-square btn-outline bg-transparent">
                <TrashIcon className="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
