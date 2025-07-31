import {
  faFile,
  faFileCode,
  faFileExcel,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Default = () => {
  return (
    <section className={`flex flex-col justify-center items-center h-full gap-5 text-4xl text-center`}>
      <FontAwesomeIcon icon={faFile} />
      <h1>Select a note to view</h1>
      <p className={` font-light text-[16px] leading-6 text-[#a3a3a3]`}>
        Choose a note from the list on the left to view its contents,
        <br />
        or create a new note to add to your collection.
      </p>
    </section>
  );
};

export default Default;
