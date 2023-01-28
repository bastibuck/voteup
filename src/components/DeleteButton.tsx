import React from "react";

const DeleteButton: React.FC<{ onClick: () => void; visible: boolean }> = ({
  onClick,
  visible,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <button
      className="btn-outline btn-error tooltip tooltip-top btn-xs btn normal-case opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      onClick={onClick}
      data-tip={"Do you really want to delete this item?"}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
