import { createNote } from "@/utils";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
type Folder = {
  folderid: string;
};
const CreateNote = ({ folderid }: Folder) => {
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const { user } = useUser();
  if (!user) throw new Error("User not found");
  const handleCreate = async () => {
    try {
      const res = await createNote({
        title: subject,
        content: content,
        folder_id: folderid,
        user_id: user?.id ,
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
    <section className="bg-[#181818] p-8 gap-5 w-3/5 h-screen flex flex-col">
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
        className="outline-none scroll-m-3.5 w-[350px] h-[400px]
        resize-none"
        onChange={(e) => setContent(e.target.value)}
        name=""
        id=""
        cols={40}
      />
    </section>
  );
};

export default CreateNote;
