import {
  getNoteById,
  updateArchived,
  updateFavorite,
  updateNoteById,
  updateTrach,
} from "@/utils";
import {
  faArchive,
  faBars,
  faCalendar,
  faMarsAndVenus,
  faStar,
  faStarAndCrescent,
  faStarHalfStroke,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
interface prop {
  noteId: string;
}
type Note = {
  title: string;
  content: string;
  id: string;
  created_at: string;
};
const ShowNote = ({ noteId }: prop) => {
  const [content, setContent] = useState("");
  const [title, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState<Note | null>(null);
  const [clicked, setclicked] = useState(false);
  const [isArch, setArch] = useState(false);
  const [isTrch, setTrch] = useState(false);

  const [isFav, setFav] = useState(false);

  useEffect(() => {
    const handlegetData = async () => {
      try {
        const res = await getNoteById({ noteId: noteId });
        if (res) {
          setNote(res);
          setSubject(res.title);
          setContent(res.content);
          setDate(res.created_at.slice(0, 10));
        }
        console.log("hi subject", res.Subject);
        console.log("hi from ", res.Text);
        console.log(res);
      } catch (err) {
        console.log(err as Error);
      }
    };

    handlegetData();
  }, []);
  useEffect(() => {
    const debounce = setTimeout(() => {
      const handleUpdate = async () => {
        try {
          if (content.trim() || title.trim()) {
            setContent(content);
            setSubject(title);
          }
          const res = await updateNoteById({
            noteId: noteId,
            title: title,
            content: content,
          });
        } catch (err) {
          console.log(err);
        }
      };
      handleUpdate();
    }, 2000);
    return () => clearTimeout(debounce);
  }, [title, content]);

  useEffect(() => {
    const debonce = setTimeout(() => {
      const handleFavorite = async () => {
        try {
          const res = await updateFavorite({
            noteId: noteId,
            is_favorite: isFav,
          });
        } catch (err) {
          console.log(err);
        }
      };
      handleFavorite();
    }, 2000);
    return () => clearTimeout(debonce);
  }, [isFav]);

  useEffect(() => {
    const debonce = setTimeout(() => {
      const handleArch = async () => {
        try {
          const res = await updateArchived({
            noteId: noteId,
            is_archived: isArch,
          });
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      };
      handleArch();
    }, 2000);
    return () => clearTimeout(debonce);
  }, [isTrch]);
  useEffect(() => {
    const debonce = setTimeout(() => {
      const handleTrach = async () => {
        try {
          const res = await updateTrach({
            noteId: noteId,
            is_trashed: isTrch,
          });
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      };
      handleTrach();
    }, 2000);
    return () => clearTimeout(debonce);
  }, [isTrch]);
  return (
    <section className=" w-full p-5 gap-5 h-screen flex flex-col">
      <div className="text-2xl flex justify-between">
        <span>{title}</span>

        <span className="  gap-8 ">
          <FontAwesomeIcon
            icon={faBars}
            className="text-[#fcfcfc] text-2xl"
            onClick={() => setclicked(!clicked)}
          />
        </span>
      </div>
      {clicked ? (
        // <span className="flex justify-end z-1">
        <div className="bg-[#1c1c1c] absolute p-2  rounded flex transition-transform flex-col gap-2 right-13 top-40 ">
          <p
            className="text-xs p-3 w-full hover:bg-[#232323]"
            onClick={() => setFav(!isFav)}
          >
            <FontAwesomeIcon className="mx-2" icon={faStar} /> Add To Favorite
          </p>
          <p
            className="text-xs p-3  w-full hover:bg-[#232323]"
            onClick={() => setArch(!isArch)}
          >
            {" "}
            <FontAwesomeIcon icon={faArchive} className="mx-2" /> Archive
          </p>
          <hr className="text-[#232323] font-bold" />
          <p
            className="text-xs p-3 w-full hover:bg-[#232323]"
            onClick={() => setTrch(!isTrch)}
          >
            <FontAwesomeIcon className="mx-2" icon={faTrashCan} /> Delete
          </p>
        </div>
      ) : (
        // </span>
        <></>
      )}

      <div className="flex flex-col gap-4">
        <h1>
          <FontAwesomeIcon className="mx-4" icon={faCalendar} /> {date}
        </h1>
        <hr className="" />
      </div>
      <textarea
        className="outline-none scroll-m-3.5 resize-none w-full h-full "
        onChange={(e) => setContent(e.target.value)}
        value={content}
        cols={40}
      />
    </section>
  );
};

export default ShowNote;
