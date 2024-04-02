import { Box } from "@mui/material";
import { FC, useRef, useState } from "react";

interface UploadFieldProps {
  setPreviewImage: (previewImage: string) => void;
  setPayloadImage: (file: File) => void;
}

const UploadField: FC<UploadFieldProps> = ({ setPreviewImage, setPayloadImage }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  // const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    setPayloadImage(file);
    setPreviewImage(URL.createObjectURL(file));
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
