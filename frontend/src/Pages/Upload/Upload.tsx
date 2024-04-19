import React, { FC, useState } from 'react';
import UploadField from './UploadField';
import Navbar from '../../Shared/Navbar';
import UploadForm from './UploadForm';
import { ContentApi } from '../../Api/Content';
import { useNavigate } from 'react-router-dom';

const Upload: FC = () => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [imagePayload, setImagePayload] = useState<File | null>(null);
  const [uploadStage, setUploadStage] = useState<'upload' | 'form'>('upload');
  // const [error, setError] = useState<string | undefined>();

  const onSubmitForm = (title: string) => {
    if (imagePayload === null) {
      return;
    }

    const formData = new FormData();
    formData.append('file', imagePayload);
    ContentApi.uploadMeme({
      image: imagePayload,
      title
    }).then(() => {
      window.confirm('Meme uploaded successfully, moderation have to approve it');
      navigate('/');
    }).catch(err => {
      console.log(err);
    });
  }

  const onCancel = () => {
    setPreviewImage(undefined);
    setUploadStage('upload');
  }

  return (
    <>
      <Navbar />
      {uploadStage === 'upload' && <UploadField setPreviewImage={image => {
        setPreviewImage(image);
        setUploadStage('form');
      }} setPayloadImage={setImagePayload} />}
      {uploadStage === 'form' && <UploadForm
        previewImage={previewImage}
        submitForm={onSubmitForm}
        cancel={onCancel}
      />
      }
    </>
  );
};

export default Upload;
