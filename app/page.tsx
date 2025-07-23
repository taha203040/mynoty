"use client";
import Main from "./components/Main";
import { NoteList } from "./components/NoteList";
import SideBar from "./components/SideBar";
import { useState } from "react";
export default function Home() {
  const [isCreating, setIsCreating] = useState(false);
  const [isClicked, setisClicked] = useState(false);
  const [noteID, setNoteId] = useState<string | null>(null);
  const [folderid, setId] = useState("");

  return (
    <div className="w-full h-screen flex">
      <SideBar
        setId={setId}
        isCreating={isCreating}
        setIsCreating={setIsCreating}
      />
      <NoteList folder_id={folderid} />
      <Main
        folderId={folderid}
        NoteId={noteID}
        isCreating={isCreating}
        isClicked={isClicked}
      />
    </div>
  );
}
