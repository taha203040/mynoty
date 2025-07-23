import React from "react";
import { Option1 } from "./Options";
import Option2 from "./Option2";
import { Option3 } from "./Option3";

export const ListOptions = () => {
  return (
    <div className="flex flex-col gap-4 h-full">
      <Option1 />
      <Option2 />
      <Option3 />
    </div>
  );
};
