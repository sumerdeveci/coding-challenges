import { FC } from 'react';
import { DogImageGallery } from '../../controllers/DogImageGallery';
import { DogImageUpload } from '../../controllers/DogImageUpload';
import { DogProvider } from '../../providers/DogProvider';
import style from './style.module.sass';

/**
 * A page where users can upload a dog image, then they can see a
 * gallery of dog images which are the same breed as the uplaoded dog image.
 */
export const HomePage: FC = () => (
  <DogProvider>
    <div className={style.homePage}>
      <DogImageUpload />
      <DogImageGallery />
    </div>
  </DogProvider>
);
