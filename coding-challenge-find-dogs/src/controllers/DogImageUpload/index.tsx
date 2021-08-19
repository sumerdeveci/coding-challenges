import { FC, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import '@tensorflow/tfjs-backend-webgl';
import { ImageUpload } from '../../components/ImageUpload';
import { getPredicitonResult } from '../../utils/tfjs';
import { isNullOrUndefined } from '../../utils/nullAware';
import { DogContext } from '../../providers/DogProvider';
import { readUrlOfFile } from '../../utils/file';
import { FullPageLoader } from '../../components/loader/FullPageLoader';
import style from './style.module.sass';

/**
 * A fab for uploading a dog image and analyze it in the background.
 */
export const DogImageUpload: FC = () => {
  const { updateBreedAndImageUrl } = useContext(DogContext);
  const [loading, setLoading] = useState(false);

  const onImageUpload = async (e: any) => {
    try {
      setLoading(true);

      const file = e.target.files[0] as File;
      const imageUrlBase64 = await readUrlOfFile(file);

      let breed = await getPredicitonResult(imageUrlBase64);
      if (isNullOrUndefined(breed)) throw Error('Received breed is invalid');

      setLoading(false);
      updateBreedAndImageUrl({ breed, imageUrl: imageUrlBase64 });
    } catch (error) {
      console.error(error);
      toast.error('Error happened while processing the image');
      setLoading(false);
    }
  };

  return (
    <div className={style.dogImageUpload}>
      <FullPageLoader visible={loading} message="Analyzing your image.." />
      <>
        <ImageUpload onChange={onImageUpload} />
      </>
    </div>
  );
};
