import { FC } from "react";
import { Card, CardContent, CardHeader, CardMedia, Grid, Typography } from "@mui/material";
import { Meme } from "../../Types/Content";
import { useNavigate } from "react-router-dom";
import { MemeOption } from "./MemeOption";

const cardStyle = {
  width: '45%',
  minWidth: '500px',
  margin: 'auto',
  marginBottom: '16px',
  marginTop: '30px'
};

export const MemePost: FC<{ meme: Meme }> = ({ meme }) => {
  const navigate = useNavigate();
  const date = (new Date(meme.publishedDate)).toLocaleDateString();
  return (
    <Card style={cardStyle}>
      {/* @TODO: Add user icon */}
      <CardHeader
        // avatar={
        //   <Avatar aria-label="author">
        //     {author}
        //   </Avatar>
        // }
        title={meme.title}
        subheader={
          <Grid container>
            <Grid item xs={6}>
              <Typography
                style={{ cursor: 'pointer', paddingRight: '4px' }}
                onClick={() => {
                  navigate(`/profile/${meme.author}`);
                }}>
                {`${meme.author}`}
              </Typography>
              <Typography>{`published: ${date}`}</Typography>
            </Grid>
            <Grid item xs={6} textAlign={'end'}>
              <MemeOption meme={meme} />
            </Grid>
          </Grid>
        }
      />
      <CardMedia
        component="img"
        alt={meme.title}
        height="auto"
        image={meme.url}
        title={meme.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          TODO: Meme statistics, comments and likes etc.
        </Typography>
      </CardContent>
    </Card>
  );
};
