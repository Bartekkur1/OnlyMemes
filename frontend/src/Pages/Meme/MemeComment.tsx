import { FC, useContext, useEffect, useState } from "react";
import { Comment } from "../../Types/Content";
import { CommentApi } from "../../Api/Comment";
import { Box, Button, List, ListItem, TextField, Typography } from "@mui/material";
import { useAuth } from "../../Context/AuthContext";
import { Clear } from "@mui/icons-material";
import { MessageContext } from "../../Context/MessageContext";

interface MemeCommentProps {
  memeId: number;
}

export const MemeComment: FC<MemeCommentProps> = ({ memeId }) => {
  const { push } = useContext(MessageContext);
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([]);
  const { user } = useAuth();

  const fetchComments = () => {
    CommentApi.getComments(memeId)
      .then((result) => {
        setComments(result);
      })
      .catch(err => {
        push(err.message, 'error');
      });
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleCommentSubmit = () => {
    setComment('');
    CommentApi.addComment(memeId, comment)
      .then(() => {
        fetchComments();
        push('Comment added successfully', 'success');
      })
      .catch(err => {
        push(err.message, 'error');
      })
  };

  const handleCommentRemove = (id: number) => {
    const confirmed = window.confirm('Are you sure you want to remove your comment?');
    if (confirmed) {
      CommentApi.removeComment(id)
        .then(() => {
          fetchComments();
          push('Comment removed successfully', 'success');
        })
        .catch(err => {
          push(err.message, 'error');
        });
    }
  };

  return (
    <div style={{ width: '500px' }}>
      <Box sx={{ maxWidth: 600, margin: '0 auto' }}>
        <List sx={{ marginTop: 2 }}>
          {comments.map(({ id, display_name, content, published_at, author }) => (
            <ListItem key={id} alignItems="flex-start" style={{ justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle2">{display_name} - {(new Date(published_at)).toDateString()}</Typography>
                <Typography variant="body1">{content}</Typography>
              </Box>
              {
                user?.id === author && <Clear style={{ fontSize: '16px', cursor: 'pointer' }} onClick={() => handleCommentRemove(id)} />
              }
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
