import { FC, useEffect, useState } from "react";
import { Comment } from "../../Types/Content";
import { CommentApi } from "../../Api/Comment";
import { Avatar, Box, Button, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";

interface MemeCommentProps {
  memeId: number;
}

export const MemeComment: FC<MemeCommentProps> = ({ memeId }) => {
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = () => {
    CommentApi.getComments(memeId)
      .then((result) => {
        setComments(result);
      });
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleCommentSubmit = () => {
    CommentApi.addComment(memeId, comment)
      .then(() => {
        fetchComments();
      });
  };

  return (
    <div style={{ width: '500px' }}>
      <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
        <List sx={{ marginTop: 2 }}>
          {comments.map(({ id, display_name, content, published_at }) => (
            <ListItem key={id} alignItems="flex-start">
              <Avatar>{display_name.charAt(0).toUpperCase()}</Avatar>
              <Box sx={{ marginLeft: 2 }}>
                <ListItemText
                  primary={display_name}
                  secondary={(new Date(published_at)).toDateString()}
                />
                <Typography variant="body1">{content}</Typography>
              </Box>
            </ListItem>
          ))}
        </List>

        <hr />
        <TextField
          fullWidth
          label="Write a comment"
          value={comment}
          onChange={e => setComment(e.target.value)}
          multiline
          rows={4}
          variant="outlined"
          margin="normal"
        />
        <Button
          style={{ marginTop: '10px' }}
          variant="contained"
          color="primary"
          onClick={handleCommentSubmit}
          disabled={!comment.trim()}
        >
          Post Comment
        </Button>
      </Box>
    </div >
  );
};
