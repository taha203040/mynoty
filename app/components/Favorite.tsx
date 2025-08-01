import { listFavorites } from "@/utils";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useReducer, useState } from "react";
import { sourceSans3 } from "../fonts";
type Notes = {
  title: string;
  content: string;
  created_at: string;
};
const FavoriteP = () => {
  const [favorites, setFavorites] = useState<Notes[]>();
  const { user } = useUser();
  if (!user) throw new Error("no user auth ");
  useEffect(() => {
    const getFavorites = async () => {
      try {
        const res = await listFavorites({ userid: user.id });
        if (res) {
          setFavorites(res);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getFavorites();
  }, [user]);
  return (
    <article
      className={` ${sourceSans3.className}  verflow-y-auto bg-[#1c1c1 h-full flex flex-col relative gap-4 `}
    >
      {favorites ? (
        favorites.map((note, id) => (
          <div
            key={id}
            className="bg-[#232323] transition-color relative h-[90px] mx-5 flex flex-col p-4 text-[#fcfcfc] cursor-pointer hover:bg-[#2c2c2c] transition-colors rounded "
            onClick={() => {}}
          >
            <h3 className="text-lg font-semibold">{note.title.slice(0, 10)}</h3>
            <p className="text-sm absolute bottom-4">
              <span className="text-[#a3a3a3] ">
                {note.created_at.slice(0, 10)}
              </span>
              <span className="mx-2">{note.content.slice(0, 20)}...</span>
            </p>
          </div>
        ))
      ) : (
        <></>
      )}
    </article>
  );
};

export default FavoriteP;
