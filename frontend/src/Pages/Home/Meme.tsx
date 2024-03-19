import { FC } from "react";
import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";

const cardStyle = {
  width: '35%',
  margin: 'auto',
  marginBottom: '16px',
  marginTop: '30px'
};

export const Meme: FC = () => {
  return (
    <Card style={cardStyle}>
      <CardHeader
        avatar={
          <Avatar aria-label="author">
            {'Author'}
          </Avatar>
        }
        title={'title'}
        subheader={`By author`}
      />
      <CardMedia
        component="img"
        alt={'title'}
        height="auto"
        image={'https://dummyimage.com/600x400/000/fff&text=Test'}
        title={'title'}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {/* Additional details if needed */}
        </Typography>
      </CardContent>
    </Card>
  );
};
