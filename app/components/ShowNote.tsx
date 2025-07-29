import { BoldIcon } from "@/components/tiptap-icons/bold-icon";
import { ItalicIcon } from "@/components/tiptap-icons/italic-icon";
import { Button } from "@/components/tiptap-ui-primitive/button";
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";
import {
  getFolder,
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
  faFolder,
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
  folder_id: string;
};
const ShowNote = ({ noteId }: prop) => {
  const [content, setContent] = useState("");
  const [title, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState<Note | null>(null);
  const [clicked, setclicked] = useState(false);
  const [isArch, setArch] = useState(false);
  const [isTrch, setTrch] = useState(false);
  const [folder, setFolder] = useState("");
  const [folderid, setFolderid] = useState("");
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
          setFolderid(res.folder_id);
        }
        console.log(folderid, "id");
      } catch (err) {
        console.log(err as Error);
      }
    };

    handlegetData();
  }, []);
  useEffect(() => {
    if (folderid) {
      console.log(folderid, "updated folderid");
    }
  }, [folderid]);

  useEffect(() => {
    const handleFolder = async () => {
      if (!folderid || folderid.trim() === "") {
        console.warn("folderid is empty or invalid");
        return;
      }
      try {
        const res = await getFolder({ folderid });
        if (res) {
          setFolder(res.name);
        }
      } catch (err) {
        console.log(err);
      }
    };
    handleFolder();
  }, [folderid]);
  //
  useEffect(() => {
    if (folder) console.log(folder);
  }, [folder]);
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
          <FontAwesomeIcon className="mx-4" icon={faCalendar} />
          <span className="text-[15px] text-gray-600 mx-4">Date</span> {date}
        </h1>
        <hr className="text-gray-700" />
        <h1>
          <FontAwesomeIcon className="mx-4" icon={faFolder} />
          <span className="text-[15px] text-gray-600 mx-4">Folder</span>{" "}
          {folder}
        </h1>
        <hr className="bg-gray-600" />
        <Toolbar variant="fixed">
          <ToolbarGroup>
            <Button data-style="ghost">
              <BoldIcon className="tiptap-button-icon" />
            </Button>
            <Button data-style="ghost">
              <ItalicIcon className="tiptap-button-icon" />
            </Button>
          </ToolbarGroup>

          <ToolbarSeparator />

          <ToolbarGroup>
            <Button data-style="ghost">Format</Button>
          </ToolbarGroup>

          <Spacer />

          <ToolbarGroup>
            <Button data-style="primary">Save</Button>
          </ToolbarGroup>
        </Toolbar>{" "}
        <hr />
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
