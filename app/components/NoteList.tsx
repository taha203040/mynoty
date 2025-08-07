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

export const NoteList = ({
  folder_id,
  setNoteId,
  isClick,
  noteId,
}: {
  folder_id: string;
  isClick: boolean;
  setNoteId: (val: any) => void;
  noteId: string | null;
}) => {
  const [foldername, setfoldername] = useState("");
  const [notes, setnotes] = useState<Note[]>([]);
  const { user } = useUser();
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        let res;
        if (!folder_id) {
          // Show recent notes if no folder selected
          const { getRecentNotes } = await import("@/utils");
          res = await getRecentNotes({ userId: user?.id || "" });
          setfoldername("Recent");
        } else {
          res = await getnotes({ folderid: folder_id, userid: user?.id || "" });
          const folderRes = await getFolder({ folderid: folder_id });
          setfoldername(folderRes?.name || "");
        }
        setnotes(res);
        // Auto-select first note if none selected
        if (res && res.length > 0 && !noteId) {
          setNoteId(res[0].id);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotes();
  }, [folder_id, user, noteId, setNoteId]);

  // Always render NoteList, showing recent notes if no folder is selected
  return (
    <article
      className={` ${sourceSans3.className} w-1/5 overflow-y-auto bg-[#1c1c1c] h-full flex flex-col relative gap-4 `}
    >
      <p className="text-[#fcfcfc] font-bold text-xl  top-0 p-3">
        {foldername}
      </p>
      {notes.map((note, id) => (
        <div
          key={id}
          className={`bg-[#232323] transition-color relative h-[90px] mx-5 flex flex-col p-4 text-[#fcfcfc] cursor-pointer hover:bg-[#2c2c2c] transition-colors rounded ${noteId === note.id ? "ring-2 ring-blue-400" : ""}`}
          onClick={() => {
            setNoteId(note.id);
          }}
        >
          <h3 className="text-lg font-semibold">{note.title.slice(0, 10)}</h3>
          <p className="text-sm absolute bottom-4">
            <span className="text-[#a3a3a3] ">{note.created_at.slice(0, 10)}</span>
            <span className="mx-2">{note.content.slice(0, 20)}...</span>
          </p>
        </div>
      ))}
    </article>
  );
};
