import React, { FC, useContext, useState } from 'react';
import UploadField from './UploadField';
import Navbar from '../../Shared/Navbar';
import UploadForm from './UploadForm';
import { ContentApi } from '../../Api/Content';
import { useNavigate } from 'react-router-dom';
import { MessageContext } from '../../Context/MessageContext';
import { upload } from '@testing-library/user-event/dist/upload';
import { Loading } from '../../Shared/Loading';

const Upload: FC = () => {
  const navigate = useNavigate();
  const { push } = useContext(MessageContext);
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [imagePayload, setImagePayload] = useState<File | null>(null);
  const [uploadStage, setUploadStage] = useState<'upload' | 'form' | 'loading'>('upload');

  const onSubmitForm = (title: string) => {
    if (imagePayload === null) {
      return;
    }

    setUploadStage('loading');
    const formData = new FormData();
    formData.append('file', imagePayload);
    ContentApi.uploadMeme({
      image: imagePayload,
      title
    }).then(() => {
      push('Meme uploaded successfully, moderation have to approve it', 'success');
      navigate('/');
    }).catch(err => {
      push(err.message, 'error');
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
      />}
      {uploadStage === 'loading' && <Loading />}
    </>
  );
};

export default Upload;
