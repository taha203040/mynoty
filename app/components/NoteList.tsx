// "use server"
import React, { useEffect } from "react";
import { useState } from "react";
// import { getnotes } from "@/utils";
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
        // const res = await getnotes();
        // setnotes(res);
        // console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    // fetchNotes();
  }, []);
  return (
    <article className="w-1/5 overflow-y-auto bg-[#1c1c1c] h-full justify-center flex flex-col p-8 ">
      <p className="text-[#fcfcfc] py-5 font-bold text-xl">Personal</p>

      <div className="gap-3 flex flex-col">
        {/* {notes.map(({ Subject, Text, id, created_at }) => (
          <NoteCmp
            created_At={created_at}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
            key={id}
            Subject={Subject}
            text={Text}
            onSelectNote={() => setNoteId(id)}
          />
        ))} */}
      </div>
    </article>
  );
};
