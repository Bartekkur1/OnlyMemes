import { FC, useEffect, useState } from "react";
import Navbar from "../../Shared/Navbar";
import { InviteTokenDetails } from "../../Types/Auth";
import AuthClient from "../../Api/Auth";
import { Box, Container, Typography } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";

export const InviteToken: FC = () => {
  const [details, setDetails] = useState<InviteTokenDetails | undefined>();

  useEffect(() => {
    if (!details) {
      AuthClient.getInviteToken().then((details) => {
        setDetails(details);
      });
    }
  }, [details]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(details?.token || '').then(() => {
      // @TODO: Handle notifications
      alert('Invite token copied to clipboard');
    });
  };

  // @TODO: Maybe add a list of invited users?
  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Box sx={{ textAlign: 'center', marginBottom: 4, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Typography paddingRight={2} variant="h3" gutterBottom>Invite Token</Typography>
          <ContentCopy style={{ cursor: 'pointer' }} onClick={() => copyToClipboard()} />
        </Box>
        <Typography variant="h5" gutterBottom>{details?.token}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', textAlign: 'center', alignItems: 'center' }}>
          <Typography paddingRight={4} variant="h4" gutterBottom>Invites left</Typography>
          <Typography variant="h2" gutterBottom>{details?.invites}</Typography>
        </Box>
      </Container>
    </>
  )
}