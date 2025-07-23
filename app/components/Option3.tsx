import {
  faArchive,
  faStar,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Option3 = () => {
  return (
    <div className="h-1/3 my-3.5 gap-3 flex flex-col text-[#fcfcfc]">
      <span>More</span>
      <div className="flex flex-col gap-3">
        <p>
          <FontAwesomeIcon icon={faStar} className="mx-2" /> Favorites
        </p>
        <p>
          {" "}
          <FontAwesomeIcon className="mx-2" icon={faTrashCan} />
          Trach
        </p>
        <p>
          <FontAwesomeIcon className="mx-2" icon={faArchive} /> Archived
        </p>
      </div>
    </div>
  );
};
