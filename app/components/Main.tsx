"use client";
import React from "react";
import CreateNote from "./CreateNote";
import Default from "./Default";
import ShowNote from "./ShowNote";
import FavoriteP from "./Favorite";
import ArchivedP from "./Archived";
import Trach from "./Trach";
interface Prop {
  isCreating: boolean;
  activeSection: string;
  folderId: string;
  noteId: string | null;
  setNoteId: (id: string | null) => void;
}
const Main = ({
  isCreating,
  activeSection,
  folderId,
  noteId,
  setNoteId,
}: Prop) => {
  return (
    <section className="bg-[#181818] overflow-auto p-6 ap-5 w-3/5 h-screen text-white flex flex-col">
      {isCreating ? (
        <CreateNote folderid={folderId} />
      ) : (activeSection === "folders" || activeSection === "recent") && noteId ? (
        <ShowNote noteId={noteId} />
      ) : activeSection === "favorites" ? (
        <FavoriteP />
      ) : activeSection === "archived" ? (
        <ArchivedP />
      ) : activeSection === "trach" ? (
        <Trach />
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
