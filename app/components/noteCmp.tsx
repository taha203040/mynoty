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
  const shortText = text.length > 20 ? text.slice(0, 10) : text;
  const shortSubject = Subject.length > 30 ? Subject.slice(0, 15) : Subject;
  return (
    <article
      onClick={() => {
        setIsClicked(!isClicked);
        onSelectNote(); // 👈 استدعاء الدالة المرسلة
      }}
      className=" flex gap-1 h-[70px] flex-col text-white max-w-3xs bg-[#232323] p-3 rounded"
    >
      <h3>{shortSubject}</h3>

      <div className="text-xs">
        <span>{shortDate}</span>
        <span className="mx-4">{shortText}</span>
      </div>
    </article>
  );
};
