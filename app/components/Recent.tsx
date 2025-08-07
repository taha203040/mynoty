import { getRecentNotes } from "@/utils";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { sourceSans3 } from "../fonts";
type Note = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};
const RecentP = ({ setNoteId, noteId }: { setNoteId: (id: string) => void; noteId: string | null }) => {
  const [recent, setRecent] = useState<Note[]>([]);
  const { user } = useUser();
  useEffect(() => {
    if (!user) return;
    const getRecent = async () => {
      try {
        const res = await getRecentNotes({ userId: user.id });
        if (res) {
          setRecent(res);
          if (res.length > 0 && !noteId) setNoteId(res[0].id);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getRecent();
  }, [user, noteId, setNoteId]);
  return (
    <article
      className={` ${sourceSans3.className} overflow-y-auto bg-[#1c1c1c] h-full flex flex-col relative gap-4 `}
    >
      {recent && recent.length > 0 ? (
        recent.map((note, id) => (
          <div
            key={id}
            className={`bg-[#232323] transition-color relative h-[90px] mx-5 flex flex-col p-4 text-[#fcfcfc] cursor-pointer hover:bg-[#2c2c2c] transition-colors rounded ${noteId === note.id ? "ring-2 ring-blue-400" : ""}`}
            onClick={() => setNoteId(note.id)}
          >
            <h3 className="text-lg font-semibold">{note.title.slice(0, 10)}</h3>
            <p className="text-sm absolute bottom-4">
              <span className="text-[#a3a3a3] ">{note.created_at.slice(0, 10)}</span>
              <span className="mx-2">{note.content.slice(0, 20)}...</span>
            </p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400 mt-8">No recent notes found.</p>
      )}
    </article>
  );
};
export default RecentP;