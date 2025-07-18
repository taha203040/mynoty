import { getNoteById } from "@/utils";
import { useState, useEffect } from "react";
interface prop {
  noteId: string;
}
type Note = {
  Subject: string;
  Text: string;
  id: string;
};
const ShowNote = ({ noteId }: prop) => {
  const [content, setContent] = useState("");
  const [title, setSubject] = useState("");
  const [note, setNote] = useState<Note | null>(null);
  useEffect(() => {
    const handlegetData = async () => {
      try {
        const res = await getNoteById({ noteId: noteId });
        if (res) {
          setNote(res);
          setSubject(res.Subject);
          setContent(res.Text);
        }
        console.log("hi subject", res.Subject);

        console.log("hi from ", res.Text);
        console.log(res);
      } catch (err) {
        console.log(err as Error);
      }
    };

    handlegetData();
  }, []);

  return (
    <section className="bg-blue-400 p-8 gap-5 w-3/5 h-screen flex flex-col">
      <div className="flex flex-col gap-4">
        <input
          value={title}
          onChange={(e) => setSubject(e.target.value)}
          type="text"
          placeholder="Subject"
          className="w-full outline-none p-3 border-none"
        />
        <hr className="bg-gray-500" />
      </div>
      <textarea
        className="outline-none scroll-m-3.5"
        onChange={(e) => setContent(e.target.value)}
        value={content}
        cols={40}
      />
    </section>
  );
};

export default ShowNote;
