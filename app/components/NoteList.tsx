import React from "react";
import { NoteCmp } from "./noteCmp";

export const NoteList = () => {
  return (
    <article className="w-1/5 bg-amber-200 h-full p-3 flex flex-col gap-4">
      <div className="gap-3 flex flex-col">
        <p>Personal</p>
      <NoteCmp />
      <NoteCmp />
      <NoteCmp />
      <NoteCmp />
      <NoteCmp />
      <NoteCmp />
      <NoteCmp />
      </div>
    </article>
  );
};
