import React from "react";

const UpVoteButton: React.FC<{
  hasBeenVotedFor: boolean;
  onClick: () => void;
}> = ({ hasBeenVotedFor, onClick }) => {
  if (hasBeenVotedFor) {
    return null;
  }

  return (
    <button className="btn-accent btn-square btn-sm btn" onClick={onClick}>
      +1
    </button>
  );
};

export default UpVoteButton;
