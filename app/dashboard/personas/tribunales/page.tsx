import { CourtRole } from "@/app/const";
import { CardCourt } from "@/app/ui/tribunales/CardCourt";
import { AddCourt } from "@/app/ui/tribunales/CretateCardButton";
import { FormCreateCourt } from "@/app/ui/tribunales/FormCourt";
import React from "react";

const fakePossibleMembers = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Doe" },
  { id: "3", name: "Alice Smith" },
  { id: "4", name: "Bob Johnson" },
  { id: "4", name: "Bob Johnson" },
  // Add more fake members as needed
];

const page = () => {
  // Fetch all courtd foramted

  return (
    <div className="flex justify-start gap-4 flex-wrap">
      {/* TODO: Render here*/}
      <AddCourt />
    </div>
  );
};

export default page;
