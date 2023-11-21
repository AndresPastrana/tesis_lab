"use client";
import { PlusIcon } from "@heroicons/react/20/solid";
import React from "react";
import { FormCreateCourt } from "./FormCourt";

export function AddCourt() {
  const handleAddCourt = () => {
    const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
    modal.showModal();
  };
  return (
    <>
      <div
        onClick={handleAddCourt}
        className="w-40 h-40 flex items-center justify-center text-gray-400 hover:text-gray-800 hover:border hover:border-gray-800 border-2 rounded-lg transition-all ease-in-out delay-100"
      >
        <PlusIcon className="w-10 h-10" />
      </div>

      {/* This is hidden by defautl */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <FormCreateCourt
            posible_members={[{ id: "1", name: "Carlos Casto" }]}
          />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

{
  /* Open the modal using document.getElementById('ID').showModal() method */
}
