import React from "react";

const UpVoteButton: React.FC<{
  hasBeenVotedFor: boolean;
  onClick: () => void;
}> = ({ hasBeenVotedFor, onClick }) => {
  if (hasBeenVotedFor) {
    return null;
  }

  return (
    <button className="btn-primary btn-sm btn" onClick={onClick}>
      Vote 👍
    </button>
  );
};

export default UpVoteButton;
