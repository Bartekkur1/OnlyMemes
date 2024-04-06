import { Button } from "@mui/material";
import { FC } from "react";
import { ContentApi } from "../../Api/Content";

interface MemeDeleteProps {
  memeId: number;
}

export const MemeDelete: FC<MemeDeleteProps> = ({ memeId }) => {

  const handleMemeDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    console.log(confirmed);
    if (confirmed) {
      ContentApi.deleteMeme(memeId)
        .then(() => {
          // @TODO: Move memes into context store and refetch them on delete
        })
    }
  };

  return (
    <>
      <Button onClick={() => handleMemeDelete()}>
        Delete this post
      </Button>
    </>
  )
};