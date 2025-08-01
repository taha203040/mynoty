import { getRecentNotes } from "@/utils";
import { useUser } from "@clerk/nextjs";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

type Note = {
  id: string;
  title: string;
  folder?: string;
  created_at: string;
  note_id: string;
};

export const Option1 = () => {
  const { user } = useUser();
  const [notes, setNotes] = useState<Note[]>([]);
  useEffect(() => {
    if (!user) return;

    const handleGetRecent = async () => {
      try {
        const res = await getRecentNotes({ userId: user.id });
        // console.log(res, "data");
        if (res) {
          // @ts-ignore
          setNotes(res);
        }
      } catch (err) {
        console.log("Failed to get recent notes", err);
      }
    };

    handleGetRecent();
  }, [user]);
  return (
    <article className="h-1/4 w-full bg-red">
      <h2 className="mb-2 text-[#a3a3a3] p-2 ">Recent</h2>
      <div className="flex flex-col  w-full overflow-auto ">
        {notes.length === 0 && (
          <p className="text-[#a3a3a3]">No recent notes.</p>
        )}
        {notes.map((note, i) => (
          <div key={i} className="flex items-center gap-2 text-[#a3a3a3]">
            <span className="hover:bg-[#232323] p-1 w-full transition-colors cursor-pointer flex items-center">
              <FontAwesomeIcon
                icon={faFile}
                className=" text-[#a3a3a3] mx-1.5"
              />
              {note.title.slice(0, 15)}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
};
