import { createNote } from "@/utils";
import { useState, useEffect } from "react";
const CreateNote = () => {
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const handleCreate = async () => {
    try {
      const res = await createNote({
        Subject: subject,
        Text: content,
      });
      console.log(res);
    } catch (err) {
      console.log(err as string);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (content.trim() || subject.trim()) handleCreate();
    }, 2000);

    return () => clearTimeout(debounce);
  }, [content, subject]);

  return (
    <section className="bg-blue-400 p-8 gap-5 w-3/5 h-screen flex flex-col">
      <div className="flex flex-col gap-4">
        <input
          onChange={(e) => setSubject(e.target.value)}
          type="text"
          placeholder="Subject"
          className="w-full outline-none p-3 border-none "
        />
        <hr className="bg-gray-500" />
      </div>
      <textarea
        className="outline-none scroll-m-3.5"
        onChange={(e) => setContent(e.target.value)}
        name=""
        id=""
        cols={40}
      />
    </section>
  );
};

export default CreateNote;
