// "use server"
import { getFolder, getnotes } from "@/utils";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { useState } from "react";
import { sourceSans3 } from "../fonts";
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
  setNoteId,
}: {
  folder_id: string;
  isClick: boolean;
  setNoteId: (val: any) => void;
}) => {
  const [foldername, setfoldername] = useState("");
  const [notes, setnotes] = useState<Note[]>([]);
  const { user } = useUser();
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await getnotes({ folderid: folder_id, userid: user?.id });
        setnotes(res);
        // console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchFolders = async () => {
      try {
        const res = await getFolder({ folderid: folder_id });
        if (res) setfoldername(res.name);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotes();
    fetchFolders();
  }, [folder_id]);

  return (
    <article
      className={` ${sourceSans3.className} w-1/5 overflow-y-auto bg-[#1c1c1c] h-full flex flex-col relative gap-4 `}
    >
      <p className="text-[#fcfcfc] font-bold text-xl  top-0 p-3">
        {foldername}
      </p>

      {/* <div className="gap-3 flex flex-col"> */}
      {notes.map((note, id) => (
        <div
          key={id}
          className="bg-[#232323] transition-color relative h-[90px] mx-5 flex flex-col p-4 text-[#fcfcfc] cursor-pointer hover:bg-[#2c2c2c] transition-colors rounded "
          onClick={() => {
            setNoteId(note.id); // Set the note ID when clicked
          }}
        >
          <h3 className="text-lg font-semibold">{note.title.slice(0, 10)}</h3>
          <p className="text-sm absolute bottom-4">
            <span className="text-[#a3a3a3] ">
              {note.created_at.slice(0, 10)}
            </span>
            <span className="mx-2">{note.content.slice(0, 20)}...</span>
          </p>
        </div>
      ))}
      {/* </div> */}
    </article>
  );
};
