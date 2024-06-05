import { Button } from "@mui/material";
import { FC, useContext } from "react";
import { MemeContext } from "../../Context/MemeContext";
import { MessageContext } from "../../Context/MessageContext";

interface MemeDeleteProps {
  closePopover: () => void;
  memeId: number;
  disabled?: boolean;
}

export const MemeDelete: FC<MemeDeleteProps> = ({ memeId, disabled, closePopover }) => {
  const { push } = useContext(MessageContext);
  const { deleteMeme } = useContext(MemeContext);

  const handleMemeDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      deleteMeme(memeId)
        .then(() => {
          push('Meme deleted successfully', 'success');
        })
        .catch(err => {
          push(err.message, 'error');
        });
    }
    closePopover();
  };

  return (
    <>
      <Button disabled={disabled} onClick={() => handleMemeDelete()}>
        Delete this post
      </Button>
    </>
  )
};