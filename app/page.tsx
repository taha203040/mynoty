"use client";
import Main from "./components/Main";
import { NoteList } from "./components/NoteList";
import SideBar from "./components/SideBar";
import { useState } from "react";
export default function Home() {
  const [isCreating, setIsCreating] = useState(false);
  return (
    <div className="w-full h-screen flex">
      <SideBar isCreating={isCreating} setIsCreating={setIsCreating} />
      <NoteList />
      <Main isCreating={isCreating} />
    </div>
  );
}
