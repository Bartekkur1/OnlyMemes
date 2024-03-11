import React, { FC, useState } from 'react';
import UploadField from './UploadField';
import Navbar from '../../Shared/Navbar';
import UploadForm from './UploadForm';

const Upload: FC = () => {
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [uploadStage, setUploadStage] = useState<'upload' | 'form'>('upload');
  const [form, setForm] = useState<{ title: string, description: string }>();

  const onSubmitForm = (title: string, description: string) => {
    setForm({ title, description });
    console.log(form);
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
      }} />}
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
