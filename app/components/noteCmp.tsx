import React from "react";
interface PropsNote {
  Subject: string;
  text: string;
  isClicked: boolean;
  setIsClicked: (val: boolean) => void;
  onSelectNote: () => void;
  created_At: string;
}
export const NoteCmp = ({
  created_At,
  Subject,
  text,
  isClicked,
  setIsClicked,
  onSelectNote,
}: PropsNote) => {
  const shortDate =
    created_At.length > 10 ? created_At.slice(0, 10) : created_At;
  const shortText = text.length > 40 ? text.slice(0, 40) : text;

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
        <span>{shortDate} hi</span>
        <span className="mx-4">{shortText}</span>
      </div>
    </article>
  );
};
