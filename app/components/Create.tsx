"use client";
export interface CreatingOr {
  isCreating: boolean;
  setIsCreating: (val: boolean) => void;
}
const Create = ({ isCreating, setIsCreating }: CreatingOr) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex  justify-between items-center">
        <div className="font-bold text-2xl"> Noty</div>
        <p className="text-[25px]">🔍</p>
      </div>
      <button
        onClick={() => setIsCreating(!isCreating)}
        className="w-full bg-amber-700 p-3 rounded outline-none text-center"
      >
        ➕ New Note
      </button>
    </div>
  );
};

export default Create;
