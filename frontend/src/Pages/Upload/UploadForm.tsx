import { Box, Button, TextField } from "@mui/material";
import { FC, useState } from "react";

interface UploadFormProps {
  cancel: () => void;
  submitForm: (title: string, description: string) => void;
  previewImage: string | undefined;
}

const UploadForm: FC<UploadFormProps> = ({ previewImage, submitForm, cancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    submitForm(title, description);
  };
  const handleCancel = () => {
    cancel();
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      marginTop="20px"
    >
      <Box width="25%" marginBottom="20px" display='flex' justifyContent='center'>
        <img src={previewImage} alt="Preview" style={{ maxWidth: '100%', minWidth: '100%' }} />
      </Box>
      <Box width="25%" marginBottom="20px">
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          value={title}
          onChange={handleTitleChange}
        />
      </Box>
      <Box width="25%" marginBottom="20px">
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          value={description}
          onChange={handleDescriptionChange}
        />
      </Box>
      <Box width="25%" marginBottom="20px" display="flex" justifyContent="center">
        <Button variant="contained" onClick={handleCancel} style={{ marginRight: '10px' }}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Upload
        </Button>
      </Box>

    </Box>
  )
};

export default UploadForm;