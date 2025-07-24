import React from "react";
import Create, { CreatingOr } from "./Create";
import { useState, useEffect } from "react";
import { Option1 } from "./Options";
import { useUser } from "@clerk/nextjs";
import { createFolder, getFolders } from "@/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchive,
  faFolder,
  faFolderOpen,
  faFolderPlus,
  faStar,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
type folders = {
  name: string;
  id: string;
};
interface SideBarProps {
  isCreating: boolean;
  isclicked?: boolean; // Optional prop for isclicked, not used in this component
  isclick?: boolean; // Optional prop for isclick, not used in this component
  setIsCreating: (val: boolean) => void;
  setId: (id: string) => void;
  setIsClick: (val: boolean) => void; // Added setIsClick prop
  setisClicked: (val: boolean) => void; // Function to set isClicked state
  setIsClickedArch: (val: boolean) => void;
  setIsClickedFav: (val: boolean) => void;
  setIsClickedTrach: (val: boolean) => void;
  isClickedArch: boolean;
  isClickedTrach: boolean;
  isClickedFav: boolean;
}
const SideBar = ({
  setIsClickedArch,
  setIsClickedTrach,
  setIsClickedFav,
  setisClicked,
  setIsCreating,
  setId,
  setIsClick,
  isClickedTrach,
  isClickedFav,
  isClickedArch,
  isCreating,
  isclick,
  isclicked,
}: SideBarProps) => {
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
                if (isclicked || isclick) {
                  setIsClick(false); // Reset isClick state when isclicked and isclick are true
                  setisClicked(false); // Reset isClicked state when isclicked and isclick are true
                }
                setOpenFolderId(openFolderId === folder.id ? null : folder.id);
                setId(folder.id); // Set the folder ID when clicked
                setIsClick(!isclick); // Set isClick to true when a folder is clicked
                setisClicked(!isclicked); // Set isClicked to true when a folder is clicked
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
      </article>
      <article className="h-1/3 my-3.5 gap-3 flex flex-col text-[#fcfcfc]">
        <span>More</span>
        <div className="flex flex-col gap-3">
          <p onClick={() => setIsClickedFav(!isClickedFav)}>
            <FontAwesomeIcon icon={faStar} className="mx-2" /> Favorites
          </p>
          <p onClick={() => setIsClickedArch(!isClickedArch)}>
            {" "}
            <FontAwesomeIcon className="mx-2" icon={faArchive} />
            Archived
          </p>
          <p onClick={() => setIsClickedTrach(!isClickedTrach)}>
            <FontAwesomeIcon className="mx-2" icon={faTrashCan} /> Trach
          </p>
        </div>
      </article>
    </section>
  );
};

export default SideBar;
