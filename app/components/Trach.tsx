import { listFavorites, listTrach } from "@/utils";
import React, { useEffect, useReducer, useState } from "react";
type Notes = {
  title: string;
  content: string;
  created_at: string;
};
const Trach = () => {
  const [traches, setTraches] = useState<Notes[]>();
  useEffect(() => {
    const getTrach = async () => {
      try {
        const res = await listTrach();
        if (res) {
          setTraches(res);
        }
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getTrach();
  }, []);
  return (
    <section className=" w-full p-5 gap-5 h-screen flex flex-col">
      <section className=" w-full p-5 gap-5 h-screen flex flex-col">
        {traches?.map((note, i) => (
          <div key={i}>
            <span>{note.title}</span>
            <span>{note.content.slice(0, 10)}...</span>
            <span>{note.created_at.slice(0, 10)}</span>
          </div>
        ))}{" "}
      </section>
    </section>
  );
};

export default Trach;
