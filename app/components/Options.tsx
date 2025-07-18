import { getNotes } from "@/utils";
import React from "react";
import { useEffect, useState } from "react";
type Note = {
  Subject: string;
  folder?: string;
  id: any;
};
export const Options = () => {
  const [options, setoptions] = useState<Note[]>([]);
  useEffect(() => {
    const HandleNotes = async () => {
      try {
        const res = await getNotes();
        setoptions(res);
      } catch (err) {
        console.log(err || "failed to fetch data");
      }
    };
    HandleNotes();
  }, []);

  return (
    <article className="flex flex-col gap-2">
      <p className="text-sm">Recent</p>
      {options.map(({ Subject, folder, id }) => (
        <h1 key={id}>{Subject}</h1>
      ))}
    </article>
  );
};
