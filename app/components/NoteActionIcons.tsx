import React from "react";
import HeartFillIcon from "remixicon-react/HeartFillIcon";
import ArchiveFillIcon from "remixicon-react/ArchiveFillIcon";
import DeleteBackFillIcon from "remixicon-react/DeleteBackFillIcon";
import DeleteBin6LineIcon from "remixicon-react/DeleteBin6LineIcon";

export type NoteState = "favorite" | "archived" | "trashed";

interface NoteActionIconsProps {
  state: NoteState;
  onUnfavorite?: () => void;
  onUnarchive?: () => void;
  onRestore?: () => void;
  onDeletePermanent?: () => void;
}

const NoteActionIcons: React.FC<NoteActionIconsProps> = ({
  state,
  onUnfavorite,
  onUnarchive,
  onRestore,
  onDeletePermanent,
}) => {
  if (state === "favorite") {
    return (
      <button title="Unfavorite" onClick={onUnfavorite} className="text-red-500 hover:text-red-700">
        <HeartFillIcon size={24} />
      </button>
    );
  }
  if (state === "archived") {
    return (
      <button title="Unarchive" onClick={onUnarchive} className="text-yellow-500 hover:text-yellow-700">
        <ArchiveFillIcon size={24} />
      </button>
    );
  }
  if (state === "trashed") {
    return (
      <div className="flex gap-2">
        <button title="Restore Note" onClick={onRestore} className="text-green-500 hover:text-green-700">
          <DeleteBackFillIcon size={24} />
        </button>
        <button title="Delete Permanently" onClick={onDeletePermanent} className="text-gray-500 hover:text-red-700">
          <DeleteBin6LineIcon size={24} />
        </button>
      </div>
    );
  }
  return null;
};

export default NoteActionIcons;