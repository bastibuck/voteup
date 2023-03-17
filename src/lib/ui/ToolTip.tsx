import React from "react";
import { cns } from "../../utils/classnames";

interface ToolTipProps {
  toolTip?: string;
  open?: boolean;
  color?: "success";
  position?: "bottom";
  responsive?: boolean;
}

const ToolTip: React.FC<React.PropsWithChildren<ToolTipProps>> = ({
  children,
  toolTip,
  open = false,
  color,
  position,
  responsive = false,
}) => {
  const classNames = cns([
    ["tooltip flex"],
    ["tooltip-open", open],
    ["tooltip-success", color === "success"],
    ["tooltip-bottom", position === "bottom"],
    ["sm:tooltip-right", responsive],
  ]);

  return (
    <div className={classNames} data-tip={toolTip}>
      {children}
    </div>
  );
};

export default ToolTip;
