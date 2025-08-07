import { listTrach } from "@/utils";
import { useUser } from "@clerk/nextjs";
import { faFile, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useReducer, useState } from "react";
import NoteActionIcons from "./NoteActionIcons";
type Notes = {
  title: string;
  content: string;
  created_at: string;
};
const Trach = () => {
  const [traches, setTraches] = useState<Notes[]>();
  const { user } = useUser();

  useEffect(() => {
    if (!user) throw new Error("no user auth ");
    const getTrach = async () => {
      try {
        const res = await listTrach({ userid: user?.id });
        if (res) {
          setTraches(res);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getTrach();
  }, [user]);

  // Placeholder handlers
  const handleRestore = async (noteId: string) => {
    // TODO: implement actual restore logic
    alert(`Restore note ${noteId}`);
  };
  const handleDeletePermanent = async (noteId: string) => {
    // TODO: implement actual permanent delete logic
    alert(`Delete permanently note ${noteId}`);
  };

  return (
    <section className=" w-full p-5 gap-5 h-screen flex flex-col">
      <section className=" w-full p-5 gap-5 h-screen flex flex-col">
        {traches && traches.length != 0 ? (
          traches.map((note: any, i) => (
            <div key={i} className="flex flex-col bg-[#232323] rounded p-4 mb-2 relative">
              <div className="flex justify-between items-center">
                <span>{note.title}</span>
                <NoteActionIcons state="trashed" onRestore={() => handleRestore(note.id)} onDeletePermanent={() => handleDeletePermanent(note.id)} />
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
            <h1>There is No Trach here</h1>
          </section>
        )}
      </section>
    </section>
  );
};

export default Trach;
