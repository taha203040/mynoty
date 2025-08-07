"use client";
import Main from "./components/Main";
import { NoteList } from "./components/NoteList";
import SideBar from "./components/SideBar";
import { use, useState, useEffect } from "react";
export default function Home() {
  const [isCreating, setIsCreating] = useState(false);
  const [noteId, setNoteId] = useState<string | null>(null);
  const [folderid, setId] = useState("");
  const [activeSection, setActiveSection] = useState<string>("recent"); // default to recent

  // Reset noteId when switching section or folder
  useEffect(() => {
    setNoteId(null);
  }, [activeSection, folderid]);

  return (
    <div className="w-full h-screen flex">
      <SideBar
        setId={(id) => {
          setId(id);
          setActiveSection("folders");
        }}
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <NoteList 
        setNoteId={setNoteId} 
        folder_id={folderid} 
        isClick={true} 
        noteId={noteId} 
      />
      <Main
        activeSection={activeSection}
        folderId={folderid}
        noteId={noteId}
        isCreating={isCreating}
        setNoteId={setNoteId}
      />
    </div>
  );
}
