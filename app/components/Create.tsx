"use client";
import { useEffect, useState, useRef } from "react";
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
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) return;
    if (!isSearching) return;
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
          if (res) setNotes(res);
        } catch (err) {
          console.error("Search error:", err);
        }
      };
      handleSearch();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm, user, isSearching]);

  // Hide search bar when clicking outside
  useEffect(() => {
    if (!isSearching) return;
    function handleClick(e: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setIsSearching(false);
        setSearchTerm("");
        setNotes([]);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isSearching]);

  return (
    <div className="flex flex-col gap-3 p-2">
      <div className="flex items-center gap-2 w-full relative">
        <div className="flex items-center gap-2 w-full">
          <div
            className={`${kaushan.className} font-bold text-2xl text-[#fcfcfc] cursor-pointer select-none`}
            onClick={() => {
              setIsSearching(false);
              setSearchTerm("");
              setNotes([]);
            }}
          >
            Noty
          </div>
          <button
            className="ml-auto p-2 rounded-full hover:bg-[#232323] transition-colors"
            onClick={() => {
              setIsSearching((v) => !v);
              if (!isSearching) setTimeout(() => searchRef.current?.focus(), 100);
              if (isSearching) {
                setIsSearching(false);
                setSearchTerm("");
                setNotes([]);
              }
            }}
            aria-label="Open search"
          >
            <FontAwesomeIcon icon={faSearch} className="text-[#fcfcfc] text-lg" />
          </button>
        </div>
        {isSearching && (
          <div className="absolute left-0 top-12 w-full z-20" ref={searchRef}>
            <div className="relative w-full">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search notes..."
                type="text"
                className="w-full text-[#fcfcfc] bg-[#232323] h-11 transition-all rounded-lg outline-none pl-10 pr-8 text-base border border-[#333] shadow-lg focus:ring-2 focus:ring-[#6c47ff]"
                autoFocus
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a3a3a3] text-lg pointer-events-none"
              />
              {searchTerm && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#a3a3a3] hover:text-red-400 text-lg"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
            <section className="flex flex-col gap-2 w-full max-h-72 overflow-y-auto bg-[#181818] rounded-b-lg shadow-xl z-10 ${sourceSans3.className} text-[#a3a3a3] border border-t-0 border-[#232323] mt-1">
              {notes && notes.length !== 0 ? (
                notes.map((nt, i) => (
                  <div
                    key={i}
                    className="p-3 border-b border-[#232323] hover:bg-[#232323] transition-colors cursor-pointer rounded"
                  >
                    <h2 className="text-base font-semibold text-white">
                      {nt.title.slice(0, 30) || <span className="italic text-gray-500">No title</span>}
                    </h2>
                    <p className="text-sm text-gray-400">{nt.content.slice(0, 60)}</p>
                  </div>
                ))
              ) : searchTerm ? (
                <div className="p-3 text-center text-gray-500">
                  No notes found.
                </div>
              ) : null}
            </section>
          </div>
        )}
      </div>
      {!isSearching && (
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="w-full bg-[#232323] text-[#fcfcfc] h-10 rounded outline-none text-center mt-2"
        >
          <span className="text-xl">+</span> New Note
        </button>
      )}
    </div>
  );
};

export default Create;
