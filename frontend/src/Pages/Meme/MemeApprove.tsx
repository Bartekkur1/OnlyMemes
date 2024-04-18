import { FC, useContext } from "react";
import RequireRole from "../../Shared/RequireRole";
import { Button } from "@mui/material";
import { MemeContext } from "../../Context/MemeContext";

interface MemeApproveProps {
  closePopover: () => void;
  memeId: number;
}

export const MemeApprove: FC<MemeApproveProps> = ({ closePopover, memeId }) => {
  const { approveMeme } = useContext(MemeContext);

  const handleMemeApprove = () => {
    const confirmed = window.confirm('Are you sure you want to approve this meme?');
    if (confirmed) {
      approveMeme(memeId);
    }
    closePopover();
  };

  return (
    <RequireRole role="ADMIN" element={
      <Button onClick={() => handleMemeApprove()}>
        Approve this post
      </Button>
    } />
  )
};