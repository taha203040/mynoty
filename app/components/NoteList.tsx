import React, { useEffect } from "react";
import { NoteCmp } from "./noteCmp";
import { getNotes } from "@/utils";
import { useState } from "react";
type Note = {
  Subject: string;
  Text: string;
  id: string;
  created_at: string;
};

interface Props {
  setIsClicked: (val: boolean) => void;
  isClicked: boolean;
  setNoteId: (val: any) => void;
}

export const NoteList = ({ isClicked, setIsClicked, setNoteId }: Props) => {
  const [notes, setnotes] = useState<Note[]>([]);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await getNotes();
        setnotes(res);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotes();
  }, []);
  return (
    <article className="w-1/5 overflow-y-auto  bg-[#1c1c1c] h-full justify-center flex flex-col p-7">
      <div className="gap-3 flex flex-col">
        <p className="text-[#fcfcfc]">Personal</p>
        {notes.map(({ Subject, Text, id, created_at }) => (
          <NoteCmp
            created_At={created_at}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
            key={id}
            Subject={Subject}
            text={Text}
            onSelectNote={() => setNoteId(id)}
          />
        ))}
      </div>
    </article>
  );
};
