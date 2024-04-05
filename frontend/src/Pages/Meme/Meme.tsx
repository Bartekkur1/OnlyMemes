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

export const MemePost: FC<{ meme: Meme }> = ({ meme: { author, title, url, publishedDate } }) => {
  const navigate = useNavigate();
  const date = (new Date(publishedDate)).toLocaleDateString();
  return (
    <Card style={cardStyle}>
      {/* @TODO: Add user icon */}
      <CardHeader
        // avatar={
        //   <Avatar aria-label="author">
        //     {author}
        //   </Avatar>
        // }
        title={title}
        subheader={
          <Grid container>
            <Grid item xs={6}>
              <Typography
                style={{ cursor: 'pointer', paddingRight: '4px' }}
                onClick={() => {
                  navigate(`/profile/${author}`);
                }}>
                {`${author}`}
              </Typography>
              <Typography>{`published: ${date}`}</Typography>
            </Grid>
            <Grid item xs={6} textAlign={'end'}>
              <MemeOption />
            </Grid>
          </Grid>
        }
      />
      <CardMedia
        component="img"
        alt={title}
        height="auto"
        image={url}
        title={title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          TODO: Meme statistics, comments and likes etc.
        </Typography>
      </CardContent>
    </Card>
  );
};
