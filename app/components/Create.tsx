"use client";
import { useState } from "react";
export interface CreatingOr {
  isCreating: boolean;
  setIsCreating: (val: boolean) => void;
}
const Create = ({ isCreating, setIsCreating }: CreatingOr) => {
  const [isSearching, setisSearching] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex  justify-between items-center">
        <div className="font-bold text-2xl text-[#fcfcfc]"> Noty</div>
        <p onClick={() => setisSearching(!isSearching)} className="text-[25px]">
          🔍
        </p>
      </div>
      {isSearching && (
        <input
          type="text"
          className="w-full text-[#fcfcfc] bg-[#232323] p-3 rounded outline-none text-center"
        />
      )}
      {!isSearching && (
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="w-full bg-[#232323] text-[#fcfcfc] p-3 rounded outline-none text-center"
        >
          <span className="text-xl">+</span> New Note
        </button>
      )}
    </div>
  );
};

export default Create;
