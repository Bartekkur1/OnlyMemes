import { FC } from "react";
import { Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Meme } from "../../Types/Content";

const cardStyle = {
  width: '45%',
  minWidth: '500px',
  margin: 'auto',
  marginBottom: '16px',
  marginTop: '30px'
};

// @TODO: Add infinite scroll
export const MemePost: FC<{ meme: Meme }> = ({ meme: { author, title, url, publishedDate } }) => {
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
        subheader={`${author} published: ${date}`}
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
