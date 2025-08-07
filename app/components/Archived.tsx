import { listArchives } from "@/utils";
import { useUser } from "@clerk/nextjs";
import { faFile, faTimeline, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState, useEffect } from "react";
import NoteActionIcons from "./NoteActionIcons";
type Notes = {
  title: string;
  content: string;
  created_at: string;
};

const ArchivedP = () => {
  const [archived, setArchived] = useState<Notes[]>();
  const { user } = useUser();
  if (!user) throw new Error("error no user");
  useEffect(() => {
    const getArchived = async () => {
      try {
        const res = await listArchives({ userid: user?.id });
        if (res) {
          setArchived(res);
          console.log(res);
        }
      } catch (err) {}
    };
    getArchived();
  }, [user]);

  // Placeholder unarchive handler
  const handleUnarchive = async (noteId: string) => {
    // TODO: implement actual unarchive logic
    alert(`Unarchive note ${noteId}`);
  };

  return (
    <section className=" w-full p-5 gap-5 h-screen flex flex-col">
      {archived && archived.length != 0 ? (
        archived.map((note: any, i) => (
          <div key={i} className="flex flex-col bg-[#232323] rounded p-4 mb-2 relative">
            <div className="flex justify-between items-center">
              <span>{note.title}</span>
              <NoteActionIcons state="archived" onUnarchive={() => handleUnarchive(note.id)} />
            </div>
            <span>{note.content.slice(0, 10)}...</span>
            <span>{note.created_at.slice(0, 10)}</span>
          </div>
        ))
      ) : (
        <section
          className={`flex flex-col justify-center items-center h-full gap-5 text-4xl text-center`}
        >
          <FontAwesomeIcon icon={faTimesCircle} />
          <h1>There is No archived Notres here</h1>
        </section>
      )}
    </section>
  );
};

export default ArchivedP;
