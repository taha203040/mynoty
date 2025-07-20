"use client";
import React from "react";
import CreateNote from "./CreateNote";
import Default from "./Default";
import ShowNote from "./ShowNote";
interface Prop {
  isCreating: boolean;
  isClicked?: boolean;
  NoteId?: any;
}
const Main = ({ isCreating, isClicked, NoteId }: Prop) => {
  return (
    <section className="bg-[#181818] p-8 gap-5 w-3/5 h-screen text-white flex flex-col">
      {isCreating ? (
        <CreateNote />
      ) : isClicked && NoteId ? (
        <ShowNote noteId={NoteId} />
      ) : (
        <Default />
      )}
    </section>
  );
};

export default Main;

/* <h1 className="text-2xl">Hi am taha</h1>
<div className="flex flex-col gap-4">
  <div className="flex  gap-3">
    <span>📆</span
    <span>Date</span> <span>21/03/2002</span>
  </div>
  <div className="flex gap-3">
    <span>📆</span>
    <span>Date</span> <span>21/03/2002</span>
  </div>
</div>
<div>
  <input
    type="text"
    placeholder="Subject"
    className="w-full outline-none p-3 border-none "
  />
  <hr className="bg-gray-500" />
</div>
<textarea className="outline-none scroll-m-3.5"  name="" id="" cols={40} /> */
