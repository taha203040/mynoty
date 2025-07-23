import { createFolder } from "@/utils";
import { auth } from "@clerk/nextjs/server";
import { faFolderOpen, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState, useEffect } from "react";

const Option2 = () => {
  const [isSearch, setisSearch] = useState(false);
  const [foldr, setfolder] = useState("");
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

  return (
    <article className="h-1/4 text-[#fcfcfc]">
      <div className="flex justify-between">
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
    </article>
  );
};

export default Option2;
