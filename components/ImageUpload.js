import { useState } from 'react';
import { API_URL } from '../config';
import styles from '@/styles/Form.module.css';

export default function ImageUpload({ evtId, imageUploaded, token }) {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('files', image);
    formData.append('ref', 'api::event.event'); //'ref' The collection we want to use
    formData.append('refId', evtId); //'refId' The event Id
    formData.append('field', 'image'); //'field' the image field we called 'image'
    console.log(`${API_URL}/api/upload`);

    const res = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData,
    });

    if (res.ok) {
      imageUploaded();
    } else {
      console.log(res);
      console.log(formData);
      console.log(image);
    }
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type='file' onChange={handleFileChange} />
        </div>
        <input type='submit' value='Upload' className='btn' />
      </form>
    </div>
  );
}
