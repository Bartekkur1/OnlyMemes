import { Box } from "@mui/material";
import { FC } from "react";

export const Loading: FC = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
    >
      <Box
        padding="20px"
        borderRadius="10px"
        textAlign="center"
        width="30%"
        style={{ cursor: 'pointer' }}
      >
        <img src='./loading.gif' alt="loading" />
      </Box>
    </Box>
  )
};