import React from "react";
interface PropsNote {
  Subject: string;
  text: string;
  isClicked: boolean;
  setIsClicked: (val: boolean) => void;
  onSelectNote: () => void;
}
export const NoteCmp = ({
  Subject,
  text,
  isClicked,
  setIsClicked,
  onSelectNote,
}: PropsNote) => {
  return (
    <article
      onClick={() => {
        setIsClicked(!isClicked);
        onSelectNote(); // 👈 استدعاء الدالة المرسلة
      }}
      className=" flex gap-1 flex-col max-w-3xs bg-amber-700 p-3 rounded"
    >
      <h3>{Subject}</h3>
      <div className="text-xs ">
        <span></span>
        <span className="mx-4">{text}</span>
      </div>
    </article>
  );
};
