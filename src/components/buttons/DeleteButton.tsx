import React from "react";
import { Button } from "../../lib/ui/Button";
import ToolTip from "../../lib/ui/ToolTip";

interface DeleteButtonProps {
  onClick: () => void;
  visible?: boolean;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  onClick,
  visible = true,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
      <ToolTip toolTip="Do you really want to delete this item?">
        <Button
          onClick={onClick}
          variant="error"
          outlined
          size="xs"
          casing="normal"
        >
          Delete
        </Button>
      </ToolTip>
    </div>
  );
};

export default DeleteButton;
