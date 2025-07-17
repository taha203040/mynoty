import React from "react";
import Create, { CreatingOr } from "./Create";
import { ListOptions } from "./listOptions";

const SideBar = ({ isCreating, setIsCreating }: CreatingOr) => {
  return (
    <section className="flex p-3 gap-8 w-1/5 h-full bg-blue-600 flex-col">
      <Create isCreating={isCreating} setIsCreating={setIsCreating} />
      <ListOptions />
    </section>
  );
};

export default SideBar;
