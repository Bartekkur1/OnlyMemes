import React, { FC, useState } from 'react';
import UploadField from './UploadField';
import Navbar from '../../Shared/Navbar';
import UploadForm from './UploadForm';
import { ContentApi } from '../../Api/Content';
import { useNavigate } from 'react-router-dom';

const Upload: FC = () => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [imagePayload, setImagePayload] = useState<string | undefined>();
  const [uploadStage, setUploadStage] = useState<'upload' | 'form'>('upload');
  // const [error, setError] = useState<string | undefined>();

  const onSubmitForm = (title: string) => {
    if (imagePayload === undefined) {
      return;
    }

    ContentApi.uploadMeme({
      image: imagePayload.split(';base64,')[1],
      title
    }).then(() => {
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
