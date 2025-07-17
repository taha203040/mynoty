import React, { useEffect } from "react";
import { NoteCmp } from "./noteCmp";
import { getNotes } from "@/utils";
import { useState } from "react";
type Note = {
  Subject: string;
  Text: string;
  id :string
};
export const NoteList = () => {
  const [notes, setnotes] = useState<Note[]>([]);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await getNotes();
        setnotes(res);
        console.log(res);
      } catch (err) {}
    };
    fetchNotes();
  }, []);
  return (
    <article className="w-1/5 bg-amber-200 h-full p-3 flex flex-col gap-4">
      <div className="gap-3 flex flex-col">
        <p>Personal</p>
        {notes.map(({ Subject, Text , id }) => (
          <NoteCmp key={id} Subject={Subject} text={Text} />
        ))}
      </div>
    </article>
  );
};
