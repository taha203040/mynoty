// "use server"
import { getnotes } from "@/utils";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { useState } from "react";
// import { getnotes } from "@/utils";
type Note = {
  title: string;
  content: string;
  id: string;
  created_at: string;
};

interface Props {
  setIsClicked: (val: boolean) => void;
  isClicked: boolean;
  setNoteId: (val: any) => void;
}

export const NoteList = ({ folder_id }: { folder_id: string }) => {
  const [notes, setnotes] = useState<Note[]>([]);
  const { user } = useUser();
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await getnotes({ folderid: folder_id, userid: user?.id });
        setnotes(res);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotes();
  }, [folder_id]);
  return (
    <>
    
      <article className="w-1/5 overflow-y-auto bg-[#1c1c1c] h-full justify-center flex flex-col p-8 ">
        <div className="gap-3 flex flex-col">
          {notes.map((note, id) => (
            <div
              key={id}
              className="bg-[#232323] p-3 rounded-md text-[#fcfcfc] cursor-pointer hover:bg-[#2c2c2c] transition-all"
              onClick={() => {
                // Handle note click
                console.log(`Note clicked: ${note.content}`);
              }}
            >
              <h3 className="text-lg font-semibold">{note.title}</h3>
              <p className="text-sm">{note.content}...</p>
            </div>
          ))}
        </div>
      </article>
    </>
  );
};
