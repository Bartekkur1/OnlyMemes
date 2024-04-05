import { FC, useEffect, useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Popover } from "@mui/material";

export const MemeOption: FC = () => {

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);

  return (
    <>
      <Button
        onClick={handleOpen}
      >
        <MoreVertIcon />
      </Button>
      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={() => setOpen(false)}
      >
        <h1>Hello world</h1>
      </Popover>
    </>
  )
};