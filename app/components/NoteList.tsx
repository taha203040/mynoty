// "use server"
import { getnotes } from "@/utils";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { useState } from "react";
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

export const NoteList = ({
  folder_id,
  isClick,
  setNoteId,
}: {
  folder_id: string;
  isClick: boolean;
  setNoteId: (val: any) => void;
}) => {
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
      <article className="w-1/5 overflow-y-auto bg-[#1c1c1c] h-full flex flex-col relative p-8 ">
        <p className="text-[#fcfcfc] py-5 font-bold text-xl  top-0">
          Personal
        </p>

        <div className="gap-3 flex flex-col">
          {isClick &&
            notes.map((note, id) => (
              <div
                key={id}
                className="bg-[#232323] p-3 rounded-md text-[#fcfcfc] cursor-pointer hover:bg-[#2c2c2c] transition-all"
                onClick={() => {
                  setNoteId(note.id); // Set the note ID when clicked
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
