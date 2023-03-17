import React from "react";
import { Button } from "../../lib/ui/Button";

const UpVoteButton: React.FC<{
  visible: boolean;
  onClick: () => void;
}> = ({ visible, onClick }) => {
  if (!visible) {
    return null;
  }

  return (
    <Button size="sm" onClick={onClick}>
      Vote 👍
    </Button>
  );
};

export default UpVoteButton;
