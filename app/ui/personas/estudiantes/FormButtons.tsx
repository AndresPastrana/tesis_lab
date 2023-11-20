"use client";
import Link from "next/link";
import {
  PencilSquareIcon,
  TrashIcon,
  BellAlertIcon,
} from "@heroicons/react/24/outline";
import { deleteProfesorById } from "@/app/lib/actions";
import { toast } from "sonner";

export const Cancel = ({ href }: { href: string }) => {
  return (
    <Link href={href}>
      <button className="min-w-[150px] btn btn-md">Cancel</button>
    </Link>
  );
};

export const Save = () => {
  return (
    <button
      type="submit"
      className="min-w-[150px] btn btn-md bt bg-green-700 text-neutral-100 hover:bg-green-800"
    >
      Save
    </button>
  );
};

export const Edit = ({ href }: { href: string }) => {
  return (
    <Link href={href}>
      <button className="btn btn-square bg-transparent border-none">
        <PencilSquareIcon className="w-6 h-6" />
      </button>
    </Link>
  );
};

export const Delete = ({ id }: { id: string }) => {
  const handleDelete = () => {
    toast("Estas seguro que desea eliminar este profesor ?", {
      description:
        "Elimminar este prpfesor pued implicar cambios inseperados en el sistema.Un profesor puede estar vinculados a varios estudiantes y eventos",
      className: "text-gray-900",
      duration: 60000,
      actionButtonStyle: {
        color: "red",
        border: "1px solid red",
        background: "none",
      },
      action: {
        label: "Estoy seguro",
        onClick: () => deleteProfesorById(id),
      },

      descriptionClassName: "py-2 ",

      cancel: {
        label: "Cancelar",
      },
      icon: <BellAlertIcon />,
    });
  };

  return (
    <button
      onClick={handleDelete}
      className="btn btn-square bg-transparent border-none"
    >
      <TrashIcon className="w-6 h-6" />
    </button>
  );
};
