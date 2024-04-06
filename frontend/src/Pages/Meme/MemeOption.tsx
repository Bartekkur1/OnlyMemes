import { FC, useEffect, useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Grid, Popover } from "@mui/material";
import { MemeDelete } from "./MemeDelete";
import { Meme } from "../../Types/Content";

interface MemeOptionProps {
  meme: Meme;
}

export const MemeOption: FC<MemeOptionProps> = ({ meme }) => {

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
      >
        <MoreVertIcon />
      </Button>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={() => setOpen(false)}
      >
        <Grid container style={{ padding: '16px' }}>
          <Grid item xs={12}>
            <MemeDelete memeId={meme.id} />
          </Grid>
        </Grid>
      </Popover >
    </>
  )
};

