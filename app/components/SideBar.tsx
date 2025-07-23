import React from "react";
import Create, { CreatingOr } from "./Create";
import { useState, useEffect } from "react";
import { Option1 } from "./Options";
import { Option3 } from "./Option3";
import { useUser } from "@clerk/nextjs";
import { createFolder, getFolders } from "@/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faFolderOpen,
  faFolderPlus,
} from "@fortawesome/free-solid-svg-icons";
type folders = {
  name: string;
  id: string;
};
interface SideBarProps {
  isCreating: boolean;
  setIsCreating: (val: boolean) => void;
  setId: (id: string) => void;
}
const SideBar = ({ isCreating, setIsCreating, setId }: SideBarProps) => {
  // folder part code
  const [isSearch, setisSearch] = useState(false);
  const [foldr, setfolder] = useState("");
  const [folders, setfolders] = useState<folders[]>([]);
  const { user } = useUser();
  const [openFolderId, setOpenFolderId] = useState<string | null>(null);
  useEffect(() => {
    let isMounted = true;
    if (foldr.trim() === "") return;
    const debounce = setTimeout(() => {
      const handleCreate = async () => {
        try {
          // @ts-ignore
          const res = await createFolder({ fldr: foldr });
          console.log(res);
          console.log("hi", foldr);
          if (isMounted) console.log("Folder created successfully:", res);
        } catch (err) {
          console.log(err);
        }
      };

      handleCreate();
    }, 4000);

    return () => {
      isMounted = false; // Cleanup to prevent state updates on unmounted component
      clearTimeout(debounce);
    };
  }, [foldr]);
  useEffect(() => {
    const getElements = async () => {
      try {
        const res = await getFolders({ userid: user?.id || "" });
        console.log("user", user?.id);
        console.log("Folders:", res);
        if (res) setfolders(res);
      } catch (err) {
        console.error("Error fetching folders:", err);
      }
    };
    getElements();
  }, [user?.id]);

  return (
    <section className="flex gap-8 w-1/5 h-full bg-[#181818] flex-col">
      <Create isCreating={isCreating} setIsCreating={setIsCreating} />{" "}
      {/* Create component for creating new notes */}
      <Option1 />
      <article className="h-1/2 w-full  text-[#fcfcfc]">
        {/**
         * Folder Section
         */}
        <div className="flex  justify-between">
          <span>Folders </span>
          {isSearch && (
            <span>
              <FontAwesomeIcon icon={faFolderOpen} />
              <input
                type="text"
                className="border border-b-gray-300 rounded"
                onChange={(e) => setfolder(e.target.value)}
              />
            </span>
          )}
          <span>
            <FontAwesomeIcon
              icon={faFolderPlus}
              onClick={() => setisSearch(!isSearch)}
            />
          </span>
        </div>
        <div className="text-amber-50 w-full overflow-auto flex flex-col">
          {folders.map((folder, i) => (
            <span
              className="hover:bg-[#232323] p-1"
              onClick={() => {
                setOpenFolderId(openFolderId === folder.id ? null : folder.id);
                setId(folder.id); // Set the folder ID when clicked
              }}
              key={i}
              id={folder.id}
            >
              {openFolderId === folder.id ? (
                <FontAwesomeIcon icon={faFolderOpen} className="mx-1.5" />
              ) : (
                <FontAwesomeIcon icon={faFolder} className="mx-1.5" />
              )}
              {folder.name}
            </span>
          ))}
        </div>
      </article>{" "}
      <Option3 />
    </section>
  );
};

export default SideBar;
