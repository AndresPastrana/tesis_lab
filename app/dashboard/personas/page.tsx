import Breadcrumbs, { CrumbItem } from "@/app/ui/Breadcrumbs";
import Cards from "@/app/ui/personas/Cards";

import React from "react";

const page = () => {
  const items: CrumbItem[] = [
    { label: "Dashoboard", href: "/dashboard" },
    { label: "Personas" },
  ];
  return (
    <div>
      <h2 className="text-center mt-8 mb-4 text-neutral-500">Personas</h2>
      <Breadcrumbs items={items} />
      <div className="flex flex-col gap-3">
        <Cards />
      </div>
    </div>
  );
};

export default page;
