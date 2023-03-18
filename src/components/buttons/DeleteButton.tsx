import React from "react";
import { Button } from "../../lib/ui/Button";
import ToolTip from "../../lib/ui/ToolTip";
import { cns } from "../../utils/classnames";

interface DeleteButtonProps {
  onClick: () => void;
  toolTip: string;
  tooltipOpen?: boolean;
  withFadeIn?: boolean;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  onClick,
  toolTip,
  tooltipOpen = false,
  withFadeIn = false,
}) => {
  const classNames = cns([
    [
      "opacity-0 transition-opacity duration-200 group-hover:opacity-100",
      withFadeIn,
    ],
  ]);

  return (
    <div className={classNames}>
      <ToolTip toolTip={toolTip} open={tooltipOpen}>
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
