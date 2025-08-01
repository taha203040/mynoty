import { listArchives } from "@/utils";
import { useUser } from "@clerk/nextjs";
import { faFile, faTimeline, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState, useEffect } from "react";
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

  return (
    <section className=" w-full p-5 gap-5 h-screen flex flex-col">
      {archived && archived.length != 0 ? (
        archived?.map((note, i) => (
          <div>
            <span>{note.title}</span>
            <span>{note.content.slice(0, 10)}...</span>
            <span>{note.created_at.slice(0, 10)}</span>
          </div>
        ))
      ) : (
        <section
          className={`flex flex-col justify-center items-center h-full gap-5 text-4xl text-center`}
        >
          <FontAwesomeIcon icon={faTimesCircle} />
          <h1>There is No archived Notres here
          </h1>
         
        </section>
      )}
    </section>
  );
};

export default ArchivedP;
