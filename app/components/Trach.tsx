import { listTrach } from "@/utils";
import { useUser } from "@clerk/nextjs";
import { faFile, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useReducer, useState } from "react";
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
  return (
    <section className=" w-full p-5 gap-5 h-screen flex flex-col">
      <section className=" w-full p-5 gap-5 h-screen flex flex-col">
        {traches && traches.length != 0 ? (
          traches.map((note, i) => (
            <div key={i}>
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
            <h1>There is No Trach here</h1>
          </section>
        )}{" "}
      </section>
    </section>
  );
};

export default Trach;
