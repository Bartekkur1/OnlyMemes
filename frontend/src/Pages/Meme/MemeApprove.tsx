import { FC, useContext } from "react";
import RequireRole from "../../Shared/RequireRole";
import { Button } from "@mui/material";
import { MemeContext } from "../../Context/MemeContext";

interface MemeApproveProps {
  closePopover: () => void;
  memeId: number;
  approved: boolean;
}

export const MemeApprove: FC<MemeApproveProps> = ({ closePopover, memeId, approved }) => {
  const { changeMemeApproval } = useContext(MemeContext);

  const handleMemeApprove = () => {
    const confirmed = window.confirm('Are you sure you want to approve this meme?');
    if (confirmed) {
      changeMemeApproval(memeId, approved ? false : true);
    }
    closePopover();
  };

  return (
    <RequireRole role="ADMIN" element={
      <Button onClick={() => handleMemeApprove()}>
        {approved ? "Disable this post" : "Approve this post"}
      </Button>
    } />
  )
};