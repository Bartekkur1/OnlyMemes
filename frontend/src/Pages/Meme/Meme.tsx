import { FC, useContext, useState } from "react";
import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Meme } from "../../Types/Content";
import { MemeOption } from "./MemeOption";
import { ChatBubbleOutline, Favorite, FavoriteBorder } from "@mui/icons-material";
import { MemeContext } from "../../Context/MemeContext";
import { useAuth } from "../../Context/AuthContext";

const cardStyle = {
  width: '45%',
  minWidth: '500px',
  margin: 'auto',
  marginBottom: '16px',
  marginTop: '30px'
};

export const MemePost: FC<{ meme: Meme }> = ({ meme }) => {
  const { voteMeme } = useContext(MemeContext);
  const [upVotes, setUpVotes] = useState<number>(meme.votes);
  const [upVoted, setUpVoted] = useState<boolean>(meme.upVoted || false);

  const { user } = useAuth();

  const onVote = () => {
    if (user?.id !== meme.authorId) {
      setUpVotes(upVotes + (upVoted ? -1 : 1));
      voteMeme(meme.id, upVoted ? 'down' : 'up');
      setUpVoted(!upVoted);
    }
  };

  const openOnNewTab = (path: string) => {
    window.open(path, '_blank')
  };

  return (
    <Card style={cardStyle}>
      <Box padding={2}>
        <Grid container>
          <Grid item xs={6}>
            <Typography
              onClick={() => openOnNewTab(`/profile/${meme.authorId}`)}
              sx={{ fontSize: 12 }}
              color="text.secondary"
              style={{ cursor: 'pointer' }}
              gutterBottom
            >
              {meme.author}
            </Typography>
            <Typography
              variant="h5"
              component="div"
              style={{ cursor: 'pointer' }}
              onClick={() => openOnNewTab(`/meme/${meme.id}`)}
            >
              {meme.title}
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign={'end'}>
            <MemeOption meme={meme} />
          </Grid>
        </Grid >
      </Box >
      <CardMedia
        component="img"
        alt={meme.title}
        height="auto"
        image={meme.url}
        title={meme.title}
      />
      <CardContent>
        <Box alignContent={'center'} alignItems={'center'} display={'flex'} flexDirection={'row'}>
          <Box display={'flex'} flexDirection={'row'} paddingRight={2}>
            <Typography paddingRight={1}>
              {upVotes}
            </Typography>
            {upVoted ?
              <Favorite onClick={() => onVote()} cursor={user?.id === meme.authorId ? 'not-allowed' : 'pointer'} /> :
              <FavoriteBorder onClick={() => onVote()} cursor={user?.id === meme.authorId ? 'not-allowed' : 'pointer'} />}
          </Box>
          <Box display={'flex'} flexDirection={'row'}>
            <Typography paddingRight={1}>
              {meme.commentsCount}
            </Typography>
            <ChatBubbleOutline style={{ cursor: 'pointer' }}
              onClick={() => openOnNewTab(`/meme/${meme.id}`)} />
          </Box>
        </Box>
      </CardContent>
    </Card >
  );
};
