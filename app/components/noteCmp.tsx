import React from "react";
interface PropsNote {
  Subject: string;
  text: string;
}
export const NoteCmp = ({ Subject, text }: PropsNote) => {
  return (
    <article className=" flex gap-1 flex-col max-w-3xs bg-amber-700 p-3 rounded">
      <h3>{Subject}</h3>
      <div className="text-xs ">
        <span></span>
        <span className="mx-4">{text}</span>
      </div>
    </article>
  );
};
