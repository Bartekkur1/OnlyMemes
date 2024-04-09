import { FC } from "react";
import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Meme } from "../../Types/Content";
import { Link } from "react-router-dom";
import { MemeOption } from "./MemeOption";

const cardStyle = {
  width: '45%',
  minWidth: '500px',
  margin: 'auto',
  marginBottom: '16px',
  marginTop: '30px'
};

export const MemePost: FC<{ meme: Meme }> = ({ meme }) => {
  return (
    <Card style={cardStyle}>
      {/* @TODO: Add user icon */}
      <Box padding={2}>
        <Grid container>
          <Grid item xs={6}>
            <Link to={`/profile/${meme.authorId}`} style={{ 'textDecoration': 'none' }}>
              <Typography
                sx={{ fontSize: 12 }}
                color="text.secondary"
                gutterBottom
              >
                {meme.author}
              </Typography>
            </Link>
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
        <Typography variant="body2" color="textSecondary" component="p">
          TODO: Meme statistics, comments and likes etc.
        </Typography>
      </CardContent>
    </Card>
  );
};
