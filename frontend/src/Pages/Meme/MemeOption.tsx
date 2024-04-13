import { FC, useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Grid, Popover } from "@mui/material";
import { MemeDelete } from "./MemeDelete";
import { Meme } from "../../Types/Content";
import { useAuth } from "../../Context/AuthContext";

interface MemeOptionProps {
  meme: Meme;
}

export const MemeOption: FC<MemeOptionProps> = ({ meme }) => {

  const { user } = useAuth();
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
            <MemeDelete disabled={meme.authorId !== user?.id} memeId={meme.id} closePopover={() => setOpen(false)} />
          </Grid>
        </Grid>
      </Popover >
    </>
  )
};

