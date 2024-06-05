import { FC, useContext, useEffect } from "react";
import { MessageContext } from "../Context/MessageContext";
import { Alert, Box } from "@mui/material";

export const MessageDisplay: FC = () => {
  const { messages, removeMessage } = useContext(MessageContext);

  useEffect(() => {
    const newestMessage = messages.find(m => !m.pulled);
    if (!newestMessage) return;
    newestMessage.pulled = true;

    setTimeout(() => {
      removeMessage(newestMessage.id);
    }, 3000);
  }, [messages, removeMessage]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '16px',
        right: '16px',
        maxWidth: '400px',
        p: 2,
        zIndex: 1300,
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
    >
      {messages.map((message, index) => (
        <Alert style={{ marginTop: '10px' }} key={index} severity={message.type}>
          {message.content}
        </Alert>
      ))}
    </Box>
  )
};