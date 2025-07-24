import { listArchives } from "@/utils";
import React from "react";
import { useState, useEffect } from "react";
type Notes = {
  title: string;
  content: string;
  created_at: string;
};

const ArchivedP = () => {
  const [archived, setArchived] = useState<Notes[]>();
  useEffect(() => {
    const getArchived = async () => {
      try {
        const res = await listArchives();
        if (res) {
          setArchived(res);
        }
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getArchived();
  }, []);

  return (
    <section className=" w-full p-5 gap-5 h-screen flex flex-col">
      {archived?.map((note, i) => (
        <div>
          <span>{note.title}</span>
          <span>{note.content.slice(0, 10)}...</span>
          <span>{note.created_at.slice(0, 10)}</span>
        </div>
      ))}{" "}
    </section>
  );
};

export default ArchivedP;
