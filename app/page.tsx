"use client";
import Main from "./components/Main";
import { NoteList } from "./components/NoteList";
import SideBar from "./components/SideBar";
import { useState } from "react";
export default function Home() {
  const [isCreating, setIsCreating] = useState(false);
  const [isClicked, setisClicked] = useState(false);
  const  [noteID , setNoteId] =useState<string | null>(null)
  return (
    <div className="w-full h-screen flex">
      <SideBar isCreating={isCreating} setIsCreating={setIsCreating} />
      <NoteList setNoteId={setNoteId} isClicked={isClicked} setIsClicked={setisClicked} />
      <Main NoteId={noteID} isCreating={isCreating} isClicked={isClicked} />
    </div>
  );
}
