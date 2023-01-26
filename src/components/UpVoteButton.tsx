import React from "react";

const UpVoteButton: React.FC<{
  visible: boolean;
  onClick: () => void;
}> = ({ visible, onClick }) => {
  if (!visible) {
    return null;
  }

  return (
    <button className="btn-primary btn-sm btn" onClick={onClick}>
      Vote 👍
    </button>
  );
};

export default UpVoteButton;
