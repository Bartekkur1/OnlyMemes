import { Box } from "@mui/material";
import { FC, useRef } from "react";

interface UploadFieldProps {
  setPreviewImage: (previewImage: string) => void;
}

const UploadField: FC<UploadFieldProps> = ({ setPreviewImage }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  // };

  // const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        setPreviewImage(URL.createObjectURL(file));
      }
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
    >
      <Box
        border="2px dashed #ccc"
        padding="20px"
        borderRadius="10px"
        textAlign="center"
        width="30%"
        onClick={handleClick}
        // onDragOver={handleDragOver}
        // onDrop={handleDrop}
        style={{ cursor: 'pointer' }}
      >
        <h2>Drag & Drop Your Meme Here</h2>
        <p>Or click to select meme</p>
        <input
          type="file"
          ref={inputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          multiple={false}
        />
      </Box>
    </Box>
  )
};

export default UploadField;
