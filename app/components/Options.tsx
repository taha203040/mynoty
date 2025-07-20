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
    <article className="flex flex-col gap-2 text-white">
      <p className="text-sm">Recent</p>
      {options.map(({ Subject, folder, id }) => {
        const shortSubject =
          Subject.length > 10 ? Subject.slice(0, 10) : Subject;
        return (
          <h1 className="p-2 focus:outline-violet-500" key={id}>
            {shortSubject}
          </h1>
        );
      })}
    </article>
  );
};
