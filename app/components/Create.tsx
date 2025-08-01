"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { kaushan, sourceSans3 } from "../fonts";
import { useUser } from "@clerk/nextjs";
import { searchNotes } from "@/utils";

// ✅ تعريف واجهة الملاحظات
interface Note {
  title: string;
  content: string;
  created_at: string;
}

// ✅ تعريف واجهة الخصائص المستلمة من المكون الأب
interface CreateProps {
  isCreating: boolean;
  setIsCreating: (val: boolean) => void;
}

const Create = ({ isCreating, setIsCreating }: CreateProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useUser();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (!user) return;

    const delayDebounce = setTimeout(() => {
      const handleSearch = async () => {
        const trimsearch = searchTerm.trim();
        if (trimsearch == "") {
          setNotes([]);
          return;
        }
        try {
          const res = await searchNotes({
            searchTerm: searchTerm,
            userId: user.id,
          });
          console.log(searchTerm);
          if (res) setNotes(res);
        } catch (err) {
          console.error("Search error:", err);
        }
      };
      handleSearch();
    }, 2000); // مهلة لمنع كثرة الطلبات

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, user]);

  return (
    <div className="flex flex-col gap-3 p-2">
      <div className="flex justify-between items-center">
        <div
          className={`${kaushan.className} font-bold text-2xl text-[#fcfcfc]`}
        >
          Noty
        </div>
        <p
          onClick={() => setIsSearching(!isSearching)}
          className="text-[25px] cursor-pointer"
        >
          <FontAwesomeIcon icon={faSearch} className="text-[#fcfcfc]" />
        </p>
      </div>

      {isSearching ? (
        <>
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search note"
            type="text"
            className="w-full text-[#fcfcfc] bg-[#232323] h-10 transition-all rounded outline-none text-center"
          />
          <section
            className={`flex gap-8 w-full md:w-1/2 h-full bg-[#181818] flex-col z-10 ${sourceSans3.className} text-[#a3a3a3]`}
          >
            {notes && notes.length !== 0 ? (
              notes.map((nt, i) => (
                <div key={i} className="p-2 border-b border-gray-700">
                  <h2 className="text-lg font-bold text-white">
                    {nt.title.slice(0, 15)}
                  </h2>
                  <p>{nt.content.slice(0, 15)}</p>
                </div>
              ))
            ) : (
              <div className="p-2 text-center text-gray-500">
                Nothing matches
              </div>
            )}
          </section>
        </>
      ) : (
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="w-full bg-[#232323] text-[#fcfcfc] h-10 rounded outline-none text-center"
        >
          <span className="text-xl">+</span> New Note
        </button>
      )}
    </div>
  );
};

export default Create;
