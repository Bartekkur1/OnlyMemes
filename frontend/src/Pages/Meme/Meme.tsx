import { FC, useState } from "react";
import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Meme } from "../../Types/Content";
import { useNavigate } from "react-router-dom";
import { MemeOption } from "./MemeOption";
import { ChatBubble, Favorite } from "@mui/icons-material";

const cardStyle = {
  width: '45%',
  minWidth: '500px',
  margin: 'auto',
  marginBottom: '16px',
  marginTop: '30px'
};

export const MemePost: FC<{ meme: Meme }> = ({ meme }) => {

  const [upVotes, setUpVotes] = useState<number>(meme.votes);
  const [upVoted, setUpVoted] = useState<boolean>(false);

  const onVote = () => {
    // @TODO: Add API call
    setUpVotes(upVotes + (upVoted ? -1 : 1));
    setUpVoted(!upVoted);
  };

  const navigate = useNavigate();
  return (
    <Card style={cardStyle}>
      {/* @TODO: Add user icon */}
      <Box padding={2}>
        <Grid container>
          <Grid item xs={6}>
            <Typography
              onClick={() => navigate(`/profile/${meme.authorId}`)}
              sx={{ fontSize: 12 }}
              color="text.secondary"
              style={{ cursor: 'pointer' }}
              gutterBottom
            >
              {meme.author}
            </Typography>
            <Typography variant="h5" component="div">
              {meme.title}
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign={'end'}>
            <MemeOption meme={meme} />
          </Grid>
        </Grid>
      </Box>
      <CardMedia
        component="img"
        alt={meme.title}
        height="auto"
        image={meme.url}
        title={meme.title}
      />
      <CardContent>
        {/* TODO: Meme statistics, comments and likes etc. */}
        <Box alignContent={'center'} alignItems={'center'} display={'flex'} flexDirection={'row'}>
          <Box display={'flex'} flexDirection={'row'} paddingRight={2}>
            <Typography paddingRight={1}>
              {upVotes}
            </Typography>
            <Favorite onClick={() => onVote()} cursor={'pointer'} />
          </Box>
          <Box display={'flex'} flexDirection={'row'}>
            <Typography paddingRight={1}>
              12343
            </Typography>
            <ChatBubble />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
