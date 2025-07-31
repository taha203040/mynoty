import { createNote } from "@/utils";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Input, InputGroup } from "@/components/tiptap-ui-primitive/input";
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
        user_id: user?.id,
      });
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
    <section className="bg-[#181818] p-8 gap-5 w-full h-screen flex flex-col">
      <div className="flex flex-col gap-4 w-full">
        <input
          onChange={(e) => setSubject(e.target.value)}
          type="text"
          placeholder="Subject"
          className="w-full outline-none p-3 border-none "
        />
        <hr className="border-[#333333]" />
      </div>
      <textarea
        className="outline-none scroll-m-3.5 w-full overflow-auto h-full
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
