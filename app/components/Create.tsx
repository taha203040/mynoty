"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { kaushan } from "../fonts";
export interface CreatingOr {
  isCreating: boolean;
  setIsCreating: (val: boolean) => void;
}
const Create = ({ isCreating, setIsCreating }: CreatingOr) => {
  const [isSearching, setisSearching] = useState(false);
  return (
    <div className="flex flex-col gap-3 p-2">
      <div className="flex  justify-between items-center">
        <div
          className={`${kaushan.className} font-bold text-2xl text-[#fcfcfc]`}
        >
          {" "}
          Noty
        </div>
        <p onClick={() => setisSearching(!isSearching)} className="text-[25px]">
          <FontAwesomeIcon icon={faSearch} className="text-[#fcfcfc]" />
        </p>
      </div>
      {isSearching && (
        <input
          placeholder="search note"
          type="text"
          className="w-full text-[#fcfcfc] bg-[#232323] h-10 transition-all rounded outline-none text-center"
        />
      )}
      {!isSearching && (
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
