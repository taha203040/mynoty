"use client";
import Main from "./components/Main";
import { NoteList } from "./components/NoteList";
import SideBar from "./components/SideBar";
import { use, useState } from "react";
export default function Home() {
  const [isCreating, setIsCreating] = useState(false);
  const [isClicked, setisClicked] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [noteID, setNoteId] = useState<string | null>(null);
  const [folderid, setId] = useState("");
  const [isClickedFav, setIsClickedFav] = useState(false);
  const [isClickedTrach, setIsClickedTrach] = useState(false);
  const [isClickedArch, setIsClickedArch] = useState(false);

  return (
    <div className="w-full h-screen flex">
      <SideBar
        isClickedFav={isClickedFav}
        isClickedTrach={isClickedTrach}
        isClickedArch={isClickedArch}
        setId={setId}
        isCreating={isCreating}
        isclick={isClick}
        setIsCreating={setIsCreating}
        setIsClick={setIsClick}
        setisClicked={setisClicked}
        setIsClickedTrach={setIsClickedTrach}
        setIsClickedFav={setIsClickedFav}
        setIsClickedArch={setIsClickedArch}
      />
      <NoteList setNoteId={setNoteId} folder_id={folderid} isClick={isClick} />
      <Main
        isClickedTrach={isClickedTrach}
        isClickedArch={isClickedArch}
        isClickedFav={isClickedFav}
        folderId={folderid}
        NoteId={noteID}
        isCreating={isCreating}
        isClicked={isClicked}
      />
    </div>
  );
}
