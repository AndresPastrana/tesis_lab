"use client";
import { CourtRole } from "@/app/const";
// Will recive a list of profesors or posbibble memebers

export const FormCreateCourt = ({
  posible_members,
  deafutlCourt,
}: {
  posible_members: { id: string; name: string }[];
  deafutlCourt?: {
    id: string;
    name: string;
    members: { profesor: { id: string }; role: CourtRole }[];
  };
}) => {
  return (
    <>
      <form action="">
        <input
          type="text"
          name="tribunal"
          id="tribunal"
          defaultValue={deafutlCourt?.name}
          contentEditable
          placeholder="Nombre del tribunal"
          className="pl-1 my-5 input font-semibold"
        />
        {Object.values(CourtRole).map((role) => (
          <div key={role} style={{ marginBottom: "10px" }}>
            <label
              htmlFor={role}
              style={{ display: "inline-block", width: "100px" }}
            >
              {role}:
            </label>
            <select
              defaultValue={
                deafutlCourt?.members.find((m) => m.role === role)?.profesor.id
              }
              className="select"
              id={role}
              name={role}
            >
              <option value="" disabled>
                Select Member
              </option>
              {posible_members.map((m) => {
                return <option value={m.id}>{m.name}</option>;
              })}
            </select>
          </div>
        ))}
      </form>
    </>
  );
};
